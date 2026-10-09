import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBell } from "react-icons/hi2";
import {
  useCandidateNotifications,
} from "../hooks/useCandidateQueries";
import { toNotificationItem } from "../services/candidateAdapters";

export default function CandidateNotificationsBell() {
  const [open, setOpen] = useState(false);
  const { data: rawNotifs = [], isLoading, isError } = useCandidateNotifications();

  const notifications = rawNotifs.slice(0, 5).map(toNotificationItem);
  const unreadCount = rawNotifs.filter(
    (n) => !(n.read === true || n.read_at || n.isRead === true)
  ).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100"
      >
        <HiOutlineBell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-12 z-50 w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-zinc-100 bg-white p-3 shadow-xl">
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-sm font-semibold text-zinc-900">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-700">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="mt-1 max-h-80 overflow-y-auto">
              {isLoading && (
                <p className="px-3 py-6 text-center text-sm text-zinc-500">
                  Loading notifications…
                </p>
              )}
              {isError && (
                <p className="px-3 py-6 text-center text-sm text-red-500">
                  Failed to load notifications.
                </p>
              )}
              {!isLoading && !isError && notifications.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-zinc-500">
                  You have no notifications yet.
                </p>
              )}
              {!isLoading &&
                !isError &&
                notifications.map((n) => (
                  <Link
                    key={n.id}
                    to="/candidate/notifications"
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-zinc-50"
                  >
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full`}
                      style={{ backgroundColor: n.dotColor }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-zinc-900">
                        {n.name}
                      </p>
                      <p className="truncate text-xs text-zinc-500">
                        {n.message}
                      </p>
                    </div>
                    <span className="text-[10px] text-zinc-400">{n.time}</span>
                  </Link>
                ))}
            </div>

            <div className="mt-2 border-t border-zinc-100 pt-2">
              <Link
                to="/candidate/notifications"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-violet-700 hover:bg-violet-50"
              >
                View all notifications
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
