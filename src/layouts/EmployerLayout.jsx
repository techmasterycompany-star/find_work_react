import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../modules/employer/components/Footer";

export default function EmployerLayout() {
  return (
    <>
      <header>
        <Navbar />
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
