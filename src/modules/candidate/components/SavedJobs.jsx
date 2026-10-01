import BreadCrump from "../../../components/BreadCrump";
import HeaderSec from "../../../components/HeaderSec";
import saved from "../../../assets/saved.png";
import InputTwo from "../../employer/components/input2";
import JobsFilter from "../../public/components/JobsFilter";
import JobsCardlist from "../../public/components/JobsCardlist";
import Pagination from "../../public/components/Pagination";
import JobsMenu from "./JobsMenu";

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
      <section className="px-20 pt-12 pb-25 w-full">
        <div className="flex items-start gap-5">
           <JobsFilter />
            <div className="w-full h-fit grid grid-cols-2 gap-5">
              {<JobsCardlist />}
            </div>
        </div>
      </section>
    </main>
  );
}
