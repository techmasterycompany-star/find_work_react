export const STAT_CARDS = [
  {
    id: "total-applicants",
    label: "Total Applicants",
    value: 28,
    deltaPct: 12,
    deltaDir: "up",
    periodLabel: "from last 30 days",
  },
  {
    id: "closed-session",
    label: "Closed Session",
    value: 6,
    deltaPct: 1,
    deltaDir: "up",
    periodLabel: "from last 30 days",
  },
  {
    id: "interviews",
    label: "Interviews",
    value: 5,
    deltaPct: 2,
    deltaDir: "down",
    periodLabel: "from last 30 days",
  },
  {
    id: "offers-received",
    label: "Offers Received",
    value: 2,
    deltaPct: 0,
    deltaDir: "flat",
    periodLabel: "from last 30 days",
  },
];

export const APPLICATIONS_OVER_TIME = [
  { date: "Aug 1", applied: 12, accepted: 4, rejected: 6 },
  { date: "Aug 5", applied: 18, accepted: 7, rejected: 9 },
  { date: "Aug 9", applied: 25, accepted: 10, rejected: 12 },
  { date: "Aug 13", applied: 30, accepted: 12, rejected: 15 },
  { date: "Aug 17", applied: 38, accepted: 15, rejected: 18 },
  { date: "Aug 21", applied: 45, accepted: 18, rejected: 22 },
  { date: "Aug 25", applied: 52, accepted: 21, rejected: 25 },
  { date: "Aug 31", applied: 60, accepted: 24, rejected: 28 },
];

export const RECENT_ACTIVITIES = [
  {
    id: "ra-1",
    company: "Tech Company",
    position: "UI/UX Designer",
    appliedDate: "25 Aug 2026",
    jobType: "Full-Time",
    status: "accepted",
  },
  {
    id: "ra-2",
    company: "Tech Company",
    position: "UI/UX Designer",
    appliedDate: "20 Aug 2026",
    jobType: "Full-Time",
    status: "interview",
  },
  {
    id: "ra-3",
    company: "Tech Company",
    position: "UI/UX Designer",
    appliedDate: "15 Aug 2026",
    jobType: "Full-Time",
    status: "rejected",
  },
  {
    id: "ra-4",
    company: "Tech Company",
    position: "UI/UX Designer",
    appliedDate: "10 Aug 2026",
    jobType: "Full-Time",
    status: "accepted",
  },
];

export const APPLICATIONS_BY_STATUS = [
  { name: "Pending", value: 4.03, color: "#f59e0b" },
  { name: "Interview", value: 4.03, color: "#8b5cf6" },
  { name: "Accepted", value: 41.03, color: "#10b981" },
  { name: "Rejected", value: 50.0, color: "#ef4444" },
];
export const APPLICATIONS_TOTAL = 78;

export const TOP_CATEGORIES = [
  { name: "UI/UX Design", count: 48 },
  { name: "Product Design", count: 40 },
  { name: "Graphics", count: 31 },
  { name: "Frontend", count: 18 },
];

export const ANALYTICS_DATE_LABEL = "May 26, 2026";
