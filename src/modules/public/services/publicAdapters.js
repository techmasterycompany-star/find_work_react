export function toJobCard(job) {
  if (!job) return null;
  const employer = job.employer ?? job.company ?? {};
  const category = job.category ?? {};

  const status = String(job.status ?? "").toLowerCase();
  const active = status === "approved" || status === "active";

  let salaryStr = "Negotiable";
  if (job.salaryRange) {
    const cur = job.salaryRange.currency ?? "$";
    salaryStr = `${cur}${job.salaryRange.min ?? ""} - ${cur}${job.salaryRange.max ?? ""}`.trim();
  } else if (job.salary) {
    salaryStr = String(job.salary);
  }

  const appCount = job.applicationsCount ?? job.application_count ?? job.applications?.length ?? 0;
  const viewCount = job.views ?? job.view_count ?? 0;

  return {
    id: job._id ?? job.id,
    _id: job._id ?? job.id,
    img: employer.logoUrl ?? employer.logo ?? null,
    date: job.createdAt ? `Posted ${relativeTime(job.createdAt)} ago` : "Posted recently",
    publication: deriveDateFilter(job.createdAt),
    title: job.title ?? "Untitled Role",
    type: job.workType ?? job.employmentType ?? "Full-Time",
    applications: appCount > 0 ? `${appCount} applications` : "Be the first to apply",
    education: job.experienceLevel ?? "Any",
    views: viewCount > 0 ? `${formatViews(viewCount)} Views` : "0 Views",
    status: active ? "Active" : "Closed",
    location: job.location ?? "Remote",
    company: employer.companyName ?? employer.name ?? "Company",
    name: employer.companyName ?? employer.name ?? "Company", 
    salary: salaryStr,
    Address: job.location ?? "Remote", 
    categorey: category.name ?? "General", 
    desc: job.description ?? "",
    isSaved: false, 
    apply: false, 
    active,
    isExpired: checkExpiry(job),
    _raw: job,
  };
}

export function toCompanyCard(jobsForEmployer = []) {
  if (jobsForEmployer.length === 0) return null;
  const firstJob = jobsForEmployer[0];
  const employer = firstJob.employer ?? firstJob.company ?? {};
  const employerId = employer._id ?? employer.id ?? employer.userId;

  const openJobs = jobsForEmployer.filter((j) => {
    const s = String(j.status ?? "").toLowerCase();
    return s === "approved" || s === "active";
  }).length;

  const totalViews = jobsForEmployer.reduce(
    (sum, j) => sum + (j.views ?? j.view_count ?? 0),
    0
  );

  return {
    id: employerId,
    _id: employerId,
    img: employer.logoUrl ?? employer.logo ?? null,
    name: employer.companyName ?? employer.name ?? "Company",
    rate: employer.rating ?? 4.0, 
    description: employer.description ?? employer.about ?? "",
    openjobsnum: openJobs,
    employeesnum: employer.employeeCount ?? employer.employees ?? "—",
    Salaries: employer.salaryRange
      ? `${employer.salaryRange.min ?? ""} - ${employer.salaryRange.max ?? ""}`
      : "—", 
    companyScope: employer.industry ?? employer.scope ?? "Software House",
    companyStatus: openJobs > 0 ? "Hiring" : "Closed",
    categorey: employer.industry ?? "Software House",
    size: deriveCompanySize(employer.employeeCount ?? employer.employees),
    salary: "—",
    views: totalViews,
    hiringSuccess: openJobs > 5 ? "High" : openJobs > 0 ? "Medium" : "Low",
    reviews: employer.reviewCount ?? 0,
    ratings: employer.rating ?? 4.0,
    Address: employer.location ?? employer.address ?? "—",
    _raw: employer,
  };
}

export function deriveCompanies(jobs = []) {
  const byEmployer = new Map();
  for (const job of jobs) {
    const employer = job.employer ?? job.company ?? {};
    const id = employer._id ?? employer.id ?? employer.userId ?? "unknown";
    if (!byEmployer.has(id)) byEmployer.set(id, []);
    byEmployer.get(id).push(job);
  }
  const companies = [];
  for (const jobsForEmployer of byEmployer.values()) {
    const c = toCompanyCard(jobsForEmployer);
    if (c) companies.push(c);
  }
  return companies;
}

export function toApplicationCard(app) {
  const job = app.job ?? {};
  const employer = job.employer ?? job.company ?? {};
  const status = String(app.status ?? "submitted").toLowerCase();

  return {
    id: app._id ?? app.id,
    title: job.title ?? "Untitled Role",
    company: employer.companyName ?? employer.name ?? "Company",
    companyLogo: employer.logoUrl ?? employer.logo ?? null,
    posted: app.createdAt ? `Applied ${relativeTime(app.createdAt)} ago` : "Applied recently",
    types: employer.companyName ?? employer.name ?? "Company", 
    btn: status === "interview" ? "View Interview Prep" : "Track Application",
    status: statusToLabel(status),
    _raw: app,
  };
}


function relativeTime(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function deriveDateFilter(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days <= 1) return "Last 24 hours";
  if (days <= 3) return "Last 3 days";
  if (days <= 7) return "Last 7 days";
  if (days <= 14) return "Last 14 days";
  return "Older";
}

function checkExpiry(job) {
  if (!job.applicationDeadline && !job.deadline) return false;
  const deadlineStr = job.applicationDeadline || job.deadline;
  const deadline = new Date(deadlineStr);
  if (Number.isNaN(deadline.getTime())) return false;
  return deadline.getTime() < Date.now();
}

function formatViews(count) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

function deriveCompanySize(employeeCount) {
  if (typeof employeeCount !== "number") return "—";
  if (employeeCount <= 50) return "1 - 50";
  if (employeeCount <= 200) return "51 - 200";
  if (employeeCount <= 500) return "201 - 500";
  if (employeeCount <= 1000) return "501 - 1000";
  return "1000+";
}

function statusToLabel(status) {
  const map = {
    submitted: "Submitted",
    under_review: "Under Review",
    pending: "Pending",
    accepted: "Accepted",
    interview: "Interview Scheduled",
    rejected: "Rejected",
    cancelled: "Cancelled",
  };
  return map[status] ?? "Submitted";
}
