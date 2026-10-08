import { HiArrowRight } from "react-icons/hi2";
import Jobs from "./ActiveJobs";
import { useEmployerJobs } from "../hooks/useEmployerQueries";


export default function JobPosting() {
  const { data: jobs = [] } = useEmployerJobs();
  const openCount = jobs.filter((j) => {
    const s = String(j.status ?? '').toLowerCase();
    return s !== 'closed' && s !== 'expired';
  }).length;

  return (
    <>
      <section className="px-20 py-20 bg-surface">
        <div className="flex-between mb-8">
          <div className="contenttitle">
            <h3 className="text-3xl font-bold text-text-primary mb-2">
              Active Job Postings
            </h3>
            <p className="text-lg font-normal text-text-secondary">
              Manage your currently listed remote and contract job listings
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <button className="text-sm font-bold text-primary">
              View all Open Postings ({openCount})
            </button>
            <HiArrowRight className="text-primary" />
          </div>
        </div>
        <div className="cards grid  grid-cols-3  gap-6">
          <Jobs />
        </div>
      </section>
    </>
  );
}
