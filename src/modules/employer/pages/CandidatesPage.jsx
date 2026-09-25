import HeaderSec from "../../../components/HeaderSec";
import candiphoto from "../../../assets/candiphoto.png"
import InputTwo from "../components/input2";
import CandidatesMenu from "../components/CandidatesMenu";



export default function CandidatesPage() {
  return (
    <>
      <div className="min-h-screen overflow-x-hidden bg-linear-to-b from-#EDE9FE to-bg-surface">
        <HeaderSec
          title="Discover Top Candidates"
          description="Browse talented Candidates and find the right match for your job openings."
          titlestart={0}
          titleend={13}
          spanstart={13}
          spanend={25}
          img={candiphoto}
        >
        <InputTwo btntext="Find Cnadidates" firstplaceholder="Search Candidates"/>    
        </HeaderSec>
        <CandidatesMenu />
      </div>
    </>
  );
}
