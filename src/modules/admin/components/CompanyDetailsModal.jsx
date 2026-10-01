import { useEffect } from "react";
import {
  FiBriefcase,
  FiDownload,
  FiFileText,
  FiPhone,
  FiShield,
  FiX,
} from "react-icons/fi";
import { CompanyLogo, StatusBadge } from "./CompaniesTable";

export default function CompanyDetailsModal({
  company,
  onClose,
  onActivate,
  onReject,
}) {
  // Close on Esc + lock body scroll while open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!company) return null;
  const { details, documents } = company;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Company details"
        onClick={(e) => e.stopPropagation()}
        className="flex w-[496px] max-w-full flex-col gap-5 rounded-lg bg-white p-6 shadow-[0_0_4px_rgba(151,71,255,0.24)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2.5">
          <h2 className="text-base font-semibold text-zinc-600">
            Company Details
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-zinc-600">
            <FiX size={16} />
          </button>
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <CompanyLogo company={company} size={61} />
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start justify-between">
                <span className="text-base text-zinc-800">{company.name}</span>
                <StatusBadge status={company.status} />
              </div>
              <span className="text-xs text-zinc-600">{company.email}</span>
              <span className="flex items-center gap-1 text-xs text-zinc-600">
                <FiPhone size={14} className="text-[#7C3AED]" />
                {company.phone}
              </span>
            </div>
          </div>
          <p className="text-sm leading-[150%] text-zinc-600">
            {company.description}
          </p>
        </div>

        {/* Company information */}
        <section className="rounded-lg border border-zinc-200 p-6">
          <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-800">
            <FiBriefcase size={16} className="text-[#7C3AED]" />
            Company Information
          </h3>
          <dl className="mt-5 grid grid-cols-[110px_1fr] gap-x-4 gap-y-3">
            <dt className="text-xs font-medium text-zinc-600">Industry</dt>
            <dd className="text-sm text-zinc-800">{details.industry}</dd>
            <dt className="text-xs font-medium text-zinc-600">Company Size</dt>
            <dd className="text-sm text-zinc-800">{details.size}</dd>
            <dt className="text-xs font-medium text-zinc-600">Website</dt>
            <dd className="text-sm text-[#7C3AED]">{details.website}</dd>
            <dt className="text-xs font-medium text-zinc-600">Location</dt>
            <dd className="text-sm text-zinc-800">{details.location}</dd>
          </dl>
        </section>

        {/* Verification documents */}
        <section className="rounded-lg border border-zinc-200 p-6">
          <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-800">
            <FiShield size={16} className="text-[#7C3AED]" />
            Verification Documents
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex h-12 items-center justify-between rounded-lg bg-white px-4 shadow-[0_0_4px_rgba(0,0,0,0.25)]"
              >
                <span className="flex items-center gap-2 text-sm text-zinc-600">
                  <FiFileText size={18} className="text-zinc-500" />
                  {doc.name}
                </span>
                <a
                  href={doc.url}
                  download
                  aria-label={`Download ${doc.name}`}
                  className="text-[#7C3AED]"
                >
                  <FiDownload size={18} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onActivate(company.id)}
            className="h-[42px] flex-1 rounded-xl bg-[#22C55E] text-base font-medium text-white transition hover:bg-[#16A34A]"
          >
            Activate
          </button>
          <button
            type="button"
            onClick={() => onReject(company.id)}
            className="h-[42px] flex-1 rounded-xl border border-[#EF4444] text-base font-medium text-[#EF4444] transition hover:bg-red-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}