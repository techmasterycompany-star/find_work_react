import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './context/AuthContext';
import { adminQueryClient } from './modules/admin/services/queryClient';

import { RequireAdmin } from './app/RequireAdmin';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './modules/auth/pages/AdminLogin';

import Overview from './modules/admin/pages/AdminOverview';
import UserManagement from './modules/admin/pages/UserManagement';
import CompanyActivation from './modules/admin/pages/CompanyActivation';
import JobMangementPage from './modules/admin/pages/JobMangement';
import Analytics from './modules/admin/pages/Analytics';
import AdminNotification from './modules/admin/pages/AdminNotification';


import AccountSettings from './modules/admin/pages/settings/AccountSettings';
import ModerationSettings from './modules/admin/pages/settings/ModerationSettings';

export default function AdminApp() {
  return (
    <QueryClientProvider client={adminQueryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Admin login (public) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Everything under /admin/* requires an authenticated admin */}
            <Route element={<RequireAdmin />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Overview />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="jobs" element={<JobMangementPage />} />
                <Route path="companies" element={<CompanyActivation />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="notifications" element={<AdminNotification />} />

                {/* Settings */}
                <Route path="settings" element={<Navigate to="/admin/settings/account" replace />} />
                <Route path="settings/account" element={<AccountSettings />} />
                <Route path="settings/moderation" element={<ModerationSettings />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
