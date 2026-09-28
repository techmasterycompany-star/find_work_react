import { useContext } from "react";
import { filtercontext } from "../../../context/filterstates";
import { CompanyContext } from "../../../context/CompanyContext";
import CompanyCard from "./CompaniesCard";

export default function MostViewedComapny() {
  const {companyData} = useContext(CompanyContext);
  const { companyChecked,radioChecked } = useContext(filtercontext);


  let highviews = Math.max(
    ...companyData.map((com) => {
      return com.views;
    }),
  );
  // console.log(highsuccess);

  let filteredhighsuccess = companyData.filter((f) => {
    return f.views === highviews;
  });


  // console.log(filteredhighsuccess);
  let filter = filteredhighsuccess;

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
