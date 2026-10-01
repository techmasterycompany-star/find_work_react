import { Outlet } from "react-router-dom";
// import  Footer  from "../modules/employer/components/Footer";
import PublicHeader from "../modules/public/components/PublicHeader";
import Footer from "../modules/public/components/footer";

export default function LandingLayout(){
    return(
       <>
        <header>
            <PublicHeader/>
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