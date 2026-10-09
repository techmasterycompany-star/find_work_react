export function relativeTime(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const NOTIF_TAG_BY_TYPE = {
  system: "System",
  application: "Application",
  job: "Job",
  comment: "Comment",
};

const NOTIF_DOT_BY_TYPE = {
  system: "#9ca3af",
  application: "#7c3aed",
  job: "#10b981",
  comment: "#f59e0b",
};

export function toNotificationItem(n) {
  const type = String(n.type ?? "system").toLowerCase();
  const name = n.actor?.name ?? n.from ?? n.sender?.name ?? "System";
  return {
    id: n._id ?? n.id,
    name,
    message: n.message ?? n.title ?? n.content ?? "",
    avatar: initials(name),
    tags: NOTIF_TAG_BY_TYPE[type] ? [NOTIF_TAG_BY_TYPE[type]] : [],
    time: relativeTime(n.createdAt ?? n.created_at),
    dotColor: NOTIF_DOT_BY_TYPE[type] ?? NOTIF_DOT_BY_TYPE.system,
    type,
    _raw: n,
  };
}


export function toSavedJobCard(item, myApplicationJobIds = new Set()) {
  const job = item.job ?? item;
  const jobId = job._id ?? job.id;

  const applied = myApplicationJobIds.has(jobId);

   const status = String(job.status ?? "").toLowerCase();
  const active = status === "approved" || status === "active";

  let isExpired = false;
  if (job.applicationDeadline || job.deadline) {
    const deadlineStr = job.applicationDeadline || job.deadline;
    const deadline = new Date(deadlineStr);
    if (!Number.isNaN(deadline.getTime())) {
      isExpired = deadline.getTime() < Date.now();
    }
  }

  const employer = job.employer ?? job.company ?? {};
  const category = job.category ?? {};

  return {
    id: jobId,
    _id: jobId,
    wishlistId: item._id ?? item.id, 
    title: job.title ?? "Untitled Role",
    company: employer.companyName ?? employer.name ?? "Company",
    companyLogo: employer.logoUrl ?? employer.logo ?? null,
    type: job.workType ?? job.employmentType ?? "Full-Time",
    salary: job.salaryRange
      ? `${job.salaryRange.min ?? ""} - ${job.salaryRange.max ?? ""} ${
          job.salaryRange.currency ?? ""
        }`.trim()
      : job.salary ?? "Negotiable",
    categorey: category.name ?? "General", 
    isSaved: true, 
    apply: applied,
    active,
    isExpired,
    publication: job.createdAt
      ? new Date(job.createdAt).toLocaleDateString()
      : "",
    education: job.experienceLevel ?? "Any",
    location: job.location ?? "Remote",
    _raw: job,
  };
}


export function toApplicationItem(app) {
  const job = app.job ?? {};
  const employer = job.employer ?? job.company ?? {};
  return {
    id: app._id ?? app.id,
    status: String(app.status ?? "submitted").toLowerCase(),
    jobTitle: job.title ?? "Untitled Role",
    company: employer.companyName ?? employer.name ?? "Company",
    companyLogo: employer.logoUrl ?? employer.logo ?? null,
    appliedAt: app.createdAt
      ? new Date(app.createdAt).toLocaleDateString()
      : "",
    workType: job.workType ?? "Full-Time",
    _raw: app,
  };
}

export const STATUS_BADGE = {
  submitted: { label: "Submitted", cls: "bg-blue-100 text-blue-700" },
  under_review: { label: "Under Review", cls: "bg-amber-100 text-amber-700" },
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700" },
  accepted: { label: "Accepted", cls: "bg-emerald-100 text-emerald-700" },
  interview: { label: "Interview", cls: "bg-violet-100 text-violet-700" },
  rejected: { label: "Rejected", cls: "bg-red-100 text-red-700" },
  cancelled: { label: "Cancelled", cls: "bg-gray-200 text-gray-700" },
};

export function statusBadge(status) {
  const key = String(status ?? "").toLowerCase();
  return (
    STATUS_BADGE[key] ?? { label: status ?? "—", cls: "bg-gray-100 text-gray-700" }
  );
}