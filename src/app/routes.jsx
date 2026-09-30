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
import CompanyPage from "../modules/employer/pages/CompanyPage";
import CompanyDetails from "../modules/employer/pages/CompanyDetails";
import { RequireAuth, RedirectIfAuthenticated } from "./routeGuards";


export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <Landing />
            </RedirectIfAuthenticated>
          }
        />

        <Route element={<RequireAuth />}>
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
            <Route path="pricing" element={<EmployerHome />} />
          </Route>

          <Route path="/candidate" element={<CandidateLayout />}>
            <Route index element={<CandidateHome />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}