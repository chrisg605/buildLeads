"use client"
import HandleContact from "./handleContact";


export default function UnlockContact({jobId, traced, address, city, count} : {jobId: number, traced:boolean, address:string, city: string, count: number}) {
    
    return <>
            <button onClick={() => HandleContact(jobId, traced, address, city, count) } className="bg-blue-600 text-white px-2 py-1 rounded text-xs m-2">
            🔒 Unlock contact
            </button>
    </>
}   