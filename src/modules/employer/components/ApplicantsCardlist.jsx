import { useContext } from "react";
import { filtercontext } from "../../../context/filterstates";
import { UserContext } from "../../../context/UsersContext";
import ApplicantsCard from "./ApplicantsCard";




export default function ApplicantsCardlist() {
  const { candidatedata } = useContext(UserContext);
  const {ApplicantsChecked} = useContext(filtercontext);

   const randomItems = [...candidatedata].sort(() => Math.random() - 0.5);

  let Applicantlistfull = randomItems.slice(0, 6).map((candidate) => {
    return {
      data: candidate,
      card: <ApplicantsCard key={candidate.id} user={candidate} />,
    };
  });

let filter = Applicantlistfull;

if (ApplicantsChecked.categorey.length > 0) {
  filter = filter.filter((f) => {
    return ApplicantsChecked.categorey.includes(f.data.categorey);
  });
}

if (ApplicantsChecked.status.length > 0) {
  filter = filter.filter((f) => {
    return ApplicantsChecked.status.includes(f.data.status);
  });
}


// if (radioChecked) {
//   filter = filter.filter((f) => {
//     return radioChecked.includes(f.data.salary);
//   });
// }


let filtermap = filter.map((m) => {
  return m.card;
});

return (
  <>
     <div className="flex-col bg-white p-5 border-1 border-border1">
       {filtermap}
     </div>
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


