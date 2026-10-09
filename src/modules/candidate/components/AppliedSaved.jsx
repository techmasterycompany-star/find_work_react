import { useContext, useMemo } from "react";
import { filtercontext } from "../../../context/filterstates";
import { useSavedJobs } from "../hooks/useCandidateQueries";
import { toSavedJobCard } from "../services/candidateAdapters";
import FindJobCard from "../../public/components/FindJobCard";
import NoSavedJobs from "./NoSaved";

export default function AppliedSaved() {
  const { data: rawWishlist = [], isLoading, isError, myApplications = [] } = useSavedJobs();
  const { jobChecked, radioChecked } = useContext(filtercontext);

  const adaptedJobs = useMemo(() => {
    const appliedJobIds = new Set(
      myApplications
        .map((a) => a.job?._id ?? a.job?.id ?? a.jobId)
        .filter(Boolean)
    );
    return rawWishlist
      .map((item) => toSavedJobCard(item, appliedJobIds))
      .filter((j) => j.apply === true);
  }, [rawWishlist, myApplications]);

  if (isLoading) {
    return (
      <div className="col-span-2 py-12 text-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }
  if (isError) {
    return (
      <div className="col-span-2 py-12 text-center text-sm text-red-500">
        Failed to load.
      </div>
    );
  }
  if (adaptedJobs.length === 0) return <NoSavedJobs />;

  let filter = adaptedJobs;
  if (jobChecked.categorey.length > 0) {
    filter = filter.filter((f) => jobChecked.categorey.includes(f.categorey));
  }
  if (jobChecked.date.length > 0) {
    filter = filter.filter((f) => jobChecked.date.includes(f.publication));
  }
  if (jobChecked.education.length > 0) {
    filter = filter.filter((f) => jobChecked.education.includes(f.education));
  }
  if (jobChecked.jobtype.length > 0) {
    filter = filter.filter((f) => jobChecked.jobtype.includes(f.type));
  }
  if (radioChecked) {
    filter = filter.filter((f) => radioChecked.includes(f.salary));
  }
  if (jobChecked.mode.length > 0) {
    filter = filter.filter((f) => jobChecked.mode.includes(f.location));
  }
  if (filter.length === 0) return <NoSavedJobs />;

  return <>{filter.map((job) => <FindJobCard key={job.id} job={job} />)}</>;
}
