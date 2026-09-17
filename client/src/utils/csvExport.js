/**
 * Utility to export student recruitment responses to a downloadable CSV
 */
export const exportResponsesToCSV = (responses, filename = "student_responses.csv") => {
  if (!responses || responses.length === 0) {
    alert("No data available to export.");
    return;
  }

  const headers = [
    "Name",
    "Department",
    "Year",
    "Section",
    "Role Track",
    "Specific Role",
    "Personal Email",
    "CIT Email",
    "Mobile Number",
    "Register Number",
    "GitHub URL",
    "LinkedIn URL",
    "Submitted At",
  ];

  const escapeCSV = (value) => {
    if (value === null || value === undefined) return '""';
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = responses.map((s) => [
    escapeCSV(s.Name),
    escapeCSV(s.department),
    escapeCSV(s.year),
    escapeCSV(s.section),
    escapeCSV(s.role),
    escapeCSV(s.subRole),
    escapeCSV(s.personalEmail),
    escapeCSV(s.email),
    escapeCSV(s.mobileNumber),
    escapeCSV(s.regNumber),
    escapeCSV(s.githubUrl),
    escapeCSV(s.linkedinUrl),
    escapeCSV(s.createdAt ? new Date(s.createdAt).toISOString() : ""),
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
