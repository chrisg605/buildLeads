'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/settings', label: 'Settings' },
];

type SidebarLinksProps = {
  onNavigate?: () => void;
};

export default function SidebarLinks({ onNavigate }: SidebarLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span
              className={`mr-3 h-2 w-2 rounded-full transition-colors ${
                isActive
                  ? 'bg-white'
                  : 'bg-slate-300 group-hover:bg-slate-500'
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}