import { Outlet } from "react-router-dom";
import Footer from "../modules/employer/components/Footer";
import CandidateNavBarLinks from "../modules/candidate/components/CandidateNavBar";

export default function CandidateLayout(){
    return(
       <>
        <header>
            <CandidateNavBarLinks/>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <Footer />
        </footer>
       </>
    );
}