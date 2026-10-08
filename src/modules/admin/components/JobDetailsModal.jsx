import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { TypeBadge } from './JobsTable';

export default function JobDetailsModal({
  job,
  onClose,
  onActivate,
  onReject,
  isApproving = false,
  isRejecting = false,
  approveError,
  rejectError,
}) {
  const formatDate = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return String(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const skills = (job?.skills ?? []).map((s, i) => ({
    id: s.id ?? i,
    skill: s.skillname ?? s.name ?? String(s),
  }));

  const jobinfo = [
    { id: 1, title: 'Job Title', info: job?.title ?? '—' },
    { id: 2, title: 'Job posted in:', info: formatDate(job?.submittedAt) },
    { id: 3, title: 'Job expire in:', info: formatDate(job?.expiredate) },
    { id: 4, title: 'Education', info: job?.education ?? '—' },
    { id: 5, title: 'Job Type', info: <TypeBadge type={job?.type ?? 'Fulltime'} /> },
    { id: 6, title: 'Job Level:', info: job?.Level ?? '—' },
    { id: 7, title: 'Offered Salary', info: `${job?.salary ?? '—'}k/month` },
    { id: 8, title: 'Job Location', info: job?.Address ?? '—' },
  ];

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!job) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Job details"
        onClick={(e) => e.stopPropagation()}
        className="flex w-[496px] max-w-full flex-col gap-5 rounded-lg bg-white p-6 shadow-[0_0_4px_rgba(151,71,255,0.24)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2.5">
          <h2 className="text-base font-semibold text-zinc-600">Job Overview</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-zinc-600">
            <FiX size={16} />
          </button>
        </div>

        {/* Summary */}
        <div>
          <div className="grid grid-cols-2 gap-6">
            {jobinfo.map((j) => (
              <div className="flex-gap8" key={j.id}>
                <div className="icon w-8 h-8 rounded-2sm flex-center bg-div-icon">{/* icon kept as in original */}</div>
                <div className="content">
                  <h4 className="text-md font-medium text-text-primary mb-1">{j.title}</h4>
                  <span className="text-sm font-normal text-text-secondary">{j.info}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3>Skills Specialization:</h3>
          <div className="grid grid-cols-3 gap-y-4 mt-3">
            {skills.length === 0 && (
              <p className="col-span-3 text-sm text-zinc-400">No skills listed.</p>
            )}
            {skills.map((m) => (
              <div key={m.id}>
                <span className="badge">{m.skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Error messages */}
        {(approveError || rejectError) && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {approveError && <p>Approve failed: {approveError}</p>}
            {rejectError && <p>Reject failed: {rejectError}</p>}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onActivate(job.id)}
            disabled={isApproving || isRejecting}
            className="h-[42px] flex-1 rounded-xl bg-[#22C55E] text-base font-medium text-white transition hover:bg-[#16A34A] disabled:opacity-60"
          >
            {isApproving ? 'Approving…' : 'Approve Job'}
          </button>
          <button
            type="button"
            onClick={() => onReject(job.id)}
            disabled={isApproving || isRejecting}
            className="h-[42px] flex-1 rounded-xl border border-[#EF4444] text-base font-medium text-[#EF4444] transition hover:bg-red-50 disabled:opacity-60"
          >
            {isRejecting ? 'Rejecting…' : 'Reject job'}
          </button>
        </div>
      </div>
    </div>
  );
}
