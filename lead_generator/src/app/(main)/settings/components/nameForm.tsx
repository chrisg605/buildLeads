// components/settings/NameForm.tsx (client)
'use client';

import { updateName } from '@/app/(main)/settings/lib/nameChanger';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const NameForm = ({ currentName}: { currentName: string }) => {
  const [name, setName] = useState(currentName);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsLoading(true);
    await updateName(name);
    setIsEditing(false);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Name</p>
        {isEditing ? (
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300"
            autoFocus
          />
        ) : (
          <p className="text-sm text-gray-900">{name || '—'}</p>
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
              onClick={() => { setIsEditing(false); setName(currentName); }}
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