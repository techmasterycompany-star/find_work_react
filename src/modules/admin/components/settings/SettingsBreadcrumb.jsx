// =====================================================================
// SettingsBreadcrumb — "Setting > Account" navigation trail
// ---------------------------------------------------------------------
// Pure presentational. `items` is an array of { label, to? }. The last
// item is rendered in purple (current page). Items with a `to` are
// clickable links; the last item is always plain text.
// =====================================================================

import { Link } from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi2';

export default function SettingsBreadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1.5 text-[12px] leading-[15px]">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <HiOutlineChevronRight className="h-3 w-3 text-[#A1A1AA]" />}
            {isLast || !item.to ? (
              <span className={isLast ? 'font-medium text-[#7C3AED]' : 'text-[#52525B]'}>
                {item.label}
              </span>
            ) : (
              <Link
                to={item.to}
                className="text-[#52525B] transition hover:text-[#7C3AED]"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
