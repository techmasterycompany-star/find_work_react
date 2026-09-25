import { UserContext } from "../../../context/UsersContext";
import { useContext } from "react";
import CandidatesCard from "./CandidatesCard";
import { filtercontext } from "../../../context/filterstates";

export default function CandidateCardList() {
  const { candidatedata } = useContext(UserContext);
  const { inputskillvalue, inputjobvalue,checked } = useContext(filtercontext);

  let candidatelistfull = candidatedata.map((candidates) => {
    return {
      data: candidates,
      card: <CandidatesCard key={candidates.id} candidate={candidates} />,
    };
  });

let filter = candidatelistfull;

if (inputskillvalue.skill) {
  filter = filter.filter((f) => {
    return f.data.skills.some((skill) => {
      return skill.skillname.toLowerCase() == inputskillvalue.skill.toLowerCase();
    });
  });
}

if (inputskillvalue.location) {
  filter = filter.filter((f) => {
    return (
      f.data.location.toLowerCase() ==
      inputskillvalue.location.toLowerCase()
    );
  });
}

if (inputjobvalue) {
  filter = filter.filter((f) => {
    return (
      f.data.job.toLowerCase() ==
      inputjobvalue.toLowerCase()
    );
  });
}

if(checked.available.checked == true && checked.available.value){
  filter = filter.filter((f)=>{
     return f.data.available == checked.available.value
  })
}

if(checked.exp.checked == true && checked.exp.value){
  filter=filter.filter((f)=>{
    if(checked.exp.value === "0-1 years"){
      return f.data.exp == "0-1 years"

    }else if(checked.exp.value === "1-3 years"){
      return f.data.exp == "1-3 years"

    }else if(checked.exp.value === "3-5 years"){
      return f.data.exp == "3-5 years"

    }else if(checked.exp.value === "5+ years"){
      return f.data.exp == "5+ years"
      
    }else{
      return f.data.exp 
    }
  })
}

let filtermap = filter.map((m) => {
  return m.card;
});

return (
  <>
    {filtermap}
  </>
);

}
