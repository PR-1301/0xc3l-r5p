import React, { useState } from "react";
import {
  Mail,
  Phone,
  ExternalLink,
  Copy,
  Check,
  Eye,
  Inbox,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function ResponseTable({ responses, onSelectStudent, loading }) {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, id) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) {
    return (
      <div className="table-loading-container">
        <div className="table-skeleton-rows">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-row"></div>
          ))}
        </div>
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Inbox size={48} />
        </div>
        <h3>No Responses Found</h3>
        <p>No student responses matched your current search and filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="responses-table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>#</th>
              <th>Applicant</th>
              <th>Dept & Year</th>
              <th>Track & Role</th>
              <th>Contact Info</th>
              <th>Profiles</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((student, index) => {
              const isTech = student.role === "Tech";
              return (
                <tr
                  key={student._id || index}
                  className="table-row-item"
                  onClick={() => onSelectStudent(student)}
                >
                  <td className="index-cell">{index + 1}</td>

                  {/* Applicant Name & Reg No */}
                  <td>
                    <div className="applicant-cell">
                      <div className="avatar-circle">
                        {student.Name ? student.Name.charAt(0).toUpperCase() : "S"}
                      </div>
                      <div>
                        <div className="student-name">{student.Name}</div>
                        {student.regNumber && (
                          <span className="reg-badge">
                            Reg: {student.regNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Department & Year */}
                  <td>
                    <div className="dept-cell">
                      <span className="dept-name-tag">{student.department}</span>
                      <span className="dept-sub-info">
                        {student.year} • Sec {student.section || "A"}
                      </span>
                    </div>
                  </td>

                  {/* Role & Track */}
                  <td>
                    <div className="track-cell">
                      <span
                        className={`track-pill ${
                          isTech ? "track-tech" : "track-nontech"
                        }`}
                      >
                        {student.role}
                      </span>
                      <span className="subrole-pill">{student.subRole}</span>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="contact-cell">
                      {/* Personal Email */}
                      {student.personalEmail && (
                        <div className="contact-item">
                          <Mail size={13} className="contact-icon" />
                          <span className="contact-text" title={student.personalEmail}>
                            {student.personalEmail}
                          </span>
                          <button
                            className="copy-btn"
                            onClick={() =>
                              copyToClipboard(
                                student.personalEmail,
                                `pmail-${student._id}`
                              )
                            }
                            title="Copy email"
                          >
                            {copiedField === `pmail-${student._id}` ? (
                              <Check size={12} className="text-success" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        </div>
                      )}

                      {/* CIT Email (if provided) */}
                      {student.email && (
                        <div className="contact-item cit-mail">
                          <Mail size={13} className="contact-icon" />
                          <span className="contact-text" title={student.email}>
                            {student.email}
                          </span>
                        </div>
                      )}

                      {/* Phone */}
                      {student.mobileNumber && (
                        <div className="contact-item">
                          <Phone size={13} className="contact-icon" />
                          <span className="contact-text">
                            {student.mobileNumber}
                          </span>
                          <button
                            className="copy-btn"
                            onClick={() =>
                              copyToClipboard(
                                student.mobileNumber,
                                `phone-${student._id}`
                              )
                            }
                            title="Copy phone number"
                          >
                            {copiedField === `phone-${student._id}` ? (
                              <Check size={12} className="text-success" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Social Links */}
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="social-links-cell">
                      {student.githubUrl ? (
                        <a
                          href={
                            student.githubUrl.startsWith("http")
                              ? student.githubUrl
                              : `https://${student.githubUrl}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="social-btn github"
                          title="View GitHub Profile"
                        >
                          <GithubIcon size={15} />
                        </a>
                      ) : (
                        <span className="social-btn-disabled" title="No GitHub provided">
                          <GithubIcon size={15} />
                        </span>
                      )}

                      {student.linkedinUrl ? (
                        <a
                          href={
                            student.linkedinUrl.startsWith("http")
                              ? student.linkedinUrl
                              : `https://${student.linkedinUrl}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="social-btn linkedin"
                          title="View LinkedIn Profile"
                        >
                          <LinkedinIcon size={15} />
                        </a>
                      ) : (
                        <span className="social-btn-disabled" title="No LinkedIn provided">
                          <LinkedinIcon size={15} />
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="btn-view-details"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStudent(student);
                      }}
                      title="View full applicant details"
                    >
                      <Eye size={15} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
