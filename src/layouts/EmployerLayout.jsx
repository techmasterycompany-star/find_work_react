import { Outlet } from "react-router-dom";
import  Footer  from "../modules/employer/components/Footer";
import EmployerNavBarLinks from "../modules/employer/components/EmployerNavBar";

export default function EmployerLayout(){
    return(
       <>
        <header>
            <EmployerNavBarLinks/>
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