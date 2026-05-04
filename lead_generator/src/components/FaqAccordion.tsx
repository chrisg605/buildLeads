"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Where does the contact information come from?",
    a: "We pull contact details from Marin County's publicly available permit records, then clean and verify them so you're reaching real decision-makers.",
  },
  {
    q: "What is a credit?",
    a: "One credit unlocks the full contact details — phone, email, and address — for one permit. Credits refresh at the start of every billing cycle and do not roll over.",
  },
  {
    q: "What is the owner/builder flag?",
    a: "Permits with no general contractor listed are flagged as owner/builder. These are direct client opportunities — the permit filer is usually the one making the hiring decision.",
  },
  {
    q: "Which areas are covered right now?",
    a: "We currently cover all of Marin County, including San Rafael, Mill Valley, Novato, Tiburon, and surrounding cities. We're actively expanding to more counties — stay tuned.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel anytime from your account settings. You'll keep access until the end of your billing period with no extra charges.",
  },
  {
    q: "What if I run out of credits mid-month?",
    a: "You can upgrade to a higher plan at any time, or wait for your credits to refresh on your next billing date. You can still browse and save jobs without spending credits.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-[#ddeaf6] py-[1.1rem] cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between text-sm font-medium text-[#1a2e42] select-none">
        {q}
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 shrink-0 stroke-[#8AAFC8] fill-none stroke-2 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      <div
        className={`text-sm text-[#3a5570] leading-relaxed overflow-hidden transition-all duration-200 ${
          open ? "max-h-40 pt-2" : "max-h-0"
        }`}
      >
        {a}
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  return (
    <div>
      {faqs.map((faq) => (
        <FaqItem key={faq.q} q={faq.q} a={faq.a} />
      ))}
    </div>
  );
}