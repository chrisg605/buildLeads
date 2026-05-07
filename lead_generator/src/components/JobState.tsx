"use client"

import UpdateJobState from "@/lib/UpdateJobState"
import { useState, useTransition } from "react";

export default function JobState({ jobId, job_state }: { jobId: number, job_state:string }){
    const [status, setStatus] = useState(job_state);
    const [isPending, startTransition] = useTransition();
    const getStatusClasses = (value: string) => {
      switch (value) {
        case "contacted":
          return "border-sky-200 bg-sky-50 text-sky-700 focus:ring-sky-200";
        case "completed":
          return "border-emerald-200 bg-emerald-50 text-emerald-700 focus:ring-emerald-200";
        default:
          return "border-slate-300 bg-slate-50 text-slate-700 focus:ring-slate-300";
      }
    };

    const getStatusDotClasses = (value: string) => {
      switch (value) {
        case "contacted":
          return "bg-sky-500";
        case "completed":
          return "bg-emerald-500";
        default:
          return "bg-slate-400";
      }
    };

    return <div className="relative inline-block">
      <span
        className={`pointer-events-none absolute left-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${getStatusDotClasses(status)}`}
      />
    
       
         <select name="status" value={status} onChange={e => {
        const value = e.target.value;
          setStatus(value);
          startTransition(async () => {
            await UpdateJobState(jobId, value); // pass value directly, no FormData
          });
          }} disabled={isPending}
    className={`h-10 appearance-none rounded-lg border pl-8 pr-10 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 ${
      getStatusClasses(status)
    } ${isPending ? "cursor-not-allowed opacity-70" : ""}`}>
            <option value="new">New</option>
            <option value="contacted">In Contact</option>
            <option value="completed">Completed</option>
            </select> 
             <svg
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
      clipRule="evenodd"
    />
  </svg>
   </div>
}