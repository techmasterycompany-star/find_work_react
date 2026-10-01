import { useContext } from "react";
import { filtercontext } from "../../../context/filterstates";
import JobCard from "../../employer/components/JobCard";
import { jobcontext } from "../../../context/JobContext";
import FindJobCard from "./FindJobCard";



export default function JobsCardlist() {
  const { jobdata } = useContext(jobcontext);
  const { jobChecked, radioChecked } = useContext(filtercontext);

  let joblistfull = jobdata.map((job) => {
    return {
      data: job,
      card: <FindJobCard key={job.id} job={job} />,
    };
  });

let filter = joblistfull;

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



