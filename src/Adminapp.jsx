import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import Overview from "./modules/admin/pages/AdminOverview";
import UserManagement from "./modules/admin/pages/UserManagement";
import CompanyActivation from "./modules/admin/pages/Companyactivation";

export default function AdminApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="companies" element={<CompanyActivation />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}