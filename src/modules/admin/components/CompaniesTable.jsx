import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const COLS = "grid grid-cols-[1.4fr_1.2fr_1fr_0.8fr_0.8fr] items-center";

export const STATUS_STYLES = {
  pending: { label: "Pending", cls: "bg-amber-500/10 text-[#FCA108]" },
  activated: { label: "Activated", cls: "bg-green-500/10 text-[#22C55E]" },
  rejected: { label: "Rejected", cls: "bg-red-500/10 text-[#EF4444]" },
};

export function StatusBadge({ status }) {
  const { label, cls } = STATUS_STYLES[status];
  return (
    <span className={`rounded px-2 py-1 text-xs ${cls}`}>{label}</span>
  );
}

export function CompanyLogo({ company, size = 30 }) {
  if (company.logo) {
    return (
      <img
        src={company.logo}
        alt={company.name}
        style={{ width: size, height: size }}
        className="rounded-lg object-cover"
      />
    );
  }
  return (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-lg bg-[#0F2A47] text-[10px] font-semibold text-white"
    >
      {company.name.slice(0, 2).toUpperCase()}
    </span>
  );
}

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function getPages(current, total) {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "...", total - 1, total];
  if (current >= total - 2) return [1, 2, "...", total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function CompaniesTable({
  rows,
  total,
  page,
  pageSize,
  onPageChange,
  onReview,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-zinc-300 bg-white">
        {/* Header */}
        <div
          className={`${COLS} h-[100px] border-b border-zinc-600/10 bg-zinc-600/10 py-4 text-center text-base font-medium text-zinc-600`}
        >
          <span className="px-4 text-left">Company</span>
          <span>Submitted</span>
          <span>Industry</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        {rows.length === 0 && (
          <p className="py-16 text-center text-sm text-zinc-500">
            No companies found.
          </p>
        )}
        {rows.map((c) => (
          <div
            key={c.id}
            className={`${COLS} h-[100px] border-b border-zinc-600/10 bg-[#FAFAFA] py-4 text-center text-base font-medium text-zinc-600`}
          >
            <div className="flex items-center gap-2 px-4 text-left">
              <CompanyLogo company={c} />
              <div className="flex flex-col gap-1">
                <span>{c.name}</span>
                <span className="text-xs font-normal">{c.email}</span>
              </div>
            </div>
            <span>{c.industry}</span>
            <span>{formatDate(c.submittedAt)}</span>
            <span>
              <StatusBadge status={c.status} />
            </span>
            <span>
              <button
                type="button"
                onClick={() => onReview(c)}
                className="h-8 rounded-xl bg-[#7C3AED] px-4 text-sm font-medium text-white transition hover:bg-[#6D28D9]"
              >
                Review
              </button>
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-600">
          Showing {from}–{to} of {total} companies
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="flex size-8 items-center justify-center rounded-lg text-zinc-600 disabled:opacity-40"
          >
            <FiChevronLeft size={20} />
          </button>

          {getPages(page, totalPages).map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="text-base font-medium text-zinc-400">
                ...
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`size-10 rounded-lg text-base font-medium text-zinc-800 ${
                  p === page ? "border border-zinc-800" : ""
                }`}
              >
                {p}
              </button>
            )
          )}

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="flex size-8 items-center justify-center rounded-lg text-zinc-600 disabled:opacity-40"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
}