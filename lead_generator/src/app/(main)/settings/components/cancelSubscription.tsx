// components/settings/CancelSubscription.tsx (client)
'use client';

import { cancelSubscription } from '../lib/cancelSub';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const CancelSubscription = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setIsLoading(true);
    await cancelSubscription();
    setShowConfirm(false);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
      >
        Cancel plan
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl mx-4">
            <h3 className="text-base font-semibold text-gray-900">Cancel your plan?</h3>
            <p className="text-sm text-gray-500 mt-2">
              You'll keep access until the end of your current billing period. This cannot be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? 'Cancelling...' : 'Yes, cancel'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Keep plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};