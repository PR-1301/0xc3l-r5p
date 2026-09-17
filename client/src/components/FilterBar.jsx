import React from "react";
import { Search, X, Filter, RotateCcw } from "lucide-react";

export default function FilterBar({
  departments,
  selectedDepartment,
  onSelectDepartment,
  roleFilter,
  onRoleFilterChange,
  subRoleFilter,
  onSubRoleFilterChange,
  yearFilter,
  onYearFilterChange,
  searchQuery,
  onSearchChange,
  onResetFilters,
  hasActiveFilters,
}) {
  const techSubRoles = ["Backend Developer", "Frontend Developer"];
  const nonTechSubRoles = [
    "Public speaking",
    "Events",
    "Design",
    "Editor",
    "Content Creator",
  ];

  const availableSubRoles =
    roleFilter === "Tech"
      ? techSubRoles
      : roleFilter === "Non-Tech"
      ? nonTechSubRoles
      : [...techSubRoles, ...nonTechSubRoles];

  return (
    <div className="filter-panel">
      {/* Top Search & Filter Bar */}
      <div className="filter-top-row">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Name, Reg No, Email, or Mobile..."
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => onSearchChange("")}
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="dropdown-filters">
          {/* Role Filter */}
          <div className="select-wrapper">
            <select
              value={roleFilter}
              onChange={(e) => {
                onRoleFilterChange(e.target.value);
                onSubRoleFilterChange(""); // Reset subrole on role change
              }}
              aria-label="Filter by Track"
            >
              <option value="">All Tracks</option>
              <option value="Tech">Tech</option>
              <option value="Non-Tech">Non-Tech</option>
            </select>
          </div>

          {/* SubRole Filter */}
          <div className="select-wrapper">
            <select
              value={subRoleFilter}
              onChange={(e) => onSubRoleFilterChange(e.target.value)}
              aria-label="Filter by Role"
            >
              <option value="">All Roles</option>
              {availableSubRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="select-wrapper">
            <select
              value={yearFilter}
              onChange={(e) => onYearFilterChange(e.target.value)}
              aria-label="Filter by Year"
            >
              <option value="">All Years</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              className="btn btn-ghost reset-filter-btn"
              onClick={onResetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Department Tabs Filter */}
      <div className="department-scroll-container">
        <div className="dept-pills">
          <button
            className={`dept-pill ${selectedDepartment === "" ? "active" : ""}`}
            onClick={() => onSelectDepartment("")}
          >
            All Departments
          </button>
          {departments.map((dept) => (
            <button
              key={dept.department}
              className={`dept-pill ${
                selectedDepartment.toLowerCase() === dept.department.toLowerCase()
                  ? "active"
                  : ""
              }`}
              onClick={() => onSelectDepartment(dept.department)}
            >
              <span>{dept.department}</span>
              <span className="dept-count-badge">{dept.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
