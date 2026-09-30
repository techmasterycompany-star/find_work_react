const activities = [
  {
    name: "Tech Company posted a new job",
    type: "Software House",
    time: "5 Min",
    avatar: "TC",
  },
  {
    name: "Aya ali registered as a candidate",
    type: "UI/UX Designer",
    time: "10 Min",
    avatar: "AA",
    green: true,
  },
  {
    name: "Noon posted a job - Awaiting approval",
    type: "Market Place",
    time: "15 Min",
    avatar: "N",
  },
  {
    name: "TMG Company posted a new job",
    type: "Marketing",
    time: "30 Min",
    avatar: "TM",
  },
  {
    name: "New application for Tech-Frontend",
    type: "Software House",
    time: "1 h",
    avatar: "TF",
  },
];

export default function RecentActivities() {
  return (
    <section className="h-[400px] w-[456px] rounded-lg bg-white p-6 shadow-[0px_0px_4px_rgba(124,58,237,0.25)]">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold leading-[19px] text-[#52525B]">
            Recent Activities
          </h2>

          <button
            type="button"
            className="text-[14px] font-semibold leading-[17px] text-[#7C3AED] underline"
          >
            View All
          </button>
        </div>

        {/* Activities */}
        <div className="flex flex-col gap-2">
          {activities.map((activity) => (
            <div
              key={`${activity.name}-${activity.time}`}
              className="flex min-h-[45px] items-start justify-between gap-4"
            >
              <div className="flex min-w-0 items-start gap-2">
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F5F3FF] text-[11px] font-semibold text-[#7C3AED]">
                  {activity.avatar}
                </div>

                <div className="flex min-w-0 flex-col justify-center gap-2">
                  <p className="truncate text-[14px] font-normal leading-[17px] text-[#52525B]">
                    {activity.name}
                  </p>

                  <span
                    className={`w-fit rounded px-2 py-1 text-[12px] font-normal leading-[15px] ${
                      activity.green
                        ? "bg-[rgba(34,197,94,0.1)] text-[#22C55E]"
                        : "bg-[#F5F3FF] text-[#7C3AED]"
                    }`}
                  >
                    {activity.type}
                  </span>
                </div>
              </div>

              <span className="shrink-0 pt-1 text-right text-[12px] font-medium leading-[15px] text-[#A1A1AA]">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}