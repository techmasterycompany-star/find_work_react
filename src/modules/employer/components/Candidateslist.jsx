import ButtonFull from "./Buttonfull";
import { UserContext } from "../../../context/UsersContext";
import { useContext } from "react";

export default function CandidateList(){
    const {candidatedata} = useContext(UserContext);
    let candidatelist = candidatedata.map((candidates) => {
      return (
        <div className="card bg-card-2 p-5 rounded-md" key={candidates.id}>
          <div className="info flex gap-3 mb-4">
            <div className="img h-14 w-14 rounded-full border-1 border-border1">
              <img className="rounded-full" src={candidates.img} alt="" />
            </div>
            <div className="txt mb-1">
              <h4 className="text-md font-bold text-text-primary">{candidates.name}</h4>
              <span className="text-[12px] font-normal text-text-secondary">{candidates.job}</span>
            </div>
          </div>
          <div>
            <div className="tag flex-between mb-4">
              <div className="badge">
                {candidates.match}
              </div>
              <span className="text-sm font-semibold text-text-primary">{candidates.price}</span>
            </div>
          </div>
          <div className="skills mb-4 flex-gap6 pb-4 border-b-1 border-b-border1">
            <div className="badge">{candidates.skills[0].skillname}</div>
            <div className="badge">{candidates.skills[1].skillname}</div>
            <div className="badge">{candidates.skills[2].skillname}</div>
          </div>
          <div className="actions">
            <ButtonFull>Invite to apply</ButtonFull>
            <button className="mt-3 w-full text-[12px] text-text-secondary font-medium border-1 border-border1 h-10 px-3 py-2 rounded-md">View Profile</button>
          </div>
        </div>
      );
    });
        
    return(
     <>
       {candidatelist}
     </>      
    );
}