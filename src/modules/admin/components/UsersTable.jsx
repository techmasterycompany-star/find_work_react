import { HiOutlineTrash } from "react-icons/hi2";

const users = [
  {
    id: 1,
    name: "Tech Company",
    label: "Ltd",
    type: "Employer",
    email: "Techmastery3@gmail.com",
    joinedDate: "25 Aug 2026",
    status: "Active",
    avatar: "TC",
  },
  {
    id: 2,
    name: "Aya Ahmed",
    label: "Ltd",
    type: "Candidate",
    email: "AyaAhmed@gmail.com",
    joinedDate: "25 Aug 2026",
    status: "Inactive",
    avatar: "AA",
  },
  {
    id: 3,
    name: "Tech Company",
    label: "Ltd",
    type: "Employer",
    email: "Techmastery3@gmail.com",
    joinedDate: "25 Aug 2026",
    status: "Active",
    avatar: "TC",
  },
  {
    id: 4,
    name: "Aya Ahmed",
    label: "Ltd",
    type: "Candidate",
    email: "AyaAhmed@gmail.com",
    joinedDate: "25 Aug 2026",
    status: "Inactive",
    avatar: "AA",
  },
  {
    id: 5,
    name: "Tech Company",
    label: "Ltd",
    type: "Employer",
    email: "Techmastery3@gmail.com",
    joinedDate: "25 Aug 2026",
    status: "Active",
    avatar: "TC",
  },
  {
    id: 6,
    name: "Aya Ahmed",
    label: "Ltd",
    type: "Candidate",
    email: "AyaAhmed@gmail.com",
    joinedDate: "25 Aug 2026",
    status: "Inactive",
    avatar: "AA",
  },
  {
    id: 7,
    name: "Aya Ahmed",
    label: "Ltd",
    type: "Candidate",
    email: "AyaAhmed@gmail.com",
    joinedDate: "25 Aug 2026",
    status: "Active",
    avatar: "AA",
  },
];

function UserAvatar({ initials }) {
  return (
    <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[7px] bg-[#172554] text-[8px] font-semibold text-white">
      {initials}
    </div>
  );
}

function TypeBadge({ type }) {
  const isEmployer = type === "Employer";

  return (
    <span
      className={`inline-flex rounded-[4px] px-2 py-1 text-[8px] font-medium ${
        isEmployer
          ? "bg-[#F3E8FF] text-[#8B5CF6]"
          : "bg-[#EDE9FE] text-[#6366F1]"
      }`}
    >
      {type}
    </span>
  );
}

function StatusBadge({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex min-w-[42px] justify-center rounded-[4px] px-2 py-1 text-[8px] font-medium ${
        isActive ? "bg-[#DCFCE7] text-[#22C55E]" : "bg-[#F4F4F5] text-[#A1A1AA]"
      }`}
    >
      {status}
    </span>
  );
}

function UserRow({ user }) {
  return (
    <div className="grid h-[48px] grid-cols-[2fr_1fr_1.5fr_1fr_1fr_56px] items-center border-b border-[#F0F0F2] px-4 last:border-b-0">
      {/* User */}
      <div className="flex min-w-0 items-center gap-3">
        <UserAvatar initials={user.avatar} />

        <div className="min-w-0">
          <p className="truncate text-[10px] font-medium leading-[13px] text-[#27272A]">
            {user.name}
          </p>

          <p className="text-[8px] leading-[10px] text-[#A1A1AA]">
            {user.label}
          </p>
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

      {/* Status */}
      <div>
        <StatusBadge status={user.status} />
      </div>

      {/* Action */}
      <div className="flex justify-center">
        <button
          type="button"
          aria-label={`Delete ${user.name}`}
          className="flex h-[20px] w-[20px] items-center justify-center rounded-[5px] bg-[#FEE2E2] text-[#F87171] transition hover:bg-[#FECACA]"
        >
          <HiOutlineTrash className="h-[11px] w-[11px]" />
        </button>
      </div>
    </div>
  );
}

export default function UsersTable() {
  return (
    <section className="w-full overflow-hidden rounded-[8px] border border-[#D4D4D8] bg-white">
      {/* Table Header */}
      <div className="grid h-[48px] grid-cols-[2fr_1fr_1.5fr_1fr_1fr_56px] items-center border-b border-[#E4E4E7] bg-[#FAFAFA] px-4">
        <p className="text-[9px] font-medium text-[#71717A]">Users</p>
        <p className="text-[9px] font-medium text-[#71717A]">Type</p>
        <p className="text-[9px] font-medium text-[#71717A]">Email</p>
        <p className="text-[9px] font-medium text-[#71717A]">Joined Date</p>
        <p className="text-[9px] font-medium text-[#71717A]">Status</p>
        <p className="text-center text-[9px] font-medium text-[#71717A]">
          Action
        </p>
      </div>

      {/* Rows */}
      <div>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex h-[48px] items-center justify-between border-t border-[#E4E4E7] px-4">
        <p className="text-[9px] text-[#71717A]">Showing 1–10 of 152 users</p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center text-[11px] text-[#A1A1AA]"
          >
            ‹
          </button>

          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-[5px] border border-[#D4D4D8] bg-white text-[9px] font-medium text-[#27272A]"
          >
            1
          </button>

          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center text-[9px] text-[#52525B]"
          >
            2
          </button>

          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center text-[9px] text-[#52525B]"
          >
            3
          </button>

          <span className="flex h-7 w-7 items-center justify-center text-[9px] text-[#71717A]">
            ...
          </span>

          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center text-[9px] text-[#52525B]"
          >
            9
          </button>

          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center text-[9px] text-[#52525B]"
          >
            10
          </button>

          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center text-[11px] text-[#52525B]"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
