import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Calendar,
  Copy,
  Check,
  ExternalLink,
  Shield,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function StudentDetailModal({ student, onClose }) {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!student) return null;

  const copyText = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formattedDate = student.createdAt
    ? new Date(student.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const isTech = student.role === "Tech";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-avatar">
              {student.Name ? student.Name.charAt(0).toUpperCase() : "S"}
            </div>
            <div>
              <h2 className="modal-student-name">{student.Name}</h2>
              <div className="modal-meta-row">
                <span className="modal-badge-dept">{student.department}</span>
                <span className="modal-dot">•</span>
                <span className="modal-meta-text">{student.year} (Sec {student.section})</span>
                {student.regNumber && (
                  <>
                    <span className="modal-dot">•</span>
                    <span className="modal-meta-text">Reg: {student.regNumber}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Track and Role Section */}
          <div className="modal-section">
            <h4 className="section-title">
              <Briefcase size={16} />
              <span>Applied Track & Role</span>
            </h4>
            <div className="modal-role-card">
              <div className="role-chip-group">
                <span className={`track-pill large ${isTech ? "track-tech" : "track-nontech"}`}>
                  {student.role} Track
                </span>
                <span className="subrole-pill large">{student.subRole}</span>
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="modal-section">
            <h4 className="section-title">
              <Mail size={16} />
              <span>Contact Information</span>
            </h4>
            <div className="contact-grid">
              {/* Personal Email */}
              <div className="contact-card">
                <div className="contact-card-label">Personal Email</div>
                <div className="contact-card-value">
                  <span>{student.personalEmail || "Not provided"}</span>
                  {student.personalEmail && (
                    <button
                      className="modal-copy-icon"
                      onClick={() => copyText(student.personalEmail, "pmail")}
                      title="Copy personal email"
                    >
                      {copiedKey === "pmail" ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              </div>

              {/* College Email */}
              <div className="contact-card">
                <div className="contact-card-label">CIT College Email</div>
                <div className="contact-card-value">
                  <span>{student.email || "Not provided"}</span>
                  {student.email && (
                    <button
                      className="modal-copy-icon"
                      onClick={() => copyText(student.email, "cmail")}
                      title="Copy college email"
                    >
                      {copiedKey === "cmail" ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="contact-card">
                <div className="contact-card-label">Mobile Number</div>
                <div className="contact-card-value">
                  <span>{student.mobileNumber || "Not provided"}</span>
                  {student.mobileNumber && (
                    <button
                      className="modal-copy-icon"
                      onClick={() => copyText(student.mobileNumber, "phone")}
                      title="Copy mobile number"
                    >
                      {copiedKey === "phone" ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              </div>

              {/* Submission Date */}
              <div className="contact-card">
                <div className="contact-card-label">Submitted At</div>
                <div className="contact-card-value">
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="modal-section">
            <h4 className="section-title">
              <ExternalLink size={16} />
              <span>External Profiles</span>
            </h4>
            <div className="profiles-grid">
              {/* GitHub */}
              <div className="profile-box">
                <div className="profile-brand">
                  <GithubIcon size={20} />
                  <span>GitHub</span>
                </div>
                {student.githubUrl ? (
                  <a
                    href={student.githubUrl.startsWith("http") ? student.githubUrl : `https://${student.githubUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="profile-link-btn"
                  >
                    <span>View Profile</span>
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <span className="no-profile-text">Not provided</span>
                )}
              </div>

              {/* LinkedIn */}
              <div className="profile-box">
                <div className="profile-brand">
                  <LinkedinIcon size={20} />
                  <span>LinkedIn</span>
                </div>
                {student.linkedinUrl ? (
                  <a
                    href={student.linkedinUrl.startsWith("http") ? student.linkedinUrl : `https://${student.linkedinUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="profile-link-btn"
                  >
                    <span>View Profile</span>
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <span className="no-profile-text">Not provided</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
