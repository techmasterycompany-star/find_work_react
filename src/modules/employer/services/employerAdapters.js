const WORK_TYPE_MAP = {
  fulltime: "Full-Time",
  full_time: "Full-Time",
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "Onsite",
  "on site": "Onsite",
};

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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

function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function normaliseJobStatus(status) {
  if (!status) return "Active";
  const s = String(status).toLowerCase();
  if (s === "closed" || s === "expired") return "Closed";
  if (s === "closing soon" || s === "closing") return "Closing Soon";
  if (s === "pending" || s === "review") return "Pending";
  return "Active";
}

export function toEmployerJobCard(job) {
  const applicationsCount =
    job.applicationsCount ??
    job.application_count ??
    job.applications?.length ??
    0;
  const views = job.views ?? job.view_count ?? 0;
  const created = job.createdAt ?? job.created_at;

  return {
    id: job._id ?? job.id,
    title: job.title ?? "Untitled role",
    date: created ? `Posted ${relativeTime(created)} ago` : "Posted recently",
    status: normaliseJobStatus(job.status),
    applications: `${applicationsCount} application${applicationsCount === 1 ? "" : "s"}`,
    views: `${views} Views`,
    type:
      WORK_TYPE_MAP[String(job.work_type).toLowerCase()] ??
      job.work_type ??
      "—",
    location: job.location ?? "—",
    salary: formatSalary(job),
    _raw: job,
  };
}

function formatSalary(job) {
  const min = job.salary_min ?? job.salaryMin;
  const max = job.salary_max ?? job.salaryMax;
  if (min == null && max == null) return "—";
  if (min != null && max != null) return `$${min} - $${max}`;
  return `$${min ?? max}`;
}

const EXPERIENCE_MAP = {
  "Entry level": "junior",
  "Mid level": "mid",
  "Senior level": "senior",
  "Lead / Manager": "lead",
};

function isMongoId(str) {
  return typeof str === "string" && /^[0-9a-f]{24}$/i.test(str);
}

function defaultDeadline() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

export function fromJobPostForm(formData) {
  const payload = {
    title: formData.jobTitle,
    description: formData.overview,
    responsibilities: formData.responsibilities,
    requirements: formData.qualifications,
    technologies: Array.isArray(formData.technologies)
      ? formData.technologies
      : [],
    location: formData.location,
    work_type: formData.isRemote ? "remote" : "onsite",
    salary_min: Number(formData.salaryMin) || 0,
    salary_max: Number(formData.salaryMax) || 0,
    experience_level:
      EXPERIENCE_MAP[formData.experienceLevel] ??
      formData.experienceLevel ??
      "junior",
    application_deadline: defaultDeadline(),
  };

  if (isMongoId(formData.jobCategory)) {
    payload.category_id = formData.jobCategory;
  }

  return payload;
}

function planDescription(plan) {
  const limit = plan.job_post_limit;
  if (plan.name === "Free")
    return "Perfect for small teams and startups testing the waters";
  if (plan.name === "Basic")
    return "Great for growing teams that need more visibility";
  if (plan.name === "Premium")
    return "Our most comprehensive solution for global teams";
  if (limit != null) return `Up to ${limit} job posts`;
  return "Unlimited job posts";
}

function planBenefits(plan) {
  const benefits = [];
  const limit = plan.job_post_limit;
  benefits.push(limit == null ? "Unlimited Job Posts" : `${limit} Job Posts`);
  if (plan.has_direct_messaging) benefits.push("Direct Candidate Messaging");
  if (plan.has_premium_reports) benefits.push("Premium Reports");
  benefits.push(plan.name === "Free" ? "Standard Support" : "Priority Support");
  if (plan.is_featured) benefits.push("Featured Badge");
  return benefits;
}

export function toSubscriptionPlan(plan, billingCycle = "monthly") {
  const isMonthly = billingCycle === "monthly";
  const price = isMonthly ? plan.price_monthly : plan.price_yearly;
  const isFree = plan.price_monthly === 0 && plan.price_yearly === 0;

  return {
    id: plan._id,
    plantype: plan.name,
    description: planDescription(plan),
    price: `$${price}`,
    date: isMonthly ? "/month" : "/year",
    btntext: isFree
      ? "Get Started"
      : plan.is_featured
        ? "Select Premium"
        : "Select Plan",
    selected: plan.is_featured === true,
    tag: plan.is_featured ? "Best choice" : null,
    benefits: planBenefits(plan),
    stripePriceId: isMonthly
      ? plan.stripe_price_id_monthly
      : plan.stripe_price_id_yearly,
    isFree,
  };
}

const NOTIF_DOT_BY_TYPE = {
  job: "bg-[#8B5CF6]",
  company: "bg-[#22C55E]",
  comment: "bg-[#EF4444]",
  system: "bg-[#71717A]",
  application: "bg-[#3B82F6]",
};

const NOTIF_TAG_BY_TYPE = {
  job: { label: "Job", className: "bg-[#F5F3FF] text-[#7C3AED]" },
  company: {
    label: "Company",
    className: "bg-[rgba(34,197,94,0.1)] text-[#22C55E]",
  },
  comment: { label: "Comment", className: "bg-[#F5F3FF] text-[#7C3AED]" },
  application: {
    label: "Application",
    className: "bg-[rgba(59,130,246,0.1)] text-[#3B82F6]",
  },
  system: { label: "System", className: "bg-[#F4F4F5] text-[#71717A]" },
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

export function toTechnologyOption(tech) {
  return {
    value: tech._id ?? tech.id,
    label: tech.name ?? String(tech),
  };
}
