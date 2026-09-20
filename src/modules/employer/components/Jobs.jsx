import { HiUserGroup } from "react-icons/hi";
import { HiChartBar } from "react-icons/hi";
import { HiCog6Tooth } from "react-icons/hi2";
import { useContext } from "react";
import { jobcontext } from "../../../context/JobContext";

export default function Jobs(){
 const {jobdata} = useContext(jobcontext);

 let joblist = jobdata.map((job) => {
  return (
    <div
      className="card p-6 bg-card-2 rounded-2sm border-1 border-border1"
      key={job.id}
    >
      <div className="flex-between mb-4">
        <span className="text-[12px] font-medium text-text-placholder">
          {job.date}
        </span>
        <div
          className={
            job.status === "Active"
              ? "activetag"
              : job.status === "Closed"
                ? "closedtag"
                : "warningtag"
          }
        >
          {job.status}
        </div>
      </div>
      <div className="cont">
        <h4 className="font-bold text-xl text-text-primary mb-3">
          {job.title}
        </h4>
        <div className="details flex-between pb-4  border-b-border1 border-b-1 mb-4">
          <div className="icon flex items-center gap-[2px]">
            <HiUserGroup className="text-primary" />
            <span className="text-sm font-normal text-text-secondary">
              {job.applications}
            </span>
          </div>
          <div className="icon flex items-center gap-[2px] mb-4">
            <HiChartBar className="text-primary" />
            <span className="text-sm font-normal text-text-secondary">
              {job.views}
            </span>
          </div>
        </div>
        <div className="actions flex gap-3 w-full">
          <button
            className="flex items-center justify-center w-full h-10 py-2 px-4  bg-primary text-white
            font-bold border-0 rounded-2sm cursor-pointer text-md"
          >
            View Applications
          </button>
          <button className="w-10 h-10 border-primary border-1 rounded-2sm p-2 flex-center">
            <HiCog6Tooth className="text-2xl text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
});

return(
    <>
    {joblist}
    </>
);
}