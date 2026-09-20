import { UserContext } from "../../../context/UsersContext";
import { useContext } from "react";

export default function Talents() {
  const {candidatedata} = useContext(UserContext);
    let talentlist = candidatedata.slice(0,2).map((person) => {
        return (
            <div className="spotlightCard rounded-lg p-6 bg-surface border-1 border-border1 flex-gap20" key={person.id}>
                <div className="img w-24 h-24">
                    <img className="rounded-full max-w-full max-h-full" src={person.img} alt="" />
                </div>
                <div>
                    <div className="flex-between">
                        <div className="mb-3">
                            <h5 className="text-lg font-bold text-text-primary mb-[-4px]">{person.name}</h5>
                            <span className="text-[12px] font-normal text-primary">{person.job}</span>
                        </div>
                        <div className="text-status-green-dark text-md font-bold">{person.price}</div>
                    </div>
                    <p className="text-[12px] font-normal text-text-secondary mb-3">{person.desc}</p>
                    <div className="skills mb-4 flex-gap8">
                        <div className="badge">{person.skills[0].skillname}</div>
                        <div className="badge">{person.skills[1].skillname}</div>
                        <div className="badge">{person.skills[2].skillname}</div>
                    </div>
                </div>
            </div>
        );
    })

    return (
        <>
            {talentlist}
        </>
    );
}
