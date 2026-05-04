import prisma from "../../../../../lib/prisma";
import { getCustomUserId } from "@/lib/getUser"; 
import { auth0 } from "@/lib/auth0";
import { redirect } from 'next/navigation';
import { ContactButton } from "../components/contactButton";


export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ job: string }>
}) {

  const session = await auth0.getSession();
  if (!session){
      redirect('/');
  }
  const user = session?.user;
  let auth_id = "";
  if (user){
      auth_id = user.sub;
  }
  const {job} = (await params)
  const id = (await getCustomUserId(auth_id)) ?? 0;
  const jobData = await prisma.jobs.findUnique({//gets the jobs for the dashboard
        where: {
          id: parseInt(job, 10)  
        },
        include: {user_jobs: true, 
            contacts: 
            {
                include: {
                contact_methods: true
                }
            }
        },
    });
  if (!jobData) return <div>Job not found</div>;

  const userJob = jobData.user_jobs[0];
  const hasContacted = userJob?.contacted;
  const owner = jobData.contacts.find(c => c.owner);
  const otherContacts = jobData.contacts.filter(c => !c.owner);

  const stateStyles: Record<string, string> = {
    'All': 'bg-gray-100 text-gray-600',
    'In Contact': 'bg-blue-50 text-blue-600',
    'Completed': 'bg-green-50 text-green-700',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 m-2">{jobData.job_name}</h1>
            <p className="text-sm text-gray-500 mt-1">{jobData.address} · {jobData.city}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${stateStyles[userJob?.job_state] ?? 'bg-gray-100 text-gray-600'}`}>
              {userJob?.job_state ?? 'Unknown'}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {jobData.job_type}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Estimated cost', value: `$${jobData.estimated_cost.toLocaleString()}` },
          { label: 'Issued date', value: new Date(jobData.issued_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
          { label: 'Job type', value: jobData.job_type },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
            <p className="text-base font-semibold text-gray-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Contractor + Description */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Contractor</p>
          <p className="text-base font-semibold text-gray-900">{jobData.contractor}</p>
          <p className="text-sm text-gray-500 mt-1">License #{jobData.contractor_license}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Description</p>
          <p className="text-sm text-gray-600 leading-relaxed">{jobData.job_description}</p>
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Contacts</p>
          {!hasContacted && (
            <ContactButton
              jobId={jobData.id}
              traced={jobData.traced}
              address={jobData.address}
              city={jobData.city}
              count={jobData.contacts.length}
            />
          )}
        </div>

        {hasContacted ? (
          <div className="divide-y divide-gray-100">
            {owner && <ContactCard contact={owner} />}
            {otherContacts.map(contact => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">Contact info locked</p>
            <p className="text-xs text-gray-400 mt-1">Mark this job as contacted to unlock contact details</p>
          </div>
        )}
      </div>

    </div>
  );
}

// Contact card
const ContactCard = ({ contact }: { contact: any }) => {
  const initials = contact.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() ?? '?';
  const phones = contact.contact_methods.filter((m: any) => m.type === 'phone');
  const emails = contact.contact_methods.filter((m: any) => m.type === 'email');

  return (
    <div className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-sm font-medium text-blue-600 flex-shrink-0">
        {initials}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900">{contact.name}</p>
          {contact.owner && (
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">Owner</span>
          )}
        </div>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {phones.map((m: any) => (
            <a key={m.id} href={`tel:${m.value}`} className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100">
              📞 {m.value}
            </a>
          ))}
          {emails.map((m: any) => (
            <a key={m.id} href={`mailto:${m.value}`} className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100">
              ✉️ {m.value}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};