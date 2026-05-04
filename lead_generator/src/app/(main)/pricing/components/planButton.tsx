"use client"
import { useState } from "react";

export default function PlanButton({plan, sub, periodEndDate, credits, name, planCredits, price} : {plan: number, sub: number, periodEndDate: string, credits: number, name : string, planCredits: number, price: string}){
    const [showModal, setShowModal] = useState(false);

    const modalContent = () => {
      // Upgrade
      if (sub < plan) {
        return {
          title: `Upgrade to ${name}`,
          body: credits > 0
            ? `Your remaining ${credits} credits will carry over plus ${credits} new credits, giving you ${credits + planCredits} total. Your card will be charged ${price} today. Next renewal on ${periodEndDate}.`
            : `You have no remaining credits. Your new ${planCredits} credits will be available immediately. Your card will be charged ${price} today. Next renewal on ${periodEndDate}.`,
        };
      }

      // Downgrade
      if (sub > plan) {
        return {
          title: `Downgrade to ${name}`,
          body: credits > 0
            ? `You still have ${credits} credits remaining. You'll keep your current plan and credits until ${periodEndDate}, then switch to ${name} with ${planCredits} credits. No charge today.`
            : `You have no remaining credits. Your new ${planCredits} credits will be available immediately. Your card will be charged ${price} today. Next renewal on ${periodEndDate}.`
        };
      }
    };

  const { title, body } = modalContent() ?? { title: '', body: '' };
    return <>

        <button
            onClick={() => {if (sub != -1 && (sub < plan || sub > plan || credits == 0))
              { setShowModal(true)}}}
            type={sub == -1 ? "submit" : "button"}
            disabled={sub === plan && credits == 0}
            className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors duration-150 ${
                sub === plan
                ? "bg-blue-500 text-white cursor-default"
                : sub !== -1 && sub > plan
                    ? "bg-gray-800 text-white hover:bg-gray-900"
                    : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            >
            {sub === -1 ? "Get Started" : sub < plan ? "Upgrade" : sub === plan ? "Subscribed" : "Downgrade"}
        </button>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{body}</p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                 <button
                 onSubmit={() => {
                  setShowModal(false);
                 } }
                 type="submit"
                  className="flex-1 rounded-lg bg-gray-800 py-2.5 text-sm font-medium text-white hover:bg-gray-900"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
    </>
}