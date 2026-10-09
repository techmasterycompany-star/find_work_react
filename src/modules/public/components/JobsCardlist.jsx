import { useContext } from "react";
import { filtercontext } from "../../../context/filterstates";
import { usePublicJobs } from "../../public/hooks/usePublicQueries";
import { useSaveJob } from "../../candidate/hooks/useCandidateQueries";
import FindJobCard from "./FindJobCard";

export default function JobsCardlist() {
  const { data: jobdata = [], isLoading, isError } = usePublicJobs();
  const { jobChecked, radioChecked } = useContext(filtercontext);
  const saveJob = useSaveJob();

  const handleSave = (jobId) => {
    saveJob.mutate(jobId);
  };

  if (isLoading) {
    return (
      <div className="col-span-2 py-12 text-center text-sm text-gray-500">
        Loading jobs…
      </div>
    );
  }
  if (isError) {
    return (
      <div className="col-span-2 py-12 text-center text-sm text-red-500">
        Failed to load jobs. Please try again later.
      </div>
    );
  }
  if (jobdata.length === 0) {
    return (
      <div className="col-span-2 py-12 text-center text-sm text-gray-500">
        No jobs available right now.
      </div>
    );
  }

  const joblistfull = jobdata.map((job) => ({
    data: job,
    card: <FindJobCard key={job.id} job={job} onSave={handleSave} />,
  }));

  let filter = joblistfull;

  if (jobChecked.categorey.length > 0) {
    filter = filter.filter((f) => jobChecked.categorey.includes(f.data.categorey));
  }
  if (jobChecked.date.length > 0) {
    filter = filter.filter((f) => jobChecked.date.includes(f.data.publication));
  }
  if (jobChecked.education.length > 0) {
    filter = filter.filter((f) => jobChecked.education.includes(f.data.education));
  }
  if (jobChecked.jobtype.length > 0) {
    filter = filter.filter((f) => jobChecked.jobtype.includes(f.data.type));
  }
  if (radioChecked) {
    filter = filter.filter((f) => radioChecked.includes(f.data.salary));
  }
  if (jobChecked.mode.length > 0) {
    filter = filter.filter((f) => jobChecked.mode.includes(f.data.location));
  }

  if (filter.length === 0) {
    return (
      <div className="col-span-2 py-12 text-center text-sm text-gray-500">
        No jobs match your filters.
      </div>
    );
  }

  return <>{filter.map((m) => m.card)}</>;
}
