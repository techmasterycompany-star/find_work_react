import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  STAT_CARDS,
  APPLICATIONS_OVER_TIME,
  RECENT_ACTIVITIES,
  APPLICATIONS_BY_STATUS,
  APPLICATIONS_TOTAL,
  TOP_CATEGORIES,
  ANALYTICS_DATE_LABEL,
} from "../data/analyticsMockData";
import { statusBadge } from "../services/candidateAdapters";
import { HiOutlineCalendar, HiOutlineChevronDown } from "react-icons/hi2";

function StatCard({ label, value, deltaPct, deltaDir, periodLabel }) {
  const deltaColor =
    deltaDir === "up"
      ? "text-emerald-600"
      : deltaDir === "down"
        ? "text-red-500"
        : "text-gray-500";
  const deltaArrow = deltaDir === "up" ? "↑" : deltaDir === "down" ? "↓" : "—";
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className={`text-xs font-semibold ${deltaColor}`}>
          {deltaArrow} {deltaPct}%
        </span>
      </div>
      <p className="mt-1 text-xs text-gray-400">{periodLabel}</p>
    </div>
  );
}

function StatusPill({ status }) {
  const badge = statusBadge(status);
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badge.cls}`}
    >
      {badge.label}
    </span>
  );
}

export default function CandidateAnalytics() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Analytic</h1>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <HiOutlineCalendar className="h-4 w-4" />
          {ANALYTICS_DATE_LABEL}
          <HiOutlineChevronDown className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.id} {...card} />
        ))}
      </div>

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Application over time
          </h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-violet-600" />
              Applied
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Accepted
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Rejected
            </span>
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={APPLICATIONS_OVER_TIME} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ display: "none" }} />
              <Line type="monotone" dataKey="applied" stroke="#7c3aed" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="accepted" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Recent Activities
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wide text-gray-400">
                  <th className="pb-3 pr-4 font-medium">Company</th>
                  <th className="pb-3 pr-4 font-medium">Position</th>
                  <th className="pb-3 pr-4 font-medium">Applied Date</th>
                  <th className="pb-3 pr-4 font-medium">Job Type</th>
                  <th className="pb-3 pr-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECENT_ACTIVITIES.map((row) => (
                  <tr key={row.id} className="text-gray-700">
                    <td className="py-3 pr-4 font-medium text-gray-900">{row.company}</td>
                    <td className="py-3 pr-4">{row.position}</td>
                    <td className="py-3 pr-4 text-gray-500">{row.appliedDate}</td>
                    <td className="py-3 pr-4 text-gray-500">{row.jobType}</td>
                    <td className="py-3 pr-4">
                      <StatusPill status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="mb-1 text-base font-semibold text-gray-900">
              Applications by Status
            </h2>
            <p className="mb-4 text-xs text-gray-400">
              Total {APPLICATIONS_TOTAL}
            </p>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={APPLICATIONS_BY_STATUS}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {APPLICATIONS_BY_STATUS.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs">
              {APPLICATIONS_BY_STATUS.map((s) => (
                <li key={s.name} className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    {s.name}
                  </span>
                  <span className="font-semibold text-gray-700">{s.value}%</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Most Applied Job Categories
            </h2>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TOP_CATEGORIES} layout="vertical" margin={{ left: 8, right: 8 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={11}
                    width={90}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#7c3aed" radius={[0, 4, 4, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
