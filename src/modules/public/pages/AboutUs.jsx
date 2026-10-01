import AboutHero from "../components/AboutHero";
import AboutStats from "../components/AboutStats";
import AboutTestimonials from "../components/AboutTestimonials";
import AboutBanner from "../components/Banner";
import CoreValues from "../components/CoreValues";
import Joureny from "../components/Journey";
import Mission from "../components/Mission";
import Team from "../components/Team";

export default function AboutUs(){
    return(
         <main className="min-h-screen w-full">
             <AboutHero />
             <AboutStats />
             <Mission/>
             <CoreValues/>
             <Joureny/>
             <Team/>
             <AboutTestimonials/>
             <AboutBanner/>
         </main>
    );
}