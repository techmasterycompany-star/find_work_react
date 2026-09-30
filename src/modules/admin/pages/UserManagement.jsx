import UserManagementStats from "../components/UserManagementStats";
import UserManagementFilters from "../components/UserManagementFilters";
import UsersTable from "../components/UsersTable";

export default function UserManagement() {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Statistics */}
      <UserManagementStats />

      {/* Search + Filters */}
      <UserManagementFilters />

      {/* Users */}
      <UsersTable />
    </div>
  );
}