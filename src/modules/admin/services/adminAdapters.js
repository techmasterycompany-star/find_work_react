const ROLE_TO_TYPE = {
  employer: 'Employer',
  candidate: 'Candidate',
  admin: 'Admin',
};


function normaliseUserStatus(user) {
  if (user.status) {
    const s = String(user.status).toLowerCase();
    if (s === 'active' || s === 'activated') return 'Active';
    if (s === 'suspended' || s === 'inactive') return 'Inactive';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  return user.isActive === false ? 'Inactive' : 'Active';
}

function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function toUserRow(user) {
  const name =
    user.name ??
    user.employerProfile?.company_name ??
    user.candidateProfile?.fullName ??
    'Unknown';

  const profileLabel =
    user.role === 'employer'
      ? user.employerProfile?.industry || 'Ltd'
      : user.candidateProfile?.title || 'Ltd';

  return {
    id: user._id ?? user.id,
    name,
    label: profileLabel,
    type: ROLE_TO_TYPE[user.role] ?? 'User',
    role: user.role, // keep raw role too, in case pages need it
    email: user.email,
    joinedDate: formatDate(user.createdAt ?? user.joinedDate),
    status: normaliseUserStatus(user),
    avatar: initials(name),
    _raw: user, 
  };
}

const WORK_TYPE_MAP = {
  fulltime: 'Fulltime',
  full_time: 'Fulltime',
  remote: 'Remote',
  hybrid: 'Hybird',
  onsite: 'Fulltime',
};

function normaliseJobStatus(status) {
  if (!status) return 'pending';
  const s = String(status).toLowerCase();
  if (s === 'approved' || s === 'active' || s === 'activated') return 'approved';
  if (s === 'rejected') return 'rejected';
  return 'pending';
}

export function toJobRow(job) {
  const employer = job.employer ?? job.company ?? {};
  const category = job.category ?? {};
  const title = job.title ?? 'Untitled role';

  return {
    id: job._id ?? job.id,
    name: employer.name ?? employer.company_name ?? 'Unknown company',
    email: employer.email ?? '',
    logo: employer.logo ?? null,
    industry: category.name ?? job.industry ?? 'General',
    submittedAt: formatDate(job.createdAt ?? job.submittedAt),
    status: normaliseJobStatus(job.status),
    type: WORK_TYPE_MAP[String(job.work_type).toLowerCase()] ?? job.work_type ?? 'Fulltime',
    date: job.date ?? 'Posted recently',
    title,
    salary: job.salary ?? job.salaryRange ?? '—',
    education: job.education ?? '—',
    expiredate: formatDate(job.expireAt ?? job.expiredate),
    Level: job.Level ?? job.seniority ?? 'Entry Level',
    Address: job.location ?? job.Address ?? '—',
    skills: (job.technologies ?? job.skills ?? []).map((t) => ({
      skillname: t.name ?? t.skillname ?? String(t),
    })),
    _raw: job,
  };
}


export function toCompanyRow(user) {
  const profile = user.employerProfile ?? {};
  const name = profile.company_name ?? user.name ?? 'Unknown company';

  
  let status = 'pending';
  if (user.status) {
    const s = String(user.status).toLowerCase();
    if (s === 'active' || s === 'activated') status = 'activated';
    else if (s === 'rejected') status = 'rejected';
    else if (s === 'suspended' || s === 'inactive') status = 'rejected';
  } else if (user.isActive === true) {
    status = 'activated';
  }

  return {
    id: user._id ?? user.id,
    name,
    email: user.email,
    logo: profile.logo ?? null,
    industry: profile.industry ?? 'Software/Technology',
    submittedAt: formatDate(user.createdAt),
    status,
    phone: profile.phone ?? '—',
    description: profile.description ?? '',
    details: {
      industry: profile.industry ?? '—',
      size: profile.size ?? '—',
      website: profile.website ?? '—',
      location: profile.location ?? '—',
    },
    documents: profile.documents ?? [],
    _raw: user,
  };
}

const NOTIF_DOT_BY_TYPE = {
  job: 'bg-[#8B5CF6]',
  company: 'bg-[#22C55E]',
  comment: 'bg-[#EF4444]',
  system: 'bg-[#71717A]',
};

const NOTIF_TAG_BY_TYPE = {
  job: { label: 'Job', className: 'bg-[#F5F3FF] text-[#7C3AED]' },
  company: { label: 'Company', className: 'bg-[rgba(34,197,94,0.1)] text-[#22C55E]' },
  comment: { label: 'Comment', className: 'bg-[#F5F3FF] text-[#7C3AED]' },
  system: { label: 'System', className: 'bg-[#F4F4F5] text-[#71717A]' },
};

function relativeTime(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function toNotificationRow(n) {
  const type = String(n.type ?? 'system').toLowerCase();
  const name = n.actor?.name ?? n.from ?? 'System';
  return {
    id: n._id ?? n.id,
    name,
    message: n.message ?? n.title ?? '',
    avatar: initials(name),
    tags: n.tags ?? (NOTIF_TAG_BY_TYPE[type] ? [NOTIF_TAG_BY_TYPE[type]] : []),
    time: relativeTime(n.createdAt),
    dotColor: NOTIF_DOT_BY_TYPE[type] ?? NOTIF_DOT_BY_TYPE.system,
    action: n.action ?? null,
    comment: n.comment ?? null,
    _raw: n,
  };
}
