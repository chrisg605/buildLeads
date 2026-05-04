import addContact from "@/app/(main)/dashboard/lib/addContact";

export default async function ListJob({contacts, address, city, jobId, traced}: {contacts:any, address:string, city:string, jobId:number, traced:boolean}){
    if (contacts.length == 0 && !traced){
        await addContact(address, city, jobId);
    }
    else if (contacts.length == 0){
        return <>
            <h2>No available Contact</h2>
        </>
    }
    else if (contacts.length >= 1){
        let contact_value = "";
        let method = "";

        // first find owner contact
        const ownerContact = contacts.find((contact: any) => contact.owner);
        const targetContact = ownerContact ?? contacts[0]; // fallback to first contact

        // prefer phone over email
        const phone = targetContact?.contact_methods?.find((cm: any) => cm.type === "phone");
        const email = targetContact?.contact_methods?.find((cm: any) => cm.type === "email");

        if (phone) {
        contact_value = phone.value;
        method = "phone";
        } else if (email) {
        contact_value = email.value;
        method = "email";
        }
        const displayName = targetContact?.name?.trim() || "Primary contact";
const phoneValue = phone?.value?.trim() ?? "";
const emailValue = email?.value?.trim() ?? "";

const phoneHref = phoneValue
  ? `tel:${phoneValue.replace(/[^\d+]/g, "")}`
  : "";
const emailHref = emailValue ? `mailto:${emailValue}` : "";

const visibleMethods = [phoneValue, emailValue].filter(Boolean).length;
const extraMethods = Math.max(
  (targetContact?.contact_methods?.length ?? 0) - visibleMethods,
  0
);

const extraContacts = Math.max((contacts?.length ?? 0) - 1, 0);

if (!targetContact || (!phoneValue && !emailValue)) {
  return <span className="text-sm text-slate-400">No contact info</span>;
}

return (
  <div className="min-w-0 max-w-[280px]">
    <div className="flex items-center gap-2">
      <p className="truncate text-sm font-medium text-slate-900">
        {displayName}
      </p>

      {extraContacts > 0 ? (
        <span className="inline-flex shrink-0 items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          +{extraContacts} more
        </span>
      ) : extraMethods > 0 ? (
        <span className="inline-flex shrink-0 items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          +{extraMethods} method{extraMethods === 1 ? "" : "s"}
        </span>
      ) : null}
    </div>

    <div className="mt-2 flex flex-wrap gap-2">
      {phoneValue && (
        <a
          href={phoneHref}
          title={phoneValue}
          aria-label={`Call ${displayName} at ${phoneValue}`}
          className="inline-flex min-w-0 max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
        >
          <span className="shrink-0 text-slate-400">Call</span>
          <span className="truncate">{phoneValue}</span>
        </a>
      )}

      {emailValue && (
        <a
          href={emailHref}
          title={emailValue}
          aria-label={`Email ${displayName} at ${emailValue}`}
          className="inline-flex min-w-0 max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
        >
          <span className="shrink-0 text-slate-400">Email</span>
          <span className="truncate">{emailValue}</span>
        </a>
      )}
    </div>
  </div>
);
    }
    
}

