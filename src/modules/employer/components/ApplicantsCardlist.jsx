// ApplicantsCardlist — renders a list of ApplicantsCard items.
// Created during PR #18 integration (original was deleted by PR but still imported).
// Currently uses mock data from UsersContext. To wire to real API, replace
// useContext with: useJobApplications(jobId) from useEmployerQueries.js

import { useContext } from "react";
import { UserContext } from "../../../context/UsersContext";
import ApplicantsCard from "./ApplicantsCard";

export default function ApplicantsCardlist() {
  const { candidatedata = [] } = useContext(UserContext);

  if (!candidatedata || candidatedata.length === 0) {
    return (
      <div className="flex-1 py-12 text-center text-sm text-gray-500">
        No applicants yet.
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
      {candidatedata.map((applicant) => (
        <ApplicantsCard key={applicant.id} applicant={applicant} />
      ))}
    </div>
  );
}
