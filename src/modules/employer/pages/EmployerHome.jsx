// import { UserProvider } from "../../../context/UsersContext";
import Activity from "../components/Activity";
import Banner from "../components/Banner";
import Hero from "../components/HeroSec";
import JobPosting from "../components/JobPosting";
import Marketing from "../components/Marketing";
import Spotlight from "../components/Spotlight";
import TopCandidates from "../components/TopCandidates";




export default function EmployerHome() {
  return (
    <>
      <div className="min-h-screen overflow-x-hidden">
        <Hero />
        <JobPosting />
        <Marketing />
        <TopCandidates/>
        <Activity />
        <Spotlight/>
        <Banner/>
      </div>
    </>
  );
}
