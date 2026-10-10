import ApplicationsChart from "./ApplicationChart";

export default function ApplicationsTimeCard() {
  return (
    <div className="w-full h-full rounded-lg bg-white border-1 border-border1 p-4">
        {/* button */}
      <div className="w-full flex items-center justify-end">
        <button
          type="button"
          className="flex h-8 items-center gap-1 rounded-lg border border-[#C1C5CD] bg-white px-2 font-['Inter'] text-sm text-[#52525B]"
        >
          last 30 days
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
      {/* title */}
      <div className="flex-between mb-4">
        <div className="title">
          <span className="text-text-secondary font-normal text-sm">
            Applications Trend
          </span>
          <h3 className="text-text-primary font-bold text-lg">
            Applications Over Time
          </h3>
        </div>
        <div className="flex-gap8">
          <div className="icon w-6 h-6 flex-center bg-status-green-fill rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
            >
              <path
                d="M6.5517 2.93891L6.25981 3.2308C4.69788 4.79273 3.13581 6.35481 1.57358 7.91704C1.25755 8.23307 0.884143 8.30228 0.511194 8.1297C0.151905 7.96075 -0.0452709 7.65156 0.00709686 7.2777C0.0541466 7.00758 0.181586 6.75794 0.37276 6.5614C1.88323 5.0236 3.41328 3.50539 4.93741 1.98126L5.22612 1.69256C5.13296 1.67663 5.03902 1.66569 4.9447 1.65977C4.33359 1.65704 3.72202 1.66296 3.11137 1.65522C2.62776 1.64975 2.29397 1.31688 2.2876 0.854218C2.28122 0.349666 2.58405 0.011324 3.08997 0.00813626C4.49555 -0.000971361 5.90037 -0.0020338 7.30443 0.00494808C7.87228 0.00813573 8.19195 0.315058 8.20243 0.876531C8.22823 2.27027 8.24356 3.66417 8.24842 5.05821C8.25024 5.56914 7.91782 5.86969 7.41008 5.86559C6.93103 5.86103 6.61591 5.5532 6.60134 5.05685C6.58586 4.4676 6.58449 3.87789 6.57584 3.28818C6.57402 3.19529 6.56218 3.10421 6.5517 2.93891Z"
                fill="#22C55E"
              />
            </svg>
          </div>
          <span className="font-medium text-md text-status-green-dark">
            12.75%
          </span>
        </div>
      </div>
      <div className="border-b-1 border-border1 px-20 w-full"></div>
      {/* body */}
      <ApplicationsChart/>
    </div>
  );
}
