import prisma from "../../lib/prisma"; 
import { auth0 } from "@/lib/auth0";
import JobState from "./JobState";
import { redirect } from 'next/navigation';
import ListJob from "./listJob";
import UnlockContact from "@/app/(main)/dashboard/components/unlockContact";
import Link from 'next/link'
import { GetCustSub } from "@/app/(main)/pricing/functions/getCustSub";
import { JobCheckbox } from "./updateSaved";


export default async function Db_rows({ searchParams }: { searchParams: any}){
    let { start_date, end_date, saved, cities, status} = await searchParams as {
  start_date?: string;
  end_date?: string;
  saved?: string;
  cities?: string;
  status?: string;
};
    const session = await auth0.getSession();
    if (!session){
        redirect('/');
    }
    const user = session?.user;
    let auth_id = "";
    if (user){
        auth_id = user.sub;
    }
    const sub = (await GetCustSub(auth_id));

    if (!start_date) {
        const date = new Date();
        date.setDate(date.getDate() - 7);//get jobs from 7 days ago
        start_date = date.toISOString();
    }
    else {
        start_date += "T00:00:00.00Z"
    }
    let cities_array:string[] = []; 
    if (cities && cities != "All"){
        cities_array = cities.split(",");
    }
    if (end_date){
        end_date += "T00:00:00.00Z";
    }
    
    const jobs = await prisma.jobs.findMany({//gets the jobs for the dashboard
        where: {
            AND: [
                {
                    issued_date: { gte: start_date },
                },
                {
                    issued_date: { lte: end_date },
                },
                ...(cities_array.length  > 0 ? [{ city: { in: cities_array } }] : []),
            ],
            ...((status && (status != "all")) || saved ? {user_jobs: {//3 dots allows condition checking
                some: {
                    user_id: sub?.id,
                    ...(saved ? {saved: true} : {}),
                    ...((status != "all") ? {job_state: status} : {}),                     
                }
            }} : {})

            
        },
        include: {user_jobs: {
            where: { user_id: sub?.id }, // 👈 only return current user's record
            },
            contacts: 
            {
                include: {
                contact_methods: true
                }
            }
        },
        orderBy : [
            {
                issued_date: "desc"
            },
            {
                id: "desc",
            }
        ]
    });

    const formatCurrency = (value: number | string | null | undefined) => {
  const amount = Number(value);

  return Number.isFinite(amount)
    ? amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      })
    : "—";
};

const formatDate = (value: string | Date | null | undefined) => {
  const date = value ? new Date(value) : null;

  return date && !Number.isNaN(date.getTime())
    ? date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";
};
return <>
{jobs.length === 0 ? (
  <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
    <h2 className="text-base font-semibold text-slate-900">No jobs found</h2>
    <p className="mt-2 text-sm text-slate-500">
      Try adjusting your filters to see more results.
    </p>
  </div> 
) : (
  <>
    {/* Mobile cards */}
    <div className="space-y-4 md:hidden">
      {jobs.map((job: any) => {
        const userJob = job.user_jobs[0];
        const isPriority =
          (!job.contractor || job.contractor === "OWNER/BUILDER") &&
          (sub?.subscription ?? -1) > 0;

        const priorityLabel = !job.contractor
          ? "No contractor listed"
          : "Owner / builder";

        return (
          <article
            key={job.id}
            className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${
              isPriority
                ? "border-amber-300 ring-1 ring-amber-200"
                : "border-slate-200"
            }`}
          >
            <div className={`h-1 w-full ${isPriority ? "bg-amber-500" : "bg-slate-200"}`} />

            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <label className="inline-flex items-start gap-3">
                  <JobCheckbox
                    jobId={job.id}
                    address={job.address}
                    isSelected={userJob?.saved ?? false}
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Est. cost
                    </p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
                      {formatCurrency(job.estimated_cost)}
                    </p>
                  </div>
                </label>

                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Issued
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-600 tabular-nums">
                    {formatDate(job.issued_date)}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Address
                </p>
                <p className="mt-1 text-base font-medium text-slate-900">
                  {job.address}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {job.city ?? "—"}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  Construction
                </span>

                {isPriority && (
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                    {priorityLabel}
                  </span>
                )}
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Contact
                  </p>

                  {userJob?.contacted ? (
                    <ListJob
                      jobId={job.id}
                      contacts={job.contacts}
                      address={job.address}
                      city={job.city}
                      traced={job.traced}
                    />
                  ) : (
                    <UnlockContact
                      jobId={job.id}
                      traced={job.traced}
                      address={job.address}
                      city={job.city}
                      count={job.contacts?.length ?? 0}
                    />
                  )}
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Status
                  </p>

                  <JobState
                    jobId={job.id}
                    job_state={userJob?.job_state ?? "all"}
                  />
                </div>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <Link
                  href={`/dashboard/${job.id}`}
                  className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                >
                  Open job
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="currentColor"
                    className="ml-2 size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>

    {/* Desktop table */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                <th className="w-12 px-4 py-3">
                  <span className="sr-only">Select</span>
                </th>
                <th className="px-4 py-3">Est. Cost</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Issued</th>
                <th className="w-16 px-4 py-3 text-right">Open</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {jobs.map((job: any) => {
                const userJob = job.user_jobs[0];
                const isPriority =
                  (!job.contractor || job.contractor === "OWNER/BUILDER") &&
                  (sub?.subscription ?? -1) > 0;

                const priorityLabel = !job.contractor
                  ? "No contractor listed"
                  : "Owner / builder";

                return (
                  <tr
                    key={job.id}
                    className={`transition-colors duration-150 ${
                      isPriority
                        ? "bg-amber-50/40 hover:bg-amber-50/70"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td
                      className={`w-12 border-l-4 px-4 py-4 align-middle ${
                        isPriority ? "border-amber-500" : "border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <JobCheckbox
                          jobId={job.id}
                          address={job.address}
                          isSelected={userJob?.saved ?? false}
                        />
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 align-middle text-right font-semibold tabular-nums text-slate-900">
                      {formatCurrency(job.estimated_cost)}
                    </td>

                    <td className="max-w-[320px] px-4 py-4 align-middle">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900" title={job.address}>
                          {job.address}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {job.city ?? "—"}
                        </p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 align-middle">
                      {userJob?.contacted ? (
                        <ListJob
                          jobId={job.id}
                          contacts={job.contacts}
                          address={job.address}
                          city={job.city}
                          traced={job.traced}
                        />
                      ) : (
                        <UnlockContact
                          jobId={job.id}
                          traced={job.traced}
                          address={job.address}
                          city={job.city}
                          count={job.contacts?.length ?? 0}
                        />
                      )}
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          Construction
                        </span>

                        {isPriority && (
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                            {priorityLabel}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 align-middle">
                      <JobState
                        jobId={job.id}
                        job_state={userJob?.job_state ?? "all"}
                      />
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 align-middle tabular-nums text-slate-600">
                      {formatDate(job.issued_date)}
                    </td>

                    <td className="px-4 py-4 align-middle text-right">
                      <Link
                        href={`/dashboard/${job.id}`}
                        aria-label={`Open job at ${job.address}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.75}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>

)}</>}