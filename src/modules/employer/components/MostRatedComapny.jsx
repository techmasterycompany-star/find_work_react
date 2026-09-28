import { useContext } from "react";
import { filtercontext } from "../../../context/filterstates";
import { CompanyContext } from "../../../context/CompanyContext";
import CompanyCard from "./CompaniesCard";

export default function MostMostRatedComapny() {
  const {companyData} = useContext(CompanyContext);
  const { companyChecked,radioChecked } = useContext(filtercontext);

  const highestReviews = Math.max(
    ...companyData.map((rate) => {
      return rate.reviews;
    }),
  );

  const highestRates = Math.max(
    ...companyData.map((rate) => {
      return rate.ratings;
    }),
  );

  console.log(highestRates);

  // console.log(highestReviews);

  const filteredRates = companyData.filter((r) => {
    return r.ratings === highestRates && r.reviews === highestReviews;
  });
  // console.log(filteredRates);

  let filter = filteredRates;

if (companyChecked.categorey.length > 0) {
  filter = filter.filter((f) => {
    return companyChecked.categorey.includes(f.categorey);
  });
}

if (companyChecked.size.length > 0) {
  filter = filter.filter((f) => {
    return companyChecked.size.includes(f.size);
  });
}

if (radioChecked) {
  filter = filter.filter((f) => {
    return radioChecked.includes(f.salary);
  });
}


  let filtermap = filter.map((m) => {
    return <CompanyCard key={m.id} company={m} />;
  });

  return (
    <>
      {filtermap}
    </>
  );

}
