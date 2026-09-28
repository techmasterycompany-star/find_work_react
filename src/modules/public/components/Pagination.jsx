export default function Pagination({
  current,
  total,
  onChange,
  showArrows = false,
}) {
  const pages =
    total <= 4
      ? Array.from({ length: total }, (_, i) => i + 1)
      : [1, 2, 3, "...", total - 1, total];

  const pageButton = (page) => (
    <button
      key={page}
      type="button"
      onClick={() => onChange(page)}
      className={`h-8 w-8 rounded-full text-sm font-medium ${
        page === current
          ? "bg-violet-600 text-white"
          : "text-zinc-500 hover:bg-zinc-100"
      }`}
    >
      {page}
    </button>
  );

  return (
    <div className="flex items-center gap-1">
      {showArrows && (
        <button
          type="button"
          onClick={() => onChange(Math.max(1, current - 1))}
          className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-100"
        >
          ‹
        </button>
      )}
      {pages.map((p) =>
        p === "..." ? (
          <span key="ellipsis" className="px-1 text-zinc-400">
            ...
          </span>
        ) : (
          pageButton(p)
        ),
      )}
      {showArrows && (
        <button
          type="button"
          onClick={() => onChange(Math.min(total, current + 1))}
          className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-100"
        >
          ›
        </button>
      )}
    </div>
  );
}
