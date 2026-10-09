import { useMemo } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBell, HiOutlineFunnel } from "react-icons/hi2";
import {
  useCandidateNotifications,
  useMarkAllCandidateNotificationsRead,
  useMarkCandidateNotificationRead,
} from "../hooks/useCandidateQueries";
import { toNotificationItem } from "../services/candidateAdapters";

function EmptyState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-violet-200/40 blur-2xl" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-300/50">
          <HiOutlineBell className="h-16 w-16 text-white" />
        </div>
      </div>
      <h2 className="mb-3 text-2xl font-bold text-gray-900">
        Nothing right now. Check back later!
      </h2>
      <p className="mb-8 max-w-md text-base text-gray-500">
        This is where we&apos;ll notify you about your job applications and
        other useful information to help you with your job search.
      </p>
      <Link
        to="/candidate/find-jobs"
        className="rounded-full bg-violet-600 px-12 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-violet-700"
      >
        Find Jobs
      </Link>
    </div>
  );
}

function NotificationCard({ item, onMarkRead }) {
  const isSuccess = item.type === "application_accepted" || item.type === "accepted";
  const isDanger = item.type === "application_rejected" || item.type === "rejected";

  const titleColor = isSuccess
    ? "text-emerald-600"
    : isDanger
      ? "text-red-500"
      : "text-gray-900";
  const dotColor = isSuccess
    ? "bg-emerald-500"
    : isDanger
      ? "bg-red-500"
      : "bg-gray-400";
  const bubbleBg = isSuccess
    ? "bg-emerald-50"
    : isDanger
      ? "bg-red-50"
      : "bg-gray-50";
  const pillCls = isSuccess
    ? "bg-emerald-100 text-emerald-700"
    : isDanger
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700";
  const pillLabel = isSuccess ? "Accepted" : isDanger ? "Reject" : "System";

  return (
    <li className="relative pl-6">
      <span
        className={`absolute left-0 top-2 h-3 w-3 rounded-full ${dotColor}`}
      />
      <span className="absolute left-[5px] top-6 h-[calc(100%-1rem)] w-px bg-gray-200" />

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-900 text-xs font-bold text-white">
            {(item.name ?? "J4").slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className={`truncate text-sm font-semibold ${titleColor}`}>
              {item.name}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {item.tags?.includes("Software House") && (
                <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                  Software House
                </span>
              )}
              {item.tags?.includes("Full-Time") && (
                <span className="rounded bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700">
                  Full-Time
                </span>
              )}
              {!item.tags?.length && (
                <span className="text-[10px] text-gray-400">{item.type}</span>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-400">{item.time}</span>
        </div>

        <div className={`rounded-xl ${bubbleBg} p-3`}>
          <span
            className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${pillCls}`}
          >
            {pillLabel}
          </span>
          <p className="text-sm leading-relaxed text-gray-700">{item.message}</p>
        </div>

        {!item._raw?.read && (
          <button
            type="button"
            onClick={() => onMarkRead(item.id)}
            className="mt-3 text-xs font-medium text-violet-600 hover:underline"
          >
            Mark as read
          </button>
        )}
      </div>
    </li>
  );
}

export default function CandidateNotifications() {
  const { data: rawNotifs = [], isLoading, isError, error } = useCandidateNotifications();
  const markAllRead = useMarkAllCandidateNotificationsRead();
  const markOneRead = useMarkCandidateNotificationRead();

  const items = useMemo(() => rawNotifs.map(toNotificationItem), [rawNotifs]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-7 w-1.5 rounded-full bg-violet-600" />
          <h1 className="text-2xl font-bold text-gray-900">Your Notification</h1>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending || items.length === 0}
            className="text-sm italic text-gray-500 hover:text-violet-600 disabled:opacity-50"
          >
            Mark all as read
          </button>
        )}
      </div>

      {items.length > 0 && (
        <div className="mb-6 flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200"
          >
            All
            <HiOutlineFunnel className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      )}

      {isLoading && (
        <p className="py-12 text-center text-sm text-gray-500">
          Loading notifications…
        </p>
      )}
      {isError && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error?.message ?? "Failed to load notifications."}
        </div>
      )}
      {!isLoading && !isError && items.length === 0 && <EmptyState />}
      {!isLoading && !isError && items.length > 0 && (
        <ul className="space-y-4">
          {items.map((item) => (
            <NotificationCard
              key={item.id}
              item={item}
              onMarkRead={(id) => markOneRead.mutate(id)}
            />
          ))}
        </ul>
      )}

      <div className="mt-8 text-sm">
        <Link to="/candidate" className="text-violet-600 hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
