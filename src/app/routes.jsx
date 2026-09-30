import EmployerHome from "../modules/employer/pages/EmployerHome";
import EmployerJobPostPage from "../modules/employer/pages/EmployerJobPostPage";
import CandidateHome from "../modules/candidate/pages/CandidateHome";
import EmployerLayout from "../layouts/EmployerLayout";
import CandidateLayout from "../layouts/CandidateLayout";
import { Routes, Route } from "react-router-dom";
import CandidatesPage from "../modules/employer/pages/CandidatesPage";
import CandidateProfilePage from "../modules/employer/pages/CandidateProfilePage";
import ScrollToTop from "../modules/employer/components/scrolltotop";
import Landing from "../modules/public/pages/Landing";
import CompanyPage from "../modules/public/pages/CompanyPage";
import CompanyDetails from "../modules/public/pages/CompanyDetails";
import { RequireAuth, RedirectIfAuthenticated } from "./routeGuards";
import EmployerPricingPage from "../modules/employer/pages/PricingPage";

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Public landing flow */}
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <Landing />
            </RedirectIfAuthenticated>
          }
        />

        {/* Authenticated routes */}
        <Route element={<RequireAuth />}>
          {/* Employer flow */}
          <Route path="/employer" element={<EmployerLayout />}>
            <Route index element={<EmployerHome />} />

            <Route path="posting" element={<EmployerJobPostPage />} />

            <Route path="candidatespage">
              <Route index element={<CandidatesPage />} />

              <Route
                path="candidateprofile/:candidateId"
                element={<CandidateProfilePage />}
              />
            </Route>

            <Route path="companies">
              <Route index element={<CompanyPage />} />

              <Route
                path="companyprofile/:companyId"
                element={<CompanyDetails />}
              />
            </Route>

            <Route path="about_us" element={<EmployerHome />} />

            <Route path="pricing" element={<EmployerPricingPage />} />
          </Route>

          {/* Candidate flow */}
          <Route path="/candidate" element={<CandidateLayout />}>
            <Route index element={<CandidateHome />} />

            <Route path="find-jobs" element={<CandidateHome />} />

            <Route path="companies">
              <Route index element={<CompanyPage />} />

              <Route
                path="companyprofile/:companyId"
                element={<CompanyDetails />}
              />
            </Route>

            <Route path="about_us" element={<CandidateHome />} />

            <Route path="pricing" element={<CandidateHome />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}