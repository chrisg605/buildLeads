// app/pricing/page.tsx
import prisma from "../../../../lib/prisma";
import { GetCustSub } from "@/app/(main)/pricing/functions/getCustSub" 
import { redirect } from 'next/navigation';
import { auth0 } from "@/lib/auth0";
import { Check } from "lucide-react";
import PlanButton from "./components/planButton";

interface Plan {
  name: string;
  price: string;
  description: string;
  credits: number;
  perContact: string;
  productKey: string;
  featured: boolean;
  features: string[];
  tier: number
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: "$15",
    description:
      "Get started finding motivated sellers. Unlock up to 30 owner contacts from recent permits each month.",
    credits: 30,
    perContact: "$0.50",
    productKey: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRODUCT_KEY ?? "basic_monthly",
    featured: false,
    tier: 0,
    features: [
      "30 credits per month, resets on billing date",
      "Unlock owner contacts",
      "Saved filters",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    description:
      "For serious prospectors. Unlock up to 80 owner contacts per month and save your best searches.",
    credits: 80,
    perContact: "$0.36",
    productKey: process.env.NEXT_PUBLIC_STRIPE_PRO_PRODUCT_KEY ?? "pro_monthly",
    featured: true,
    tier: 1,
    features: [
      "80 credits per month, resets on billing date",
      "Unlock owner contacts",
      "High-value permit indicator",
      "Saved filters"
    ],
  },
  {
    name: "Agency",
    price: "$69",
    description:
      "Built for high-volume outreach. Unlock up to 300 owner contacts per month at the lowest rate.",
    credits: 300,
    perContact: "$0.23",
    productKey: process.env.NEXT_PUBLIC_STRIPE_AGENCY_PRODUCT_KEY ?? "agency_monthly",
    featured: false,
    tier: 2,
    features: [
      "300 credits per month, resets on billing date",
      "Unlock owner contacts",
      "Saved filters",
      "High-value permit indicator",
      "Priority support",
    ],
  },
];

function PlanCard({ plan, sub, credits, endDate}: { plan: Plan, sub: number, credits : number, endDate: string}) {
  return (
   <div
  className={`relative flex flex-col rounded-2xl p-7 transition-shadow duration-200 hover:shadow-lg ${
    sub === plan.tier
      ? "border-2 border-blue-500 bg-blue-50 shadow-md"
      : "border border-gray-200 bg-white"
  }`}
>
  {/* Badges */}
  {sub === plan.tier && (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-0.5 text-xs font-medium tracking-wide text-white">
      Current plan
    </div>
  )}
  {plan.featured && sub !== plan.tier && (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-medium tracking-wide text-white">
      Most popular
    </div>
  )}

  {/* Header */}
  <div className="mb-5 space-y-2">
    <p className={`text-xs font-semibold uppercase tracking-widest ${
      sub === plan.tier ? "text-blue-400" : "text-gray-400"
    }`}>
      {plan.name}
    </p>
    <div className="flex items-baseline gap-1">
      <span className={`text-4xl font-semibold tracking-tight ${
        sub === plan.tier ? "text-blue-900" : "text-gray-900"
      }`}>
        {plan.price}
      </span>
      <span className="text-sm text-gray-400">/month</span>
    </div>
    <p className="text-sm leading-relaxed text-gray-500">
      {plan.description}
    </p>
  </div>

  {/* Stats */}
  <div className={`mb-5 flex justify-between rounded-xl px-4 py-3 ${
    sub === plan.tier ? "bg-blue-100" : "bg-gray-50"
  }`}>
    <div className="flex flex-col gap-0.5">
      <span className={`text-[10px] font-semibold uppercase tracking-wider ${
        sub === plan.tier ? "text-blue-400" : "text-gray-400"
      }`}>
        Credits/month
      </span>
      <span className={`text-base font-semibold ${
        sub === plan.tier ? "text-blue-900" : "text-gray-900"
      }`}>
        {plan.credits}
      </span>
    </div>
    <div className="flex flex-col items-end gap-0.5">
      <span className={`text-[10px] font-semibold uppercase tracking-wider ${
        sub === plan.tier ? "text-blue-400" : "text-gray-400"
      }`}>
        Per contact
      </span>
      <span className={`text-base font-semibold ${
        sub === plan.tier ? "text-blue-900" : "text-gray-900"
      }`}>
        {plan.perContact}
      </span>
    </div>
  </div>

  {/* Features */}
  <ul className="mb-6 flex flex-1 flex-col gap-2.5">
    {plan.features.map((feature) => (
      <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-600">
        <Check
          size={14}
          className={"text-blue-500"}
          strokeWidth={2.5}
        />
        {feature}
      </li>
    ))}
  </ul>

  {/* CTA */}
  <form action="/api/checkout" method="POST">
    <input type="hidden" name="product_key" value={plan.productKey} />
    <PlanButton                             
    plan={plan.tier}
    sub={sub}
    periodEndDate={endDate}
    credits={credits}
    name={plan.name}
    planCredits={plan.credits}
    price={plan.price}
    />
  </form>
</div>
  );
}

export default async function PricingPage() {
  const session = await auth0.getSession();
  if (!session){
      redirect('/');
  }
  const user = session?.user;
  let auth_id = "";
  if (user){
      auth_id = user.sub;
  }
  const use = (await GetCustSub(auth_id));
  const sub = use?.next_sub ?? -1;
  const credits = use?.credits ?? 0;
  const endDate = use?.nextSubDate;
  let date_string = ""
  if (endDate){
    date_string = endDate.toLocaleDateString('en-US', {
        timeZone: 'America/Los_Angeles',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
  }
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-20">
      {/* Header */}
      <div className="mx-auto mb-14 max-w-xl text-center">
        <h1 className="mb-3 text-4xl font-semibold tracking-tight text-gray-900">
          Simple, transparent pricing
        </h1>
        <p className="text-base leading-relaxed text-gray-500">
          Pay for what you use. Every plan gives you credits to unlock property
          owner contacts from recent permit data.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} sub={sub} credits={credits} endDate={date_string}/>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-10 text-center text-sm text-gray-400">
        All plans billed monthly · Credits expire at end of billing cycle · Upgrade or downgrade anytime 
      </p>
    </main>
  );
}