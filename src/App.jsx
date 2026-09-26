import { Routes, Route } from "react-router-dom";

import Login from "./modules/auth/pages/Login";
import RoleSelect from "./modules/auth/pages/RoleSelect";
import EmployerSignUp from "./modules/auth/pages/employerSignUp";
import CandidateSignUp from "./modules/auth/pages/candidateSignUp";
import Congrats from "./modules/auth/pages/Congrats";

import "./App.css";

import { UserProvider } from "./context/UsersContext";
import { JobProvider } from "./context/JobContext";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./app/routes";

function App() {
  return (
    <UserProvider>
      <JobProvider>
        <AuthProvider>
          <AppRoutes />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/role-select" element={<RoleSelect />} />
            <Route path="/auth/signup/employer" element={<EmployerSignUp />} />
            <Route path="/auth/signup/candidate" element={<CandidateSignUp />} />
            <Route path="/auth/congratulations" element={<Congrats />} />
          </Routes>
        </AuthProvider>
      </JobProvider>
    </UserProvider>
  );
}

export default App;
