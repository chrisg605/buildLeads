// components/ContactButton.tsx
'use client';

import  HandleContact  from './handleContact';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const ContactButton = ({
  jobId,
  traced,
  address,
  city,
  count
}: {
  jobId: number;
  traced: boolean;
  address: string;
  city: string;
  count: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    await HandleContact(jobId, traced, address, city, count);
    router.refresh(); // re-fetches server data, unlocks contacts
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-80 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Saving...' : 'Mark as Contacted'}
    </button>
  );
};
