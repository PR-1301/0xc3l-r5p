import React from "react";
import { Users, Code, Sparkles, Building2 } from "lucide-react";

export default function StatsCards({ responses, departmentsCount }) {
  const total = responses.length;
  const techCount = responses.filter((r) => r.role === "Tech").length;
  const nonTechCount = responses.filter((r) => r.role === "Non-Tech").length;

  const techPercent = total > 0 ? Math.round((techCount / total) * 100) : 0;
  const nonTechPercent = total > 0 ? Math.round((nonTechCount / total) * 100) : 0;

  return (
    <div className="stats-grid">
      <div className="stat-card card-total">
        <div className="stat-icon-wrapper total-icon">
          <Users size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Total Applicants</span>
          <h3 className="stat-value">{total}</h3>
          <span className="stat-hint">Across all departments</span>
        </div>
      </div>

      <div className="stat-card card-tech">
        <div className="stat-icon-wrapper tech-icon">
          <Code size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Tech Track</span>
          <h3 className="stat-value">{techCount}</h3>
          <span className="stat-hint">{techPercent}% of applicants</span>
        </div>
      </div>

      <div className="stat-card card-nontech">
        <div className="stat-icon-wrapper nontech-icon">
          <Sparkles size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Non-Tech Track</span>
          <h3 className="stat-value">{nonTechCount}</h3>
          <span className="stat-hint">{nonTechPercent}% of applicants</span>
        </div>
      </div>

      <div className="stat-card card-dept">
        <div className="stat-icon-wrapper dept-icon">
          <Building2 size={22} />
        </div>
        <div className="stat-details">
          <span className="stat-label">Departments</span>
          <h3 className="stat-value">{departmentsCount}</h3>
          <span className="stat-hint">Distinct branches</span>
        </div>
      </div>
    </div>
  );
}
