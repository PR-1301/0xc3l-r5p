import React from "react";
import { Users, Download, RefreshCw, LogOut, Shield } from "lucide-react";

export default function Navbar({
  totalCount,
  onRefresh,
  onExportCSV,
  onLogout,
  loading,
}) {
  return (
    <>
      {/* Top Navbar Header (Desktop full navbar, Mobile top brand header) */}
      <header className="navbar">
        <div className="navbar-top-row">
          <div className="navbar-brand">
            <div className="brand-logo">
              <Users size={20} className="brand-icon" />
            </div>
            <div className="brand-text-block">
              <h1 className="brand-title">Recruitments</h1>
              <div className="brand-meta">
                <span className="status-dot"></span>
                <span className="status-text">Connected</span>
                <span className="count-pill">{totalCount}</span>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="navbar-actions-desktop">
            <button
              className="btn btn-secondary"
              onClick={onRefresh}
              disabled={loading}
              title="Refresh Responses"
            >
              <RefreshCw size={16} className={loading ? "spinner" : ""} />
              <span>Refresh</span>
            </button>

            <button
              className="btn btn-primary"
              onClick={onExportCSV}
              disabled={totalCount === 0 || loading}
              title="Download as CSV spreadsheet"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>

            <div className="admin-profile-pill">
              <Shield size={15} className="admin-badge-icon" />
              <span>Admin</span>
            </div>

            <button
              className="btn btn-danger"
              onClick={onLogout}
              title="Logout of Admin Portal"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Bottom Capsule Navbar for Mobile Only */}
      <nav className="mobile-floating-capsule" aria-label="Mobile Navigation">
        <button
          className="capsule-nav-item"
          onClick={onRefresh}
          disabled={loading}
          title="Refresh Data"
          aria-label="Refresh Data"
        >
          <div className="capsule-icon-wrapper">
            <RefreshCw size={20} className={loading ? "spinner" : ""} />
          </div>
          <span className="capsule-label">Refresh</span>
        </button>

        <button
          className="capsule-nav-item capsule-item-export"
          onClick={onExportCSV}
          disabled={totalCount === 0 || loading}
          title="Export CSV"
          aria-label="Export CSV"
        >
          <div className="capsule-icon-wrapper">
            <Download size={20} />
          </div>
          <span className="capsule-label">Export</span>
        </button>

        <button
          className="capsule-nav-item capsule-item-logout"
          onClick={onLogout}
          title="Logout"
          aria-label="Logout"
        >
          <div className="capsule-icon-wrapper">
            <LogOut size={20} />
          </div>
          <span className="capsule-label">Logout</span>
        </button>
      </nav>
    </>
  );
}

