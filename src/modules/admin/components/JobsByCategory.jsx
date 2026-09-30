import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Design",
    value: 2000,
    percentage: "33.5%",
    color: "#7C3AED",
  },
  {
    name: "Programming",
    value: 1000,
    percentage: "25.5%",
    color: "#C435E8",
  },
  {
    name: "Marketing",
    value: 900,
    percentage: "13.5%",
    color: "#332284",
  },
  {
    name: "Sales",
    value: 600,
    percentage: "10.5%",
    color: "#C4B5FD",
  },
  {
    name: "Other",
    value: 500,
    percentage: "5.5%",
    color: "#C9C9DE",
  },
];

export default function JobsByCategory() {
  return (
    <section className="h-[252px] w-[456px] rounded-lg bg-white p-6 shadow-[0px_0px_4px_rgba(124,58,237,0.25)]">
      <h2 className="text-[16px] font-semibold leading-[19px] text-[#52525B]">
        Jobs by Category
      </h2>

      <div className="mt-5 flex h-[165px] items-center gap-8">
        {/* Donut */}
        <div className="relative h-[159px] w-[155px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={53}
                outerRadius={78}
                paddingAngle={1}
                stroke="#FFFFFF"
                strokeWidth={1}
              >
                {data.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[14px] font-bold leading-[17px] text-[#27272A]">
              5,000
            </span>

            <span className="text-[10px] font-normal leading-3 text-[#71717A]">
              Total Jobs
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-1 flex-col gap-5">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <span className="text-[14px] font-medium leading-[17px] text-[#52525B]">
                  {item.name}
                </span>
              </div>

              <span className="text-[10px] font-medium leading-3 text-[#3F3F46]">
                {item.value.toLocaleString()} ({item.percentage})
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}