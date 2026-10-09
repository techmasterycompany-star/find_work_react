// CompaniesCardlist — rewired to derive companies from /api/jobs.
// No backend companies endpoint exists; we group jobs by employer client-side.

import { useContext } from "react";
import { filtercontext } from "../../../context/filterstates";
import { useCompanies } from "../../public/hooks/usePublicQueries";
import CompanyCard from "./CompaniesCard";

export default function CompanyCardList() {
  const { data: companyData = [], isLoading, isError } = useCompanies();
  const { companyChecked, radioChecked } = useContext(filtercontext);

  if (isLoading) {
    return (
      <div className="col-span-2 py-12 text-center text-sm text-gray-500">
        Loading companies…
      </div>
    );
  }
  if (isError) {
    return (
      <div className="col-span-2 py-12 text-center text-sm text-red-500">
        Failed to load companies.
      </div>
    );
  }
  if (companyData.length === 0) {
    return (
      <div className="col-span-2 py-12 text-center text-sm text-gray-500">
        No companies available right now.
      </div>
    );
  }

  const companylistfull = companyData.map((company) => ({
    data: company,
    card: <CompanyCard key={company.id} company={company} />,
  }));

  let filter = companylistfull;

  if (companyChecked.categorey.length > 0) {
    filter = filter.filter((f) => companyChecked.categorey.includes(f.data.categorey));
  }
  if (companyChecked.size.length > 0) {
    filter = filter.filter((f) => companyChecked.size.includes(f.data.size));
  }
  if (radioChecked) {
    filter = filter.filter((f) => radioChecked.includes(f.data.salary));
  }

  if (filter.length === 0) {
    return (
      <div className="col-span-2 py-12 text-center text-sm text-gray-500">
        No companies match your filters.
      </div>
    );
  }

  return <>{filter.map((m) => m.card)}</>;
}
