const stats = [
  {
    title: "Total Users",
    value: "3,000",
    percentage: "12.1%",
    subtitle: "From last week",
    purple: true,
  },
  {
    title: "Active Users",
    value: "2,700",
    percentage: "8.1%",
    subtitle: "From last week",
  },
  {
    title: "Candidates",
    value: "1,700",
    percentage: "8.5%",
    subtitle: "From last week",
  },
  {
    title: "Employers",
    value: "1,000",
    percentage: "8.1%",
    subtitle: "From last week",
  },
];

export default function UserManagementStats() {
  return (
    <section className="grid w-full grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`relative h-[72px] overflow-hidden rounded-[8px] border px-5 py-3 ${
            stat.purple
              ? "border-[#6D28D9] bg-[#5B21B6] text-white"
              : "border-[#D4D4D8] bg-white text-[#27272A]"
          }`}
        >
          <div className="flex items-start justify-between">
            <p
              className={`text-[9px] font-normal leading-[11px] ${
                stat.purple ? "text-white/80" : "text-[#71717A]"
              }`}
            >
              {stat.title}
            </p>

            <span
              className={`flex h-[20px] w-[20px] items-center justify-center rounded-full text-[10px] ${
                stat.purple
                  ? "bg-white/20 text-white"
                  : "bg-[#FAFAFA] text-[#71717A]"
              }`}
            >
              ↗
            </span>
          </div>

          <div className="mt-1 flex items-end gap-3">
            <p
              className={`text-[18px] font-semibold leading-[22px] ${
                stat.purple ? "text-white" : "text-[#27272A]"
              }`}
            >
              {stat.value}
            </p>

            <div className="flex items-center gap-1 pb-[2px]">
              <span className="text-[9px] font-medium text-[#22C55E]">
                ↑ {stat.percentage}
              </span>

              <span
                className={`text-[8px] ${
                  stat.purple ? "text-white/60" : "text-[#A1A1AA]"
                }`}
              >
                {stat.subtitle}
              </span>
            </div>
          </div>

          {stat.purple && (
            <div className="absolute -bottom-8 -right-5 h-20 w-20 rounded-full border border-white/10" />
          )}
        </div>
      ))}
    </section>
  );
}