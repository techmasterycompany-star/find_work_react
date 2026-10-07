import { filtercontext } from "../../../context/filterstates";
import { jobcontext } from "../../../context/JobContext";
import { useContext } from "react";
import FindJobCard from "../../public/components/FindJobCard";
import NoSavedJobs from "./NoSaved";

export default function UnAppliedSaved() {
  const { jobs } = useContext(jobcontext);
  const { jobChecked, radioChecked } = useContext(filtercontext);

  const savedJobs = jobs.filter((job) => job.isSaved === true);

  let UnAppliedfilter = savedJobs.filter((f) => {
    return f.isSaved === true && f.apply == false;
  });
  

  if (UnAppliedfilter.length === 0) {
    return <NoSavedJobs />;
  }
  //main
  let unapplied = UnAppliedfilter.map((job) => {
    return {
      data: job,
      card: <FindJobCard key={job.id} job={job} />,
    };
  });

  let filter = unapplied;

  if (jobChecked.categorey.length > 0) {
    filter = filter.filter((f) => {
      return jobChecked.categorey.includes(f.data.categorey);
    });
  }

  if (jobChecked.date.length > 0) {
    filter = filter.filter((f) => {
      return jobChecked.date.includes(f.data.publication);
    });
  }

  if (jobChecked.education.length > 0) {
    filter = filter.filter((f) => {
      return jobChecked.education.includes(f.data.education);
    });
  }

  if (jobChecked.jobtype.length > 0) {
    filter = filter.filter((f) => {
      return jobChecked.jobtype.includes(f.data.type);
    });
  }

  if (radioChecked) {
    filter = filter.filter((f) => {
      return radioChecked.includes(f.data.salary);
    });
  }

  if (jobChecked.mode.length > 0) {
    filter = filter.filter((f) => {
      return jobChecked.mode.includes(f.data.location);
    });
  }

  let filtermap = filter.map((m) => {
    return m.card;
  });

  return <>{filtermap}</>;
}
