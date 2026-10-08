import { useContext } from "react";
import { UserContext } from "../../../context/UsersContext";
import { useParams } from "react-router-dom";
import BreadCrump from "../../../components/BreadCrump";

export default function ApplicantDetails(){
      const { candidatedata } = useContext(UserContext);
      const {profileId}=useParams();

      const applicant = candidatedata.find((f)=>{
        return f.id == profileId;
      });
    return(
        <>
        <BreadCrump firstlink={"Ui/Ux Designer"} secondlink={"Applications"} thirdlink={applicant.name} />
         <div className="w-full h-fit p-5 rounded-2sm border-1 border-border1">
                {/* user info */}
              <div className="users flex-gap16">
                <div className="img w-12 h-12">
                  <img
                    className="max-w-full rounded-full"
                    src={applicant.img}
                    alt=""
                  />
                </div>
                <div className="content">
                  <h3 className="text-text-primary font-bold text-md">
                    {applicant.name}
                  </h3>
                  <div className="flex-gap8">
                    <span className="text-sm font-medium text-text-secondary">
                      {applicant.job}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span className="text-sm font-medium text-text-secondary">
                      {applicant.exp}
                    </span>
                  </div>
                  <span className="text-text-placholder text-[12px] font-medium block">
                    Applied on {applicant.joindate}
                  </span>
                </div>
              </div>
         </div>
        </>
    );
}