import Navbar from "../../../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedJobsSection from "../components/FeaturedJobsSection";
import ProfileCtaBanner from "../components/ProfileCtaBanner";
import CategorySection from "../components/CategorySection";
import WhyChooseSection from "../components/WhyChooseSection";
import TopCompaniesSection from "../components/TopCompaniesSection";
import RecentJobsSection from "../components/RecentJobsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturedJobsSection />
      <ProfileCtaBanner />
      <CategorySection />
      <WhyChooseSection />
      <TopCompaniesSection />
      <RecentJobsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}