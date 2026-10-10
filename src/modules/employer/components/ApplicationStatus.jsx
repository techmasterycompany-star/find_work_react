import DonutChart from "./DonutChart";

export default function ApplicationStatus(){
    return(
           <div className="w-full h-full rounded-lg bg-white border-1 border-border1 p-4">
      {/* title */}
      <div className="flex-between mb-4">
        <h3 className="text-text-primary font-bold text-lg">Application Status</h3>
        <div className="w-fit flex items-center justify-end">
          <button
            type="button"
            className="flex h-8 items-center gap-1 rounded-lg border border-[#C1C5CD] bg-white px-2 font-['Inter'] text-sm text-[#52525B]"
          >
            Today
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
      </div>
       <div className="border-b-1 border-border1 px-20 w-full"></div>
       <DonutChart/>
    </div>
    );
}