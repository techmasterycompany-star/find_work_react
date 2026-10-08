import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  useEmployerNotifications,
  useMarkAllNotificationsRead,
} from "../hooks/useEmployerQueries";
import { toNotificationItem } from "../services/employerAdapters";

function NotificationAvatar({ children }) {
  return (
    <div className="flex shrink-0 items-center justify-center rounded-lg bg-[#EDE9FE] font-semibold text-[#5B21B6] h-12 w-12 text-sm">
      {children}
    </div>
  );
}

function NotificationTags({ tags }) {
  return (
    <div className="flex items-center gap-2">
      {tags.map((tag, i) => (
        <span
          key={tag.label + i}
          className={`rounded px-2 py-1 text-[12px] leading-[15px] ${tag.className}`}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}

function NotificationItem({ notification }) {
  return (
    <div className="relative border-b border-[#EEE8F6] px-6 py-7">
      <div className="flex items-start gap-3">
        <NotificationAvatar>{notification.avatar}</NotificationAvatar>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-col gap-1">
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
      </div>
    </div>
  );
}

function NotificationTabs({ counts }) {
  return (
    <div className="flex h-[55px] items-center rounded-xl bg-[#F4F4F5] px-4">
      <div className="flex h-[42px] items-center gap-6">
        <button
          type="button"
          className="flex h-[42px] items-center justify-center gap-2 rounded-lg bg-[#FAFAFA] px-3 shadow-[0_0_4px_rgba(0,0,0,0.25)]"
        >
          <span className="text-[16px] font-bold text-[#7C3AED]">All</span>
          <span className="flex h-[19px] min-w-[18px] items-center justify-center rounded-[2px] bg-[#DDD6FE] px-1 text-[12px] font-bold text-[#7C3AED]">
            {counts.all}
          </span>
        </button>
        {counts.job > 0 && (
          <span className="flex h-[42px] items-center gap-2 px-2 text-[16px] text-[#52525B]">
            Jobs
            <span className="flex h-[19px] min-w-[18px] items-center justify-center rounded-[2px] bg-[#E4E4E7] px-1 text-[12px] font-bold text-[#71717A]">
              {counts.job}
            </span>
          </span>
        )}
        {counts.comment > 0 && (
          <span className="flex h-[42px] items-center gap-2 px-2 text-[16px] text-[#52525B]">
            Comments
            <span className="flex h-[19px] min-w-[18px] items-center justify-center rounded-[2px] bg-[#E4E4E7] px-1 text-[12px] font-bold text-[#71717A]">
              {counts.comment}
            </span>
          </span>
        )}
        {counts.application > 0 && (
          <span className="flex h-[42px] items-center gap-2 px-2 text-[16px] text-[#52525B]">
            Applications
            <span className="flex h-[19px] min-w-[18px] items-center justify-center rounded-[2px] bg-[#E4E4E7] px-1 text-[12px] font-bold text-[#71717A]">
              {counts.application}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

export default function EmployerNotifications() {
  const {
    data: rawNotifs = [],
    isLoading,
    isError,
    error,
  } = useEmployerNotifications();
  const markAllRead = useMarkAllNotificationsRead();

  const notifications = useMemo(
    () => rawNotifs.map(toNotificationItem),
    [rawNotifs],
  );

  const counts = useMemo(
    () => ({
      all: notifications.length,
      job: notifications.filter((n) => n.type === "job").length,
      comment: notifications.filter((n) => n.type === "comment").length,
      application: notifications.filter((n) => n.type === "application").length,
    }),
    [notifications],
  );

  return (
    <section className="w-full px-20 py-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-[27px] w-[7px] rounded-[2px] bg-[#7C3AED]" />
          <h1 className="text-[24px] font-semibold leading-[29px] text-[#27272A]">
            Your Notifications
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending || notifications.length === 0}
            className="text-[14px] leading-[17px] text-[#52525B] transition hover:text-[#27272A] disabled:opacity-50"
          >
            {markAllRead.isPending ? "Marking…" : "Mark all as read"}
          </button>
          <Link
            to="/employer"
            className="text-[14px] leading-[17px] text-[#5B21B6] transition hover:underline"
          >
            ← Back to dashboard
          </Link>
        </div>
      </div>

      <NotificationTabs counts={counts} />

      {isError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load notifications: {error?.message ?? "unknown error"}
        </div>
      )}

      <div className="overflow-hidden rounded-b-xl bg-[#FAFAFA]">
        {isLoading && (
          <p className="py-16 text-center text-sm text-zinc-500">
            Loading notifications…
          </p>
        )}
        {!isLoading && notifications.length === 0 && (
          <p className="py-16 text-center text-sm text-zinc-500">
            You're all caught up — no notifications.
          </p>
        )}
        {notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} />
        ))}
      </div>
    </section>
  );
}
