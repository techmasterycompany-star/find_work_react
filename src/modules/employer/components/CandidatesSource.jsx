import CandidateSourceIndicator from "./CandidateSourceIndicator";

export default function CandidatesSource(){
    return(
         <div className="w-full h-full rounded-lg bg-white border-1 border-border1 p-4">
              <h3 className="text-text-primary font-bold text-lg mb-3">Candidate Sources</h3>
              <CandidateSourceIndicator title={"Job Search"} percentage={42} left={240}/>
              <CandidateSourceIndicator title={"Recommended Jobs"} percentage={56} left={320}/>
              <CandidateSourceIndicator title={"Company Profile"} percentage={34} left={190}/>
              <CandidateSourceIndicator title={"Shared Job Link"} percentage={92} left={560}/>
         </div>
    );
}