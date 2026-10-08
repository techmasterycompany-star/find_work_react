import { useMemo, useState } from "react";
import {
  useAdminUsers,
  useDeleteUser,
  useSuspendUser,
  useActivateUser,
} from "../hooks/useAdminQueries";
import { toUserRow } from "../services/adminAdapters";
import UserManagementStats from "../components/UserManagementStats";
import UserManagementFilters from "../components/UserManagementFilters";
import UsersTable from "../components/UsersTable";

const PAGE_SIZE = 10;

export default function UserManagement() {
  const { data: rawUsers = [], isLoading, isError, error } = useAdminUsers();
  const suspendMutation = useSuspendUser();
  const activateMutation = useActivateUser();
  const deleteMutation = useDeleteUser();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // all | Employer | Candidate | Admin
  const [page, setPage] = useState(1);

  const users = useMemo(() => rawUsers.map(toUserRow), [rawUsers]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (typeFilter !== "all" && u.type !== typeFilter) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    });
  }, [users, search, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.status === "Active").length,
      candidates: users.filter((u) => u.type === "Candidate").length,
      employers: users.filter((u) => u.type === "Employer").length,
    }),
    [users],
  );

  const handleDelete = (user) => {
    if (window.confirm(`Delete user "${user.name}"? This cannot be undone.`)) {
      deleteMutation.mutate(user.id);
    }
  };

  const handleSuspend = (user) => suspendMutation.mutate(user.id);
  const handleActivate = (user) => activateMutation.mutate(user.id);

  const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <UserManagementStats stats={stats} />

      <UserManagementFilters
        search={search}
        onSearchChange={withReset(setSearch)}
        type={typeFilter}
        onTypeChange={withReset(setTypeFilter)}
      />

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load users: {error?.message ?? "unknown error"}
        </div>
      )}

      <UsersTable
        rows={rows}
        total={filtered.length}
        page={safePage}
        pageSize={PAGE_SIZE}
        totalPages={totalPages}
        onPageChange={setPage}
        onDelete={handleDelete}
        onSuspend={handleSuspend}
        onActivate={handleActivate}
        isLoading={isLoading}
        suspendingId={suspendMutation.variables}
        activatingId={activateMutation.variables}
        deletingId={deleteMutation.variables}
      />
    </div>
  );
}
