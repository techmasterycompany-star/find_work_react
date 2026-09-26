import { useContext } from "react";
import { UserContext } from "../../../context/UsersContext";
import CandidatesCard from "./CandidatesCard";
import { filtercontext } from "../../../context/filterstates";

export default function TopRated() {
  const { candidatedata } = useContext(UserContext);
  const { inputskillvalue, inputjobvalue,checked } = useContext(filtercontext);

  const highestReviews = Math.max(
    ...candidatedata.map((rate) => {
      return rate.reviews;
    }),
  );

  const highestRates = Math.max(
    ...candidatedata.map((rate) => {
      return rate.ratings;
    }),
  );

  console.log(highestRates);

  // console.log(highestReviews);

  const filteredRates = candidatedata.filter((r) => {
    return r.ratings === highestRates && r.reviews === highestReviews;
  });
  // console.log(filteredRates);

  let filter = filteredRates;

  if (inputskillvalue.skill) {
    filter = filter.filter((f) => {
      return f.skills.some((skill) => {
        return (
          skill.skillname.toLowerCase() == inputskillvalue.skill.toLowerCase()
        );
      });
    });
  }

  if (inputskillvalue.location) {
    filter = filter.filter((f) => {
      return f.location.toLowerCase() == inputskillvalue.location.toLowerCase();
    });
  }

  if (inputjobvalue) {
    filter = filter.filter((f) => {
      return f.job.toLowerCase() == inputjobvalue.toLowerCase();
    });
  }

  if(checked.available.checked == true && checked.available.value){
  filter = filter.filter((f)=>{
     return f.available == checked.available.value
  })
}

if(checked.exp.checked == true && checked.exp.value){
  filter=filter.filter((f)=>{
    if(checked.exp.value === "0-1 years"){
      return f.exp == "0-1 years"

    }else if(checked.exp.value === "1-3 years"){
      return f.exp == "1-3 years"

    }else if(checked.exp.value === "3-5 years"){
      return f.exp == "3-5 years"

    }else if(checked.exp.value === "5+ years"){
      return f.exp == "5+ years"
      
    }else{
      return f.exp 
    }
  })
}

  let filtermap = filter.map((m) => {
    return <CandidatesCard key={m.id} candidate={m} />;
  });

  return <>{filtermap}</>;
}
