import { Routes, Route } from "react-router-dom";

import EmployerHome from "../modules/employer/pages/EmployerHome";
import EmployerJobPostPage from "../modules/employer/pages/EmployerJobPostPage";
import PricingPage from "../modules/employer/pages/PricingPage";
import CandidatesPage from "../modules/employer/pages/CandidatesPage";
import CandidateProfilePage from "../modules/employer/pages/CandidateProfilePage";
import EmployerNotifications from "../modules/employer/pages/EmployerNotifications";
import EmployerLayout from "../layouts/EmployerLayout";

import CandidateHome from "../modules/candidate/pages/CandidateHome";
import CandidateLayout from "../layouts/CandidateLayout";

import Landing from "../modules/public/pages/Landing";
import CompanyPage from "../modules/public/pages/CompanyPage";
import CompanyDetails from "../modules/public/pages/CompanyDetails";
import AboutUs from "../modules/public/pages/AboutUs";

import Login from "../modules/auth/pages/Login";
import RoleSelect from "../modules/auth/pages/RoleSelect";
import EmployerSignUp from "../modules/auth/pages/employerSignUp";
import CandidateSignUp from "../modules/auth/pages/candidateSignUp";
import Congrats from "../modules/auth/pages/Congrats";
import PublicLayout from "../layouts/PublicLayout";

import ScrollToTop from "../modules/employer/components/scrolltotop";
import { RequireAuth, RedirectIfAuthenticated } from "./routeGuards";
import { RequireEmployer } from "./RequireEmployer";
import FindJobs from "../modules/public/pages/FindJobs";
import SavedJobs from "../modules/candidate/pages/SavedJobs";
import CandidateAnalytics from "../modules/candidate/pages/CandidateAnalytics";
import CandidateSettings from "../modules/candidate/pages/CandidateSettings";
import CandidateNotifications from "../modules/candidate/pages/CandidateNotifications";
import EmployerAnalytics from "../modules/employer/pages/EmployerAnalytics";
import MyJobs from "../modules/employer/pages/MyJobs";
import ApplicationList from "../modules/employer/pages/ApplicationList";
import ApplicantDetails from "../modules/employer/pages/ApplicantDetails";
import JobDetails from "../modules/public/pages/JobDetails";

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

        {/* Public, unauthenticated content */}
        <Route element={<PublicLayout />}>
          <Route path="/companies" element={<CompanyPage />} />
          <Route
            path="/companies/companyprofile/:companyId"
            element={<CompanyDetails />}
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/find-jobs" element={<FindJobs />} />
        </Route>

        {/* Auth flow */}
        <Route path="/login" element={<Login />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/role-select" element={<RoleSelect />} />
        <Route path="/auth/signup/employer" element={<EmployerSignUp />} />
        <Route path="/auth/signup/candidate" element={<CandidateSignUp />} />
        <Route path="/auth/congratulations" element={<Congrats />} />

        {/* Authenticated routes */}
        <Route element={<RequireAuth />}>
          {/* Employer flow — guarded so candidates can't enter */}
          <Route element={<RequireEmployer />}>
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

              <Route path="pricing" element={<PricingPage />} />
              <Route path="analytics" element={<EmployerAnalytics />} />
              <Route path="myjobs" element={<MyJobs />} />
              <Route path="myjobs/applicants/:jobId" element={<ApplicationList />} />
              <Route path="myjobs/applicants/:jobId/profile/:profileId" element={<ApplicantDetails />} />
              <Route path="notifications" element={<EmployerNotifications />} />
            </Route>
          </Route>

          {/* Candidate flow */}
          <Route path="/candidate" element={<CandidateLayout />}>
            <Route index element={<CandidateHome />} />
            <Route path="find-jobs" element={<FindJobs />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="saved" element={<SavedJobs />} />
            <Route path="analytics" element={<CandidateAnalytics />} />
            <Route path="settings" element={<CandidateSettings />} />
            <Route path="notifications" element={<CandidateNotifications />} />
            <Route path="jobs/:jobId" element={<JobDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}