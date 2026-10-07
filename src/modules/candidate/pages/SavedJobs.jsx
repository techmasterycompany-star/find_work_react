import BreadCrump from "../../../components/BreadCrump";
import HeaderSec from "../../../components/HeaderSec";
import saved from "../../../assets/saved.png";
import InputTwo from "../../employer/components/input2";
import JobsMenu from "../components/JobsMenu";

export default function SavedJobs() {
  return (
    <main className="min-h-screen w-full">
      <HeaderSec
        BreadCrump={<BreadCrump firstlink="Saved Jobs" />}
        title="Saved Jobs"
        description="Keep track of jobs you're interested in and apply when you're ready."
        titlestart={0}
        titleend={6}
        spanstart={6}
        spanend={15}
        img={saved}
      >
        <InputTwo
          firstplaceholder={"Search Saved Jobs..."}
          btntext={"Find Jobs"}
        />
      </HeaderSec>
      <JobsMenu/>
    </main>
  );
}