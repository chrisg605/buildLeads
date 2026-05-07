'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SidebarLinks from './SidebarLinks';
import Link from 'next/link';

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
    
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
      >
        <svg
          xmlns="https://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] border-r border-slate-200 bg-white transition-transform duration-200 md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path
                    d="M4.5 18.5v-8.25L12 4.75l7.5 5.5v8.25"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 18.5V13M12 18.5V11M16 18.5V9"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="sr-only">BuildLeads</span>
              </div>

              <div className="flex flex-col leading-tight">
                <p className="text-sm font-semibold text-slate-900">BuildLeads</p>
                <p className="text-xs text-slate-500">Lead management</p>
              </div>
            </Link>
          </div>
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <svg
              xmlns="https://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Workspace
          </p>

          <div className="mt-3">
            <SidebarLinks onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </aside>
    </>
  );
}