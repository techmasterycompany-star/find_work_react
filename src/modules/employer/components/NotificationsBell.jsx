import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBell } from "react-icons/hi";
import { useEmployerNotifications } from "../hooks/useEmployerQueries";
import { toNotificationItem } from "../services/employerAdapters";

export default function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const {
    data: rawNotifs = [],
    isLoading,
    isError,
  } = useEmployerNotifications();

  const notifications = rawNotifs.slice(0, 5).map(toNotificationItem);
  const unreadCount = rawNotifs.length;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
        className="relative h-12 w-12 rounded-xl flex items-center justify-center text-zinc-600 hover:bg-zinc-100"
      >
        <HiOutlineBell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-violet-600" />
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown panel */}
          <div className="absolute right-0 top-14 w-96 rounded-xl border border-zinc-200 bg-white shadow-lg overflow-hidden z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
              <span className="text-sm font-semibold text-zinc-900">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="text-xs text-zinc-400">{unreadCount} new</span>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {isLoading && (
                <p className="px-4 py-8 text-center text-sm text-zinc-400">
                  Loading…
                </p>
              )}
              {isError && (
                <p className="px-4 py-8 text-center text-sm text-red-500">
                  Failed to load notifications
                </p>
              )}
              {!isLoading && !isError && notifications.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-zinc-400">
                  You're all caught up
                </p>
              )}
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 px-4 py-3 border-b border-zinc-50 hover:bg-zinc-50"
                >
                  <div className="flex shrink-0 items-center justify-center rounded-lg bg-violet-100 h-9 w-9 text-xs font-semibold text-violet-700">
                    {n.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-800 line-clamp-2">
                      <span className="font-medium">{n.name}:</span> {n.message}
                    </p>
                    <span className="text-xs text-zinc-400">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/employer/notifications"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-center text-sm font-semibold text-violet-600 hover:bg-violet-50 border-t border-zinc-100"
            >
              View all notifications
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
