import { Link } from "react-router-dom";
import ButtonFit from "../../employer/components/ButtonFit";
import nosave from "../../../assets/nosave.png";


export default function NoSavedJobs(){
    return(
        <div className="flex-center flex-col w-[1100px] h-[500px]">
          <div className="img w-120 h-80">
            <img className="max-w-full" src={nosave} alt="" />
          </div>
          {" "}
          <h3 className="text-2xl font-bold text-text-primary mb-3 mt-[20px]">No Saved Jobs Yet!</h3>
          <p className="text-md text-text-secondary font-medium mb-6">Jobs you save will appear here for easy access later.</p>
          <Link to="/candidate/find-jobs">
             <ButtonFit>Browse Jobs</ButtonFit>
          </Link>
        </div>

    );
}