import EmployerHome from "../modules/employer/pages/EmployerHome";
import EmployerLayout from "../layouts/EmployerLayout";
import { Routes, Route ,Navigate } from "react-router-dom";
import Candidates from "../modules/employer/components/candidatescom.jsx";

export function AppRoutes() {
  return (
    <Routes>
    <Route path="/" element={<Navigate to="/employer" replace />} />  


      <Route path="/employer" element={<EmployerLayout />}>
        <Route index element={<EmployerHome />} />
        <Route path="posting" element={<EmployerHome />} />
        <Route path="candidatespage" element={<Candidates />} />
        <Route path="companies" element={<EmployerHome />} />
        <Route path="about_us" element={<EmployerHome />} />
        <Route path="pricing" element={<EmployerHome />} />
      </Route>
    </Routes>
  );
}
