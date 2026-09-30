import { Outlet } from "react-router-dom";
import AdminSidebar from "../modules/admin/components/AdminSidebar";
import AdminHeader from "../modules/admin/components/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F8F8FA]">
      <AdminSidebar />

      <div className="ml-[260px] min-h-screen">
        <AdminHeader />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}