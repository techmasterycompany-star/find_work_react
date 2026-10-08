import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
const applicationStatus = [
  { name: "New", value: 24 },
  { name: "Hired", value: 11 },
  { name: "Rejected", value: 39 },
  { name: "Under Review", value: 26 },
];

const COLORS = ["#19B39D", "#48CECE", "#EF4444", "#F59E0B"];
export default function DonutChart() {
  return (
    <div className="flex-between">
      <div className="w-full rounded-xl bg-white p-5">
        <div className="h-[300px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={applicationStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={105}
                paddingAngle={3}
              >
                {applicationStatus.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-xs text-gray-500">Applications Per Status</p>
            </div>
          </div>
        </div>
      </div>

      <div className="info w-full">
        <div>
          <div>
            {applicationStatus.map((application,index) => {
              return (
                <div className="flex-between w-full mb-6">
                  <div className="flex-gap8">
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index] }}
                      />
                
                    <span>{application.name}</span>
                  </div>

                  <div className="value">{application.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
