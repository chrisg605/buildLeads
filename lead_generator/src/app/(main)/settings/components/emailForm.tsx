// components/settings/EmailForm.tsx (client)
'use client';

import { updateEmail } from '../lib/emailChanger';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const EmailForm = ({ currentEmail }: { currentEmail: string; }) => {
  const [email, setEmail] = useState(currentEmail);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsLoading(true);
    await updateEmail( email);
    setIsEditing(false);
    setIsLoading(false);
    setSuccess(true);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email</p>
        {isEditing ? (
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
            autoFocus
          />
        ) : (
          <div>
            <p className="text-sm text-gray-900">{currentEmail}</p>
            {success && (
              <p className="text-xs text-green-600 mt-0.5">Your email has been changed to {email}</p>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-2 flex-shrink-0">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-medium text-white hover:opacity-80 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => { setIsEditing(false); setEmail(currentEmail); }}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};