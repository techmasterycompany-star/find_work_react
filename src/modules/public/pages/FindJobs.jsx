import BreadCrump from "../../../components/BreadCrump";
import HeaderSec from "../../../components/HeaderSec";
import candiphoto from "../../../assets/candiphoto.png";
import Input from "../../employer/components/input";
import JobsFilter from "../components/JobsFilter";
import JobsCardlist from "../components/JobsCardlist";
import Pagination from "../components/Pagination";
import { useState } from "react";

export default function FindJobs() {
  const [page, setPage] = useState(2);
  return (
    <main className="min-h-screen w-full">
      <HeaderSec
        BreadCrump={<BreadCrump firstlink="Find Jobs" />}
        title="Find Your Next Opportunity"
        description="Explore thousands of jobs and find the perfect match for your skills and career goals."
        titlestart={0}
        titleend={10}
        spanstart={10}
        spanend={27}
        img={candiphoto}
      >
        <Input
          firstplaceholder={"Job title, keywords or Company"}
          secondplaceholder={"location or “remote”"}
          btntext={"Find Jobs"}
        />
      </HeaderSec>
      <section className="px-20 pt-12 pb-25 w-full">
        <div className="flex items-start gap-5">
          <JobsFilter />
          <div>
            <div className="w-full h-fit grid grid-cols-2 gap-5">
              {<JobsCardlist />}
            </div>
            <div className="mt-10 flex justify-center items-center m-auto w-ful">
              <Pagination
                current={page}
                total={10}
                onChange={setPage}
                showArrows
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
