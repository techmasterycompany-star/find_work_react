import { userTypes } from "../services/analyticsData";

function UserTypeItem({ user, candidate }) {
  return (
    <div className="flex flex-col gap-0.5 font-['Inter']">
      <div className="flex items-center gap-2">
        <span
          className={[
            "h-2.5 w-2.5 rounded-full",
            candidate ? "bg-[#7C3AED]" : "bg-[#A77CF1]",
          ].join(" ")}
        />

        <strong className="text-lg font-semibold text-[#3F3F46]">
          {user.percentage}%
        </strong>
      </div>

      <span className="ml-4 text-xs text-[#52525B]">{user.label}</span>

      <small className="ml-4 text-[11px] text-[#52525B]">{user.count}</small>
    </div>
  );
}

export default function UsersByType() {
  return (
    <section className="h-[404px] min-w-0 rounded-lg bg-white p-6 shadow-[0_0_4px_rgba(124,58,237,0.25)]">
      <h2 className="font-['Inter'] text-base font-semibold leading-[19px] text-[#52525B]">
        Users by Type
      </h2>

      <div className="flex h-[calc(100%-42px)] items-center justify-center gap-8">
        {/* Donut */}
        <div className="flex w-[220px] justify-center">
          <div
            className="relative h-44 w-44 rounded-full"
            style={{
              background:
                "conic-gradient(#7C3AED 0deg 295.2deg, #A77CF1 295.2deg 360deg)",
            }}
          >
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-7">
          <UserTypeItem user={userTypes[0]} candidate />

          <UserTypeItem user={userTypes[1]} candidate={false} />
        </div>
      </div>
    </section>
  );
}
