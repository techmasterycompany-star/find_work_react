import { HiOutlineTrash } from 'react-icons/hi2';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function UserAvatar({ initials }) {
  return (
    <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[7px] bg-[#172554] text-[8px] font-semibold text-white">
      {initials}
    </div>
  );
}

function TypeBadge({ type }) {
  const isEmployer = type === 'Employer';
  return (
    <span
      className={`inline-flex rounded-[4px] px-2 py-1 text-[8px] font-medium ${
        isEmployer ? 'bg-[#F3E8FF] text-[#8B5CF6]' : 'bg-[#EDE9FE] text-[#6366F1]'
      }`}
    >
      {type}
    </span>
  );
}

function StatusBadge({ status }) {
  const isActive = status === 'Active';
  return (
    <span
      className={`inline-flex min-w-[42px] justify-center rounded-[4px] px-2 py-1 text-[8px] font-medium ${
        isActive ? 'bg-[#DCFCE7] text-[#22C55E]' : 'bg-[#F4F4F5] text-[#A1A1AA]'
      }`}
    >
      {status}
    </span>
  );
}

function getPages(current, total) {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, '...', total - 1, total];
  if (current >= total - 2) return [1, 2, '...', total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

function UserRow({ user, onDelete, onSuspend, onActivate, busy }) {
  const isActive = user.status === 'Active';
  return (
    <div className="grid h-[48px] grid-cols-[2fr_1fr_1.5fr_1fr_1fr_56px] items-center border-b border-[#F0F0F2] px-4 last:border-b-0">
      {/* User */}
      <div className="flex min-w-0 items-center gap-3">
        <UserAvatar initials={user.avatar} />
        <div className="min-w-0">
          <p className="truncate text-[10px] font-medium leading-[13px] text-[#27272A]">
            {user.name}
          </p>
          <p className="text-[8px] leading-[10px] text-[#A1A1AA]">{user.label}</p>
        </div>
      </div>

      {/* Type */}
      <div>
        <TypeBadge type={user.type} />
      </div>

      {/* Email */}
      <p className="truncate text-[9px] text-[#52525B]">{user.email}</p>

      {/* Date */}
      <p className="text-[9px] text-[#52525B]">{user.joinedDate}</p>

      {/* Status + suspend/activate action */}
      <div className="flex items-center gap-1">
        <StatusBadge status={user.status} />
        <button
          type="button"
          onClick={() => (isActive ? onSuspend(user) : onActivate(user))}
          disabled={busy}
          title={isActive ? 'Suspend user' : 'Activate user'}
          className={`flex h-[20px] w-[20px] items-center justify-center rounded-[5px] text-[10px] transition disabled:opacity-50 ${
            isActive
              ? 'bg-[#FEF3C7] text-[#D97706] hover:bg-[#FDE68A]'
              : 'bg-[#DCFCE7] text-[#22C55E] hover:bg-[#BBF7D0]'
          }`}
        >
          {isActive ? '⏸' : '▶'}
        </button>
      </div>

      {/* Delete action */}
      <div className="flex justify-center">
        <button
          type="button"
          aria-label={`Delete ${user.name}`}
          onClick={() => onDelete(user)}
          disabled={busy}
          className="flex h-[20px] w-[20px] items-center justify-center rounded-[5px] bg-[#FEE2E2] text-[#F87171] transition hover:bg-[#FECACA] disabled:opacity-50"
        >
          <HiOutlineTrash className="h-[11px] w-[11px]" />
        </button>
      </div>
    </div>
  );
}

export default function UsersTable({
  rows,
  total,
  page,
  pageSize,
  totalPages,
  onPageChange,
  onDelete,
  onSuspend,
  onActivate,
  isLoading,
  suspendingId,
  activatingId,
  deletingId,
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <section className="w-full overflow-hidden rounded-[8px] border border-[#D4D4D8] bg-white">
      {/* Header */}
      <div className="grid h-[48px] grid-cols-[2fr_1fr_1.5fr_1fr_1fr_56px] items-center border-b border-[#E4E4E7] bg-[#FAFAFA] px-4">
        <p className="text-[9px] font-medium text-[#71717A]">Users</p>
        <p className="text-[9px] font-medium text-[#71717A]">Type</p>
        <p className="text-[9px] font-medium text-[#71717A]">Email</p>
        <p className="text-[9px] font-medium text-[#71717A]">Joined Date</p>
        <p className="text-[9px] font-medium text-[#71717A]">Status</p>
        <p className="text-center text-[9px] font-medium text-[#71717A]">Action</p>
      </div>

      {/* Rows */}
      <div>
        {isLoading && (
          <p className="py-8 text-center text-[10px] text-[#A1A1AA]">Loading users…</p>
        )}
        {!isLoading && rows.length === 0 && (
          <p className="py-8 text-center text-[10px] text-[#A1A1AA]">No users found.</p>
        )}
        {rows.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onDelete={onDelete}
            onSuspend={onSuspend}
            onActivate={onActivate}
            busy={suspendingId === user.id || activatingId === user.id || deletingId === user.id}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex h-[48px] items-center justify-between border-t border-[#E4E4E7] px-4">
        <p className="text-[9px] text-[#71717A]">
          Showing {from}–{to} of {total} users
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="flex h-7 w-7 items-center justify-center text-[11px] text-[#A1A1AA] disabled:opacity-40"
          >
            ‹
          </button>
          {getPages(page, totalPages).map((p, i) =>
            p === '...' ? (
              <span key={`dots-${i}`} className="flex h-7 w-7 items-center justify-center text-[9px] text-[#71717A]">
                ...
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`flex h-7 w-7 items-center justify-center rounded-[5px] text-[9px] font-medium ${
                  p === page
                    ? 'border border-[#D4D4D8] bg-white text-[#27272A]'
                    : 'text-[#52525B] hover:bg-[#FAFAFA]'
                }`}
              >
                {p}
              </button>
            ),
          )}
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="flex h-7 w-7 items-center justify-center text-[11px] text-[#A1A1AA] disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
