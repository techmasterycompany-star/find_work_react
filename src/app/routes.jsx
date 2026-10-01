import EmployerHome from "../modules/employer/pages/EmployerHome";
import EmployerJobPostPage from "../modules/employer/pages/EmployerJobPostPage";
import CandidateHome from "../modules/candidate/pages/CandidateHome";
import EmployerLayout from "../layouts/EmployerLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import CandidatesPage from "../modules/employer/pages/CandidatesPage";
import CandidateProfilePage from "../modules/employer/pages/CandidateProfilePage";
import ScrollToTop from "../modules/employer/components/scrolltotop";
import Landing from "../modules/public/pages/Landing";
import CompanyPage from "../modules/employer/pages/CompanyPage";
import CompanyDetails from "../modules/employer/pages/CompanyDetails";
import CandidateLayout from "../layouts/CandidateLayout";
import AboutUs from "../modules/public/pages/AboutUs";
import LandingLayout from "../layouts/LandingLayout";
import FindJobs from "../modules/public/pages/FindJobs";
import SavedJobs from "../modules/candidate/components/SavedJobs";

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* landing flow */}
        <Route path="/" element={<LandingLayout/>}>
           <Route path="/" element={<Navigate to="/landing" replace />} />
           <Route path="/landing" element={<Landing />} />
           <Route path="/about_us" element={<AboutUs />} />
            <Route path="/companies">
            <Route index element={<CompanyPage />} />
            <Route
              path="companyprofile/:companyId"
              element={<CompanyDetails />}
            />
          </Route>
        </Route>

        {/* employer flow */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<EmployerHome />} />
          <Route path="posting" element={<EmployerJobPostPage />} />

          <Route path="/employer/candidatespage">
            <Route index element={<CandidatesPage />} />
            <Route
              path="candidateprofile/:candidateId"
              element={<CandidateProfilePage />}
            />
          </Route>

          <Route path="/employer/companies">
            <Route index element={<CompanyPage />} />
            <Route
              path="companyprofile/:companyId"
              element={<CompanyDetails />}
            />
          </Route>

          <Route path="about_us" element={<AboutUs />} />
          <Route path="pricing" element={<EmployerHome />} />
        </Route>

         {/* candidate flow */}
        <Route path="/candidate" element={<CandidateLayout />} >
           <Route index element={<CandidateHome/>}/>
           <Route path="FindJobs" element={<FindJobs/>} />

          <Route path="/candidate/companies">
            <Route index element={<CompanyPage />} />
            <Route
              path="companyprofile/:companyId"
              element={<CompanyDetails />}
            />
          </Route>
          
          <Route path="savedjobs" element={<SavedJobs/>}/>

          <Route path="about_us" element={<AboutUs />} />

          <Route path="pricing" element={<CandidateHome />} />
        </Route>
      </Routes>
    </>
  );
}
