import { useContext } from "react";
import { filtercontext } from "../../../context/filterstates";
import CompanyCard from "./CompaniesCard";
import {CompanyContext} from "../../../context/CompanyContext"



export default function CompanyCardList() {
  const {companyData} = useContext(CompanyContext);
  const { companyChecked, setcompanyChecked, radioChecked, setradioChecked } = useContext(filtercontext);

  let companylistfull = companyData.map((company) => {
    return {
      data: company,
      card: <CompanyCard key={company.id} company={company} />,
    };
  });

let filter = companylistfull;

if (companyChecked.categorey.length > 0) {
  filter = filter.filter((f) => {
    return companyChecked.categorey.includes(f.data.categorey);
  });
}
if (companyChecked.size.length > 0) {
  filter = filter.filter((f) => {
    return companyChecked.size.includes(f.data.size);
  });
}

if (radioChecked) {
  filter = filter.filter((f) => {
    return radioChecked.includes(f.data.salary);
  });
}



let filtermap = filter.map((m) => {
  return m.card;
});

return (
  <>
    {filtermap}
  </>
)
}

// if (inputskillvalue.location) {
//   filter = filter.filter((f) => {
//     return (
//       f.data.location.toLowerCase() ==
//       inputskillvalue.location.toLowerCase()
//     );
//   });
// }

// if (inputjobvalue) {
//   filter = filter.filter((f) => {
//     return (
//       f.data.job.toLowerCase() ==
//       inputjobvalue.toLowerCase()
//     );
//   });
// }

// if(checked.available.checked == true && checked.available.value){
//   filter = filter.filter((f)=>{
//      return f.data.available == checked.available.value
//   })
// }

// if(checked.exp.checked == true && checked.exp.value){
//   filter=filter.filter((f)=>{
//     if(checked.exp.value === "0-1 years"){
//       return f.data.exp == "0-1 years"

//     }else if(checked.exp.value === "1-3 years"){
//       return f.data.exp == "1-3 years"

//     }else if(checked.exp.value === "3-5 years"){
//       return f.data.exp == "3-5 years"

//     }else if(checked.exp.value === "5+ years"){
//       return f.data.exp == "5+ years"
      
//     }else{
//       return f.data.exp 
//     }
//   })
// }



