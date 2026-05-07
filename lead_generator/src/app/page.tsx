import Link from "next/link";
import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import { auth0 } from "@/lib/auth0";

export const metadata: Metadata = {
  title: "BuildLeads — Marin County Permit Leads for Contractors",
  description:
    "BuildLeads turns Marin County permit data into real leads with phone, email, and address — so you can reach the right person before anyone else.",
};

const plans = [
  {
    name: "Starter",
    price: "$15",
    credits: "30 credits / month",
    cpp: "$0.50 per contact unlock",
    features: ["Full permit feed", "Contact unlocks", "Save jobs", "City filters"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    credits: "80 credits / month",
    cpp: "$0.36 per contact unlock",
    features: [
      "Everything in Starter",
      "Owner/builder flag",
      "Priority job feed",
      "Status tracking",
    ],
    featured: true,
  },
  {
    name: "Agency",
    price: "$69",
    credits: "300 credits / month",
    cpp: "$0.23 per contact unlock",
    features: [
      "Everything in Pro",
      "More Credits",
      "Priority support",
    ],
    featured: false,
  },
];

const features = [
  {
    title: "Direct contact info",
    desc: "Unlock phone, email, and address for every permit owner using your monthly credits.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#378ADD] fill-none stroke-[1.8]">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Live permit feed",
    desc: "Browse current Marin County permits filtered by date range, city, and job type.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#378ADD] fill-none stroke-[1.8]">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: "Owner/builder flag",
    desc: "Instantly spot permits with no contractor — your best shot at a direct client relationship.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#378ADD] fill-none stroke-[1.8]">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "Save and track jobs",
    desc: "Bookmark leads and follow their status as you work through your pipeline.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#378ADD] fill-none stroke-[1.8]">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    text: "I unlocked three contacts on my first day and booked a quote by the end of the week. Nothing else comes close.",
    author: "Dave M.",
    role: "Electrical contractor, San Rafael",
  },
  {
    text: "The owner/builder flag is a game changer. Those jobs are so much easier to land than ones already tied to a GC.",
    author: "Sarah K.",
    role: "Plumber, Mill Valley",
  },
  {
    text: "I was cold calling for hours every week. Now I just filter, unlock, and call. My pipeline has never been this full.",
    author: "Tom R.",
    role: "Carpentry subcontractor, Novato",
  },
];

const CheckIcon = () => (
  <span className="w-3.5 h-3.5 rounded-full bg-[#E6F1FB] flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-2 h-2 stroke-[#378ADD] fill-none stroke-[2.5]">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

// All static data, all server-rendered — zero JS sent for these sections
export default async function LandingPage() {
  const session = await auth0.getSession();
  const user = session?.user;
  const link = user ? "/dashboard" : "/api/auth/login?returnTo=/dashboard";
  return (
    <div className="font-sans text-[#1a2e42] bg-white">

      <nav className="flex items-center justify-between px-4 md:px-8 py-[14px] border-b border-[#ddeaf6] bg-white sticky top-0 z-10">
      {/* Logo */}
      <span className="text-[17px] font-medium text-[#185FA5]">
        BuildLeads
      </span>
 
      {/* Nav Links - hidden on mobile */}
      <div className="hidden md:flex items-center gap-6">
        <a
          href="#features"
          className="text-[13px] text-[#1a2e42] font-medium hover:text-[#185FA5]"
        >
          Features
        </a>
        <a
          href="#pricing"
          className="text-[13px] text-[#1a2e42] font-medium hover:text-[#185FA5]"
        >
          Pricing
        </a>
        <a
          href="#faq"
          className="text-[13px] text-[#1a2e42] font-medium hover:text-[#185FA5]"
        >
          FAQ
        </a>
      </div>
 
      {/* Buttons */}
      <div className="flex gap-2">
        <Link
          href={link}
          className="text-[13px] font-medium text-[#1a2e42] border-[1.5px] border-[#1a2e42] px-4 md:px-5 py-2 rounded-lg hover:bg-[#f7fafd] hover:border-[#185FA5] hover:text-[#185FA5] transition-all whitespace-nowrap"
        >
          Log in
        </Link>
        <Link
          href={link}
          className="text-[13px] font-medium text-white bg-[#378ADD] border-[1.5px] border-[#378ADD] px-4 md:px-5 py-2 rounded-lg hover:bg-[#185FA5] hover:border-[#185FA5] transition-all whitespace-nowrap"
        >
          Get started
        </Link>
      </div>
    </nav>

      {/* ── Hero ── */}
      <section className="bg-[#f7fafd] border-b border-[#ddeaf6] px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-1.5 bg-[#E6F1FB] border border-[#B5D4F4] rounded-full px-3 py-1 text-xs text-[#185FA5] font-medium mb-5">
          <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[#378ADD] fill-none stroke-2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Now serving Marin County · More regions coming soon
        </div>
        <h1 className="text-[36px] font-medium text-[#185FA5] leading-snug max-w-[560px] mx-auto mb-4">
          Get the contact behind every Marin County permit
        </h1>
        <p className="text-[15px] text-[#3a5570] max-w-[440px] mx-auto mb-8 leading-relaxed">
          BuildLeads turns raw permit data into real leads — complete with phone, email, and address
          — so you can reach the right person before anyone else does.
        </p>
        <Link
          href={link}
          className="inline-block bg-[#378ADD] text-white text-sm font-medium px-7 py-2.5 rounded-lg hover:bg-[#185FA5] transition-colors"
        >
          Start finding leads
        </Link>

        {/* Contact preview card — fully static, no JS */}
        <div className="mt-12 mx-auto max-w-[320px] bg-white border border-[#B5D4F4] rounded-2xl p-5 text-left shadow-[0_2px_12px_rgba(55,138,221,0.08)]">
          <p className="text-[11px] text-[#378ADD] font-semibold uppercase tracking-wider mb-3">
            Permit contact unlocked
          </p>
          {(
            [
              {
                type: "Phone",
                val: "(415) 555-0192",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#378ADD] fill-none stroke-[1.8]">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                  </svg>
                ),
              },
              {
                type: "Email",
                val: "t.harris@harrisbuild.com",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#378ADD] fill-none stroke-[1.8]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
              },
              {
                type: "Address",
                val: "22 Throckmorton Ave, Mill Valley",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#378ADD] fill-none stroke-[1.8]">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
              },
            ] as const
          ).map((row) => (
            <div
              key={row.type}
              className="flex items-center gap-2.5 py-2 border-b border-[#E8F2FB] last:border-b-0"
            >
              <div className="w-[30px] h-[30px] rounded-lg bg-[#E6F1FB] flex items-center justify-center shrink-0">
                {row.icon}
              </div>
              <div>
                <p className="text-[11px] text-[#8AAFC8] font-medium mb-0.5">{row.type}</p>
                <p className="text-[13px] text-[#1a2e42] font-medium">{row.val}</p>
              </div>
            </div>
          ))}
          <div className="inline-flex items-center gap-1.5 bg-[#E6F1FB] border border-[#B5D4F4] rounded-lg px-2.5 py-1 text-[11px] text-[#185FA5] font-medium mt-3">
            <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[#378ADD] fill-none stroke-2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            1 credit used
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="bg-white border-b border-[#ddeaf6] px-8 py-16">
        <div className="max-w-[700px] mx-auto">
          <p className="text-[11px] font-medium text-[#378ADD] uppercase tracking-wider mb-1">
            Features
          </p>
          <h2 className="text-[22px] font-medium text-[#1a2e42] mb-2">
            Everything you need to win the job
          </h2>
          <p className="text-[15px] text-[#3a5570] leading-relaxed mb-8">
            From permit feed to direct contact — no cold calling directories, no guessing.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {features.map((f) => (
              <div key={f.title} className="bg-[#f7fafd] border border-[#ddeaf6] rounded-xl p-5">
                <div className="w-8 h-8 rounded-lg bg-[#E6F1FB] flex items-center justify-center mb-3">
                  {f.icon}
                </div>
                <p className="text-sm font-medium text-[#1a2e42] mb-1">{f.title}</p>
                <p className="text-[13px] text-[#3a5570] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="bg-[#f7fafd] border-b border-[#ddeaf6] px-8 py-16">
        <div className="max-w-[700px] mx-auto">
          <p className="text-[11px] font-medium text-[#378ADD] uppercase tracking-wider mb-1">
            Pricing
          </p>
          <h2 className="text-[22px] font-medium text-[#1a2e42] mb-2">
            Simple plans, monthly credits
          </h2>
          <p className="text-[15px] text-[#3a5570] leading-relaxed mb-8">
            Credits refresh every month. Use them to unlock contact details — phone, email, and address.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-xl p-5 flex flex-col ${
                  plan.featured ? "border-2 border-[#378ADD]" : "border border-[#ddeaf6]"
                }`}
              >
                <div className="flex-1">
                  {plan.featured && (
                    <span className="inline-block bg-[#E6F1FB] text-[#185FA5] text-[11px] font-medium px-2.5 py-0.5 rounded-md mb-2">
                      Most popular
                    </span>
                  )}
                  <p className="text-[15px] font-medium text-[#1a2e42] mb-1">{plan.name}</p>
                  <p className="text-[28px] font-medium text-[#185FA5] leading-none">
                    {plan.price}
                    <span className="text-[13px] font-normal text-[#3a5570]">/mo</span>
                  </p>
                  <p className="text-xs text-[#378ADD] font-medium mt-1">{plan.credits}</p>
                  <p className="text-[11px] text-[#8AAFC8] mb-3">{plan.cpp}</p>
                  <ul className="flex flex-col gap-2">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-[13px] text-[#3a5570]">
                        <CheckIcon />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5">
                  <Link
                    href={link}
                    className="block w-full text-center text-[13px] font-medium text-white bg-[#378ADD] px-4 py-2 rounded-lg hover:bg-[#185FA5] transition-colors"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#8AAFC8] text-center mt-4">
            No commitment — cancel anytime from your account settings.
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white border-b border-[#ddeaf6] px-8 py-16">
        <div className="max-w-[700px] mx-auto">
          <p className="text-[11px] font-medium text-[#378ADD] uppercase tracking-wider mb-1 text-center">
            What contractors say
          </p>
          <h2 className="text-[22px] font-medium text-[#1a2e42] text-center mb-8">
            Real results from real contractors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-[#f7fafd] border border-[#ddeaf6] rounded-xl p-5">
                <p className="text-[13px] text-[#1a2e42] leading-relaxed italic mb-3">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-[13px] font-semibold text-[#1a2e42]">{t.author}</p>
                <p className="text-[12px] text-[#378ADD]">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── only this section ships a client bundle (accordion interactivity) ── */}
      <section id="faq" className="bg-[#f7fafd] border-t border-[#ddeaf6] px-8 py-16">
        <div className="max-w-[700px] mx-auto">
          <p className="text-[11px] font-medium text-[#378ADD] uppercase tracking-wider mb-1">FAQ</p>
          <h2 className="text-[22px] font-medium text-[#1a2e42] mb-6">Common questions</h2>
          {/* Client island — only the accordion needs useState */}
          <FaqAccordion />
          <div className="mt-8 bg-white border border-[#ddeaf6] rounded-xl p-5 text-center">
            <p className="text-[13px] text-[#3a5570] mb-1.5">
              Still have questions? We&apos;re happy to help.
            </p>
            <a
              href="mailto:support@buildleads.org"
              className="text-[13px] font-medium text-[#378ADD] hover:text-[#185FA5]"
            >
              support@buildleads.org
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-[#ddeaf6] px-8 py-8 text-center">
        <p className="text-[15px] font-medium text-[#185FA5] mb-2">BuildLeads</p>
        <div className="flex justify-center gap-6 mb-2.5 flex-wrap">
          {(
            [
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ] as const
          ).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] text-[#1a2e42] hover:text-[#185FA5]"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:support@buildleads.org"
          className="block text-[13px] text-[#378ADD] font-medium hover:text-[#185FA5] mb-2.5"
        >
          support@buildleads.org
        </a>
        <p className="text-[12px] text-[#8AAFC8]">© 2026 BuildLeads. All rights reserved.</p>
      </footer>
    </div>
  );
}