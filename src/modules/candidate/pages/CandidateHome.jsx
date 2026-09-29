import Applications from "../components/Applications";
import { Banner } from "../components/Banner";
import CandidateHeroSection from "../components/CandidateHeroSection";
import Career from "../components/Career";
import HiringCompanies from "../components/HiringCompanies";
import HowWorks from "../components/HowWorks";
import Recommended from "../components/Recommended";

export default function CandidateHome() {
  return (
    <main className="min-h-screen w-full">
       <CandidateHeroSection />
       <Recommended/>
       <HowWorks />
       <Applications />
       <HiringCompanies />
       <Career />
       <Banner />
    </main>
  );
}
