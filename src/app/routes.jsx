import EmployerHome from "../modules/employer/pages/EmployerHome";
import EmployerJobPostPage from "../modules/employer/pages/EmployerJobPostPage";
import CandidateHome from "../modules/candidate/pages/CandidateHome";
import EmployerLayout from "../layouts/EmployerLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import Candidates from "../modules/employer/components/candidatescom.jsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/employer" element={<EmployerLayout />}>
        <Route index element={<EmployerHome />} />
        <Route path="posting" element={<EmployerJobPostPage />} />
        <Route path="candidatespage" element={<Candidates />} />
        <Route path="companies" element={<EmployerHome />} />
        <Route path="about_us" element={<EmployerHome />} />
        <Route path="pricing" element={<EmployerHome />} />
      </Route>
      <Route path="/candidate" element={<CandidateHome />} />
    </Routes>
  );
}
