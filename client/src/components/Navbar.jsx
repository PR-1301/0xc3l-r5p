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
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-logo">
          <Users size={22} className="brand-icon" />
        </div>
        <div>
          <h1 className="brand-title">Recruitment Responses</h1>
          <div className="brand-meta">
            <span className="status-dot"></span>
            <span className="status-text">Database Connected</span>
            <span className="divider">•</span>
            <span className="count-pill">{totalCount} Total Entries</span>
          </div>
        </div>
      </div>

      <div className="navbar-actions">
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
    </header>
  );
}
