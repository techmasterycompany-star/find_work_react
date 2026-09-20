import { Outlet } from "react-router-dom";
import NavBarLinks from "../modules/employer/components/EmployerNavBar";
import  Footer  from "../modules/employer/components/Footer";

export default function EmployerLayout(){
    return(
       <>
        <header>
            <NavBarLinks/>
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