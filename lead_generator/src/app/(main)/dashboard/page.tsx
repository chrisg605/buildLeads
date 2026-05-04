import Form from 'next/form'
import { Suspense } from 'react'
import Db_rows from "@/components/db_rows"
import FilterProjects from "@/lib/filterProjects"
import Checkbox from "@/components/checkbox"
import LoadingState from "@/components/loadingState"
import { GetCustSub } from "@/app/(main)/pricing/functions/getCustSub";
import { auth0 } from "@/lib/auth0";
import { redirect } from 'next/navigation';

export default async function Dashboard({ searchParams,
}: {searchParams: {
    status?: string;
    start_date?: string;
    end_date?: string;
    cities?: string;
    favorite?: string;};}
){

const session = await auth0.getSession();
    if (!session){
        redirect('/');
    }
    const user = session?.user;
    let auth_id = "";
    if (user){
        auth_id = user.sub;
    }
    const our_user = (await GetCustSub(auth_id));
    const displayName =
  typeof our_user?.name === "string" && our_user.name.trim().length > 0
    ? our_user.name.trim()
    : null;

const creditsValue = Number(our_user?.credits ?? 0);
const credits = Number.isFinite(creditsValue) ? creditsValue : 0;
    
    return (
    <>
        <div className="flex flex-col w-full">
            <div className="flex w-full flex-col gap-6">
  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm md:px-6">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">
          {displayName ? `Welcome back, ${displayName}` : "Welcome back"}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Review leads, update statuses, and narrow results with filters.
        </p>
      </div>

      <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
          Credits
        </p>
        <div className="mt-1 flex items-end gap-2">
          <span className="text-2xl font-semibold text-slate-900">
            {credits}
          </span>
          <span className="pb-1 text-sm text-slate-500">available</span>
        </div>
      </div>
    </div>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
    <div>
      <h2 className="text-base font-semibold text-slate-900">
        Filter projects
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Narrow results by date, status, city, or saved jobs.
      </p>
    </div>

    <form action={FilterProjects} className="mt-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Date range
          </label>

          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center">
            <input
              name="start_date"
              type="date"
              className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />

            <span className="text-center text-sm font-medium text-slate-500">
              to
            </span>

            <input
              name="end_date"
              type="date"
              className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        <div className="xl:col-span-3">
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Job state
          </label>

          <select
            id="status"
            name="status"
            defaultValue="all"
            className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          >
            <option value="all">All</option>
            <option value="contacted">In Contact</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Cities
          </label>
          <Checkbox />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <label
          htmlFor="favorite"
          className="inline-flex w-fit cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
        >
          <input
            type="checkbox"
            id="favorite"
            name="favorite"
            value="saved"
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
          />
          Saved only
        </label>

        <button
          className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
          type="submit"
        >
          Apply filters
        </button>
      </div>
    </form>
  </div>
           
                    <Suspense fallback={<LoadingState />}>
                        <Db_rows searchParams={searchParams}/>
                    </Suspense>

                
            </div>
        </div>
        
    </>
    )
}