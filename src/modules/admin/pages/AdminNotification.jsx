const notifications = [
  {
    id: 1,
    name: "Tech Mastery",
    message: "Submitted a new Ui/Ux Designer position",
    avatar: "TM",
    tags: [
      {
        label: "Full time",
        className: "bg-[#F5F3FF] text-[#7C3AED]",
      },
      {
        label: "Remote",
        className: "bg-[rgba(34,197,94,0.1)] text-[#22C55E]",
      },
      {
        label: "Gains",
        className: "bg-[#F5F3FF] text-[#7C3AED]",
      },
    ],
    time: "3h",
    dotColor: "bg-[#8B5CF6]",
    action: {
      label: "Job Post Request",
      primary: "Approve",
      secondary: "Decline",
    },
  },
  {
    id: 2,
    name: "Noon",
    message: "Activation's Request",
    avatar: "N",
    tags: [
      {
        label: "Online Marketplace",
        className: "bg-[#F5F3FF] text-[#7C3AED]",
      },
      {
        label: "Customer Services",
        className: "bg-[rgba(34,197,94,0.1)] text-[#22C55E]",
      },
    ],
    time: "3h",
    dotColor: "bg-[#22C55E]",
    action: {
      label: "Company Account Request",
      primary: "Review",
      secondary: "Decline",
    },
  },
  {
    id: 3,
    name: "Yousef Ahmed",
    message: "Reported a comment on Tech Mastery page",
    avatar: "YA",
    tags: [
      {
        label: "UI/UX Designer",
        className: "bg-[#F5F3FF] text-[#7C3AED]",
      },
    ],
    time: "3h",
    dotColor: "bg-[#EF4444]",
    comment: {
      name: "Ahmed Ali",
      role: "UI/UX Designer",
      time: "3days ago",
      avatar: "AA",
      text: "I had a bad experience with Tech Mastery. The job description was misleading and didn’t match the actual position.",
    },
  },
];

