import TopCandidateCard from "./TopCandidateCard";

export default function TopCandidatesList() {
  return (
    <div className="w-full h-full rounded-lg bg-white border-1 border-border1 p-4">
      {/* title */}
      <div className="flex-between mb-4">
        <h3 className="text-text-primary font-bold text-lg">Top Candidates</h3>
        <div className="w-fit flex items-center justify-end">
          <button
            type="button"
            className="underline text-primary font-semibold text-md"
          >
           View All
          </button>
        </div>
      </div>
      <TopCandidateCard/>
    </div>
  );
}
