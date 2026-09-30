import { HiOutlineChevronDown } from "react-icons/hi2";

const labels = [
  "Aug 1",
  "Aug 6",
  "Aug 11",
  "Aug 16",
  "Aug 21",
  "Aug 26",
  "Aug 31",
];

const candidates = [36, 11, 57, 10, 30, 91, 15];
const employers = [64, 13, 62, 11, 45, 67, 19];

const chartWidth = 555;
const chartHeight = 183;

function getPoints(values) {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * chartWidth;
      const y = (value / 100) * chartHeight;

      return `${x},${y}`;
    })
    .join(" ");
}

export default function UserGrowth() {
  const candidatePoints = getPoints(candidates);
  const employerPoints = getPoints(employers);

  const candidateArea = `0,${chartHeight} ${candidatePoints} ${chartWidth},${chartHeight}`;

  return (
    <section className="h-[400px] w-[648px] rounded-lg bg-white p-6 shadow-[0px_0px_4px_rgba(124,58,237,0.24)]">
      {/* Header */}
      <div className="flex h-8 items-center justify-between">
        <h2 className="text-[16px] font-semibold leading-[19px] text-[#52525B]">
          User Growth
        </h2>

        <button
          type="button"
          className="flex h-8 w-[112px] items-center justify-center gap-2 rounded-lg border border-[#C1C5CD] bg-white"
        >
          <span className="text-[16px] font-normal leading-[19px] text-[#52525B]">
            Monthly
          </span>

          <HiOutlineChevronDown className="h-5 w-5 text-[#4A4F5A]" />
        </button>
      </div>

      {/* Legends */}
      <div className="mt-3 flex h-6 items-center justify-center gap-2">
        <div className="flex items-center gap-1">
          <span className="relative block h-4 w-4">
            <span className="absolute left-0 top-[7px] h-[2px] w-4 bg-[#7086FD]" />
            <span className="absolute left-[4px] top-[4px] h-2 w-2 rounded-full border border-white bg-[#7086FD]" />
          </span>

          <span className="text-[12px] text-black/70">Candidates</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="relative block h-4 w-4">
            <span className="absolute left-0 top-[7px] h-[2px] w-4 bg-[#6FD195]" />
            <span className="absolute left-[4px] top-[4px] h-2 w-2 rounded-full border border-white bg-[#6FD195]" />
          </span>

          <span className="text-[12px] text-black/70">Employers</span>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-2 flex h-[252px]">
        {/* Y axis */}
        <div className="flex h-[183px] w-7 flex-col justify-between pr-1 text-right">
          {["10K", "8K", "6K", "4K", "2K", "0"].map((item) => (
            <span
              key={item}
              className="text-[12px] leading-[15px] text-black/70"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Graph */}
        <div className="flex-1">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="h-[183px] w-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Grid */}
            {[0, 20, 40, 60, 80, 100].map((value) => {
              const y = (value / 100) * chartHeight;

              return (
                <line
                  key={value}
                  x1="0"
                  x2={chartWidth}
                  y1={y}
                  y2={y}
                  stroke="rgba(0,0,0,0.12)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Candidate area */}
            <polygon
              points={candidateArea}
              fill="url(#candidateArea)"
            />

            <defs>
              <linearGradient
                id="candidateArea"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#7C3AED"
                  stopOpacity="0.30"
                />
                <stop
                  offset="100%"
                  stopColor="#9747FF"
                  stopOpacity="0.05"
                />
              </linearGradient>
            </defs>

            {/* Candidates */}
            <polyline
              points={candidatePoints}
              fill="none"
              stroke="#7086FD"
              strokeWidth="2"
            />

            {/* Employers */}
            <polyline
              points={employerPoints}
              fill="none"
              stroke="#6FD195"
              strokeWidth="2"
            />

            {/* Candidate nodes */}
            {candidates.map((value, index) => {
              const x = (index / (candidates.length - 1)) * chartWidth;
              const y = (value / 100) * chartHeight;

              return (
                <circle
                  key={`candidate-${index}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#7086FD"
                  stroke="white"
                  strokeWidth="1"
                />
              );
            })}

            {/* Employer nodes */}
            {employers.map((value, index) => {
              const x = (index / (employers.length - 1)) * chartWidth;
              const y = (value / 100) * chartHeight;

              return (
                <circle
                  key={`employer-${index}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#6FD195"
                  stroke="white"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {/* X axis */}
          <div className="flex justify-between pt-2">
            {labels.map((label) => (
              <span
                key={label}
                className="text-center text-[12px] leading-[15px] text-black/70"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}