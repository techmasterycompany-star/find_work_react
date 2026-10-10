import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { date: "Week 1", applications: 12 },
    { date: "Week 2", applications: 18 },
    { date: "Week 3", applications: 15 },
    { date: "Week 4", applications: 24 },
];

export default function ApplicationsChart() {
    return (
        <div className="w-full rounded-xl mt-4">
            <div className="relative">
                <div className="selected bg-white shadow-[0_8px_8px_rgba(13,10,44,0.12)] w-16 h-16 rounded-2sm flex-center relative left-[180px] top-[40px] z-100">
                    {data[1].applications}
                    <div className="w-0 h-0  border-l-[14px] border-r-[14px] border-t-[18px] border-l-transparent border-r-transparent border-t-white  absolute left-0 bottom-[-20%] translate-x-[70%] z-100"></div>
                </div>
            </div>

            <div className="h-[300px] ">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 20,
                            left: 15,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />

                        <XAxis
                            dataKey="date"
                            axisLine={true}
                            tickLine={false}
                            interval={0}
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="applications"
                            stroke="#7C3AED"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
