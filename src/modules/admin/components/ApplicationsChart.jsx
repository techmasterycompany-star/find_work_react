import { applicationChartData } from "../services/analyticsData";

const WIDTH = 600;
const HEIGHT = 210;

const PLOT_LEFT = 44;
const PLOT_RIGHT = 10;
const PLOT_TOP = 10;
const PLOT_BOTTOM = 24;

const MAX_VALUE = 1000;

function getPoints(values) {
  const plotWidth = WIDTH - PLOT_LEFT - PLOT_RIGHT;

  const plotHeight = HEIGHT - PLOT_TOP - PLOT_BOTTOM;

  return values.map((value, index) => {
    const x = PLOT_LEFT + (index / (values.length - 1)) * plotWidth;

    const y = PLOT_TOP + plotHeight - (value / MAX_VALUE) * plotHeight;

    return {
      x,
      y,
    };
  });
}

function pointsToString(points) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

function areaPoints(values) {
  const points = getPoints(values);

  const first = points[0];
  const last = points[points.length - 1];

  return [
    `${first.x},${HEIGHT - PLOT_BOTTOM}`,
    ...points.map((point) => `${point.x},${point.y}`),
    `${last.x},${HEIGHT - PLOT_BOTTOM}`,
  ].join(" ");
}

const series = [
  {
    key: "applications",
    label: "Applications",
    line: "#7086FD",
    fill: "#7086FD",
  },
  {
    key: "accepted",
    label: "Accepted",
    line: "#72DCA6",
    fill: "#72DCA6",
  },
  {
    key: "pending",
    label: "Pending",
    line: "#F6B86A",
    fill: "#F6B86A",
  },
  {
    key: "rejected",
    label: "Rejected",
    line: "#EF4444",
    fill: "#EF4444",
  },
];

function LegendDot({ color }) {
  return (
    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
  );
}

export default function ApplicationsChart() {
  return (
    <section className="h-[404px] min-w-0 rounded-lg bg-white p-6 shadow-[0_0_4px_rgba(124,58,237,0.25)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-['Inter'] text-base font-semibold leading-[19px] text-[#52525B]">
          Applications Over Time
        </h2>

        <button
          type="button"
          className="flex h-8 items-center gap-1 rounded-lg border border-[#C1C5CD] bg-white px-2 font-['Inter'] text-sm text-[#52525B]"
        >
          Daily
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 9L12 14L17 9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4">
        {series.map((item) => (
          <div
            key={item.key}
            className="flex items-center gap-1.5 font-['Inter'] text-[11px] text-[#71717A]"
          >
            <LegendDot color={item.line} />
            {item.label}
          </div>
        ))}
      </div>

      {/* Chart tabs */}
      <div className="mt-2 flex items-center gap-2.5">
        <span className="border-b-2 border-[#7C3AED] pb-1 font-['Inter'] text-xs font-semibold text-black">
          Line
        </span>

        <div className="h-px flex-1 bg-black/20" />

        <span className="font-['Inter'] text-[8px] text-[#A1A1AA]">MORE</span>
      </div>

      {/* Chart */}
      <div className="mt-1 h-[245px] w-full">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-[210px] w-full"
          preserveAspectRatio="none"
        >
          {/* Horizontal grid */}
          {[0, 200, 400, 600, 800, 1000].map((value) => {
            const plotHeight = HEIGHT - PLOT_TOP - PLOT_BOTTOM;

            const y = PLOT_TOP + plotHeight - (value / MAX_VALUE) * plotHeight;

            return (
              <g key={value}>
                <line
                  x1={PLOT_LEFT}
                  x2={WIDTH - PLOT_RIGHT}
                  y1={y}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />

                <text
                  x="3"
                  y={y + 4}
                  fill="#71717A"
                  fontSize="9"
                  fontFamily="Inter, sans-serif"
                >
                  {value === 1000 ? "1K" : value}
                </text>
              </g>
            );
          })}

          {/* Vertical grid */}
          {applicationChartData.labels.map((_, index) => {
            const plotWidth = WIDTH - PLOT_LEFT - PLOT_RIGHT;

            const x =
              PLOT_LEFT +
              (index / (applicationChartData.labels.length - 1)) * plotWidth;

            return (
              <line
                key={index}
                x1={x}
                x2={x}
                y1={PLOT_TOP}
                y2={HEIGHT - PLOT_BOTTOM}
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
            );
          })}

          {/* Areas */}
          {series.map((item) => (
            <polygon
              key={`${item.key}-area`}
              points={areaPoints(applicationChartData[item.key])}
              fill={item.fill}
              fillOpacity="0.07"
            />
          ))}

          {/* Lines */}
          {series.map((item) => {
            const points = getPoints(applicationChartData[item.key]);

            return (
              <polyline
                key={item.key}
                points={pointsToString(points)}
                fill="none"
                stroke={item.line}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}

          {/* Points */}
          {series.map((item) => {
            const points = getPoints(applicationChartData[item.key]);

            return points.map((point, index) => (
              <g key={`${item.key}-${index}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="7"
                  fill={item.line}
                  opacity="0.15"
                />

                <circle
                  cx={point.x}
                  cy={point.y}
                  r="3.5"
                  fill={item.line}
                  stroke="white"
                  strokeWidth="1"
                />
              </g>
            ));
          })}
        </svg>

        {/* X axis labels */}
        <div className="grid grid-cols-7 pl-[44px] pr-[10px]">
          {applicationChartData.labels.map((label) => (
            <span
              key={label}
              className="text-center font-['Inter'] text-[9px] text-black/70"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
