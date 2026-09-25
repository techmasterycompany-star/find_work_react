import EmployerHome from "../modules/employer/pages/EmployerHome";
import EmployerLayout from "../layouts/EmployerLayout";
import { Routes, Route ,Navigate } from "react-router-dom";
import CandidatesPage from "../modules/employer/pages/CandidatesPage";
import CandidateProfilePage from "../modules/employer/pages/CandidateProfilePage";
import ScrollToTop from "../modules/employer/components/scrolltotop";


export function AppRoutes() {
  return (
      <>
    <ScrollToTop />
    <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />  


      <Route path="/employer" element={<EmployerLayout />}>
        <Route index element={<EmployerHome />} />
        <Route path="posting" element={<EmployerHome/>} />
        <Route path="/employer/candidatespage">
           <Route index element={<CandidatesPage />} />
           <Route path="candidateprofile/:candidateId" element={<CandidateProfilePage />} />
        </Route>
        <Route path="companies" element={<EmployerHome />} />
        <Route path="about_us" element={<EmployerHome />} />
        <Route path="pricing" element={<EmployerHome />} />
      </Route>
    </Routes>
    </>
  );
}
