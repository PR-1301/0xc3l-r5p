import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import FilterBar from "./components/FilterBar";
import ResponseTable from "./components/ResponseTable";
import StudentDetailModal from "./components/StudentDetailModal";
import LoginModal from "./components/LoginModal";
import {
  fetchAllResponses,
  fetchDepartments,
  fetchResponsesByDepartment,
  verifyAdminSession,
} from "./services/api";
import { exportResponsesToCSV } from "./utils/csvExport";
import "./App.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const [responses, setResponses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filters State
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [subRoleFilter, setSubRoleFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Selected Student for Modal
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Check auth session on startup
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        setIsAuthenticated(false);
        setAuthChecking(false);
        return;
      }

      try {
        await verifyAdminSession();
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem("admin_token");
        setIsAuthenticated(false);
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuth();

    const handleLogoutEvent = () => {
      setIsAuthenticated(false);
    };

    window.addEventListener("admin_logout", handleLogoutEvent);
    return () => window.removeEventListener("admin_logout", handleLogoutEvent);
  }, []);

  // Fetch departments list
  const loadDepartments = useCallback(async () => {
    try {
      const data = await fetchDepartments();
      if (data.success) {
        setDepartments(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load departments:", err);
    }
  }, []);

  // Fetch student responses based on filters
  const loadResponses = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError("");

    try {
      let data;
      // If department is selected specifically and no search query, use department endpoint or filtered query
      const params = {};
      if (selectedDepartment) params.department = selectedDepartment;
      if (roleFilter) params.role = roleFilter;
      if (subRoleFilter) params.subRole = subRoleFilter;
      if (yearFilter) params.year = yearFilter;
      if (searchQuery.trim()) params.search = searchQuery.trim();

      data = await fetchAllResponses(params);

      if (data.success) {
        setResponses(data.data || []);
      } else {
        setError(data.message || "Failed to load responses");
      }
    } catch (err) {
      console.error("Error loading responses:", err);
      setError(
        err.response?.data?.message || "Failed to connect to backend server."
      );
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, selectedDepartment, roleFilter, subRoleFilter, yearFilter, searchQuery]);

  // Trigger loads when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadDepartments();
      loadResponses();
    }
  }, [isAuthenticated, loadDepartments, loadResponses]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setResponses([]);
    setDepartments([]);
  };

  const handleResetFilters = () => {
    setSelectedDepartment("");
    setRoleFilter("");
    setSubRoleFilter("");
    setYearFilter("");
    setSearchQuery("");
  };

  const handleExportCSV = () => {
    const filename = selectedDepartment
      ? `${selectedDepartment}_responses.csv`
      : "all_student_responses.csv";
    exportResponsesToCSV(responses, filename);
  };

  const hasActiveFilters = Boolean(
    selectedDepartment || roleFilter || subRoleFilter || yearFilter || searchQuery
  );

  if (authChecking) {
    return (
      <div className="app-loader-screen">
        <div className="spinner-large"></div>
        <p>Verifying secure session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginModal onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Navbar
        totalCount={responses.length}
        onRefresh={() => {
          loadDepartments();
          loadResponses();
        }}
        onExportCSV={handleExportCSV}
        onLogout={handleLogout}
        loading={loading}
      />

      <main className="main-content">
        <div className="dashboard-container">
          {/* Quick Metrics */}
          <StatsCards
            responses={responses}
            departmentsCount={departments.length}
          />

          {/* Filtering Section */}
          <FilterBar
            departments={departments}
            selectedDepartment={selectedDepartment}
            onSelectDepartment={setSelectedDepartment}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            subRoleFilter={subRoleFilter}
            onSubRoleFilterChange={setSubRoleFilter}
            yearFilter={yearFilter}
            onYearFilterChange={setYearFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Error Banner */}
          {error && (
            <div className="dashboard-error-banner">
              <span>{error}</span>
              <button onClick={loadResponses} className="retry-btn">
                Retry
              </button>
            </div>
          )}

          {/* Responses Table */}
          <ResponseTable
            responses={responses}
            onSelectStudent={setSelectedStudent}
            loading={loading}
          />
        </div>
      </main>

      {/* Applicant Detail Popup Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
