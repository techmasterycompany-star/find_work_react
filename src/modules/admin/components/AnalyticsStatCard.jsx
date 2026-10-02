function ArrowUpRight({ light = false }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7"
        stroke={light ? "#FFFFFF" : "#52525B"}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M9 7H17V15"
        stroke={light ? "#FFFFFF" : "#52525B"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 14L10 10L13 13L19 7"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M14 7H19V12"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AnalyticsStatCard({
  title,
  value,
  change,
  description,
  featured = false,
}) {
  return (
    <article
      className={[
        "relative min-w-0 overflow-hidden rounded-lg p-6 shadow-sm",
        "min-h-[156px]",
        featured ? "bg-gradient-to-b from-[#2E1658] to-[#632FBE]" : "bg-white",
      ].join(" ")}
    >
      {/* Decorative circle */}
      <div
        className={[
          "absolute -right-4 -top-4 h-[70px] w-[70px] rounded-full",
          featured ? "bg-white/10" : "bg-[#F5F3FF]",
        ].join(" ")}
      />

      {/* Action button */}
      <div
        className={[
          "absolute right-1 top-1 z-10 flex h-10 w-10",
          "items-center justify-center rounded-full",
          featured ? "border-2 border-white bg-transparent" : "bg-white",
        ].join(" ")}
      >
        <ArrowUpRight light={featured} />
      </div>

      <div className="relative z-10 flex flex-col gap-[14px]">
        <span
          className={[
            "font-['Inter'] text-xs font-normal leading-[15px]",
            featured ? "text-[#E4E4E7]" : "text-[#52525B]",
          ].join(" ")}
        >
          {title}
        </span>

        <div className="flex items-center gap-1">
          <strong
            className={[
              "font-['Inter'] text-2xl font-semibold leading-[29px]",
              featured ? "text-white" : "text-[#52525B]",
            ].join(" ")}
          >
            {value}
          </strong>

          <TrendArrow />
        </div>

        <div
          className={[
            "flex items-center gap-1 font-['Inter']",
            "text-xs leading-[15px]",
            featured ? "text-white" : "text-[#52525B]",
          ].join(" ")}
        >
          <span className="text-[#22C55E]">{change}</span>

          <span>{description}</span>
        </div>
      </div>
    </article>
  );
}