function NotificationAvatar({ children, small = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg bg-[#EDE9FE] font-semibold text-[#5B21B6] ${
        small
          ? "h-[31px] w-[31px] rounded-[2px] text-[10px]"
          : "h-12 w-12 text-sm"
      }`}
    >
      {children}
    </div>
  );
}

function NotificationTags({ tags }) {
  return (
    <div className="flex items-center gap-2">
      {tags.map((tag) => (
        <span
          key={tag.label}
          className={`rounded px-2 py-1 text-[12px] leading-[15px] ${tag.className}`}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}

function RequestActions({ action }) {
  return (
    <div className="ml-auto flex h-[66px] w-[446px] items-center rounded-lg border border-[#D4D4D8] bg-[#FAFAFA] px-4">
      <div className="flex w-full items-center gap-2">
        <span className="shrink-0 text-[14px] font-medium leading-[17px] text-[#27272A]">
          {action.label} :
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-8 min-w-[97px] items-center justify-center rounded-xl bg-[#7C3AED] px-4 text-[14px] font-medium text-white transition hover:bg-[#6D28D9]"
          >
            {action.primary}
          </button>

          <button
            type="button"
            className="flex h-8 min-w-[97px] items-center justify-center rounded-xl border border-[#7C3AED] px-4 text-[14px] font-medium text-[#7C3AED] transition hover:bg-[#F5F3FF]"
          >
            {action.secondary}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReportedComment({ comment }) {
  return (
    <div className="ml-auto w-[446px] rounded-lg border border-[#D4D4D8] bg-[#FAFAFA] p-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-1.5">
              <NotificationAvatar small>{comment.avatar}</NotificationAvatar>

              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-medium leading-[17px] text-[#27272A]">
                  {comment.name}
                </span>

                <span className="text-[10px] leading-[12px] text-[#A1A1AA]">
                  {comment.role}
                </span>
              </div>
            </div>

            <span className="text-[12px] leading-[15px] text-[#A1A1AA]">
              {comment.time}
            </span>
          </div>

          <div className="rounded-lg border border-[#F4F4F5] bg-white p-4 shadow-[0_0_1px_rgba(0,0,0,0.25)]">
            <p className="text-[12px] leading-[15px] text-[#71717A]">
              “{comment.text}”
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="flex h-8 min-w-[97px] items-center justify-center rounded-xl bg-[#7C3AED] px-4 text-[14px] font-medium text-white transition hover:bg-[#6D28D9]"
          >
            Preview
          </button>

          <button
            type="button"
            className="flex h-8 min-w-[157px] items-center justify-center rounded-xl border border-[#7C3AED] px-4 text-[14px] font-medium text-[#7C3AED] transition hover:bg-[#F5F3FF]"
          >
            Remove Comment
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ notification }) {
  return (
    <div className="relative min-h-[208px] border-b-2 border-[#EEE8F6] px-6 py-7">
      {/* Timeline */}
      <div className="absolute bottom-0 left-0 top-0 w-[48px]">
        <div className="absolute bottom-0 left-[23px] top-0 w-[2px] bg-[#F4F4F5]" />

        <span
          className={`absolute left-[18px] top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full ${notification.dotColor}`}
        />
      </div>

      <div className="flex flex-col gap-5 pl-0">
        {/* Notification header */}
        <div className="flex items-start gap-3">
          <NotificationAvatar>{notification.avatar}</NotificationAvatar>

          <div className="flex min-w-0 flex-1 items-start justify-between gap-6">
            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex items-center gap-1">
                <span className="text-[16px] font-medium leading-[19px] text-[#27272A]">
                  {notification.name}:
                </span>

                <span className="text-[14px] leading-[17px] text-[#27272A]">
                  {notification.message}
                </span>
              </div>

              <NotificationTags tags={notification.tags} />
            </div>

            <span className="shrink-0 text-[14px] leading-[17px] text-[#A1A1AA]">
              {notification.time}
            </span>
          </div>
        </div>

        {/* Request / comment */}
        {notification.action && <RequestActions action={notification.action} />}

        {notification.comment && (
          <ReportedComment comment={notification.comment} />
        )}
      </div>
    </div>
  );
}

function NotificationTabs() {
  return (
    <div className="flex h-[55px] items-center rounded-xl bg-[#F4F4F5] px-4">
      <div className="flex h-[42px] items-center gap-6">
        <button
          type="button"
          className="flex h-[42px] items-center justify-center gap-2 rounded-lg bg-[#FAFAFA] px-3 shadow-[0_0_4px_rgba(0,0,0,0.25)]"
        >
          <span className="text-[16px] font-bold text-[#7C3AED]">All</span>

          <span className="flex h-[19px] min-w-[18px] items-center justify-center rounded-[2px] bg-[#DDD6FE] px-1 text-[12px] font-bold text-[#7C3AED]">
            4
          </span>
        </button>

        <button
          type="button"
          className="flex h-[42px] items-center gap-2 px-2 text-[16px] text-[#52525B]"
        >
          Jobs
          <span className="flex h-[19px] min-w-[18px] items-center justify-center rounded-[2px] bg-[#E4E4E7] px-1 text-[12px] font-bold text-[#71717A]">
            4
          </span>
        </button>

        <button
          type="button"
          className="flex h-[42px] items-center gap-2 px-2 text-[16px] text-[#52525B]"
        >
          Comments
          <span className="flex h-[19px] min-w-[18px] items-center justify-center rounded-[2px] bg-[#E4E4E7] px-1 text-[12px] font-bold text-[#71717A]">
            4
          </span>
        </button>

        <button
          type="button"
          className="flex h-[42px] items-center gap-2 px-2 text-[16px] text-[#52525B]"
        >
          Activations
          <span className="flex h-[19px] min-w-[18px] items-center justify-center rounded-[2px] bg-[#E4E4E7] px-1 text-[12px] font-bold text-[#71717A]">
            4
          </span>
        </button>
      </div>
    </div>
  );
}

export default function AdminNotification() {
  return (
    <section className="w-full">
      {/* Page title */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-[27px] w-[7px] rounded-[2px] bg-[#7C3AED]" />

          <h1 className="text-[24px] font-semibold leading-[29px] text-[#27272A]">
            Your Notification
          </h1>
        </div>

        <button
          type="button"
          className="text-[14px] leading-[17px] text-[#52525B] transition hover:text-[#27272A]"
        >
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <NotificationTabs />

      {/* Notifications */}
      <div className="overflow-hidden rounded-b-xl bg-[#FAFAFA]">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </section>
  );
}
