import Link from 'next/link'
import SidebarLinks from './SidebarLinks';

export default function DesktopSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white md:flex md:flex-col">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <Link href="/">
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
          </Link>

          <div>
            <p className="text-sm font-semibold text-slate-900">BuildLeads</p>
            <p className="text-xs text-slate-500">Lead management</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          Workspace
        </p>

        <div className="mt-3">
          <SidebarLinks />
        </div>
      </div>
    </aside>
  );
}