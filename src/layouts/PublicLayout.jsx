import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../modules/public/components/footer";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
