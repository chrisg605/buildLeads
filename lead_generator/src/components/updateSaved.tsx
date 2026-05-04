'use client';
import { useState, useTransition } from 'react';
import { updateJobSelection } from '@/lib/UpdateSaved'; // Your server action
 
interface JobCheckboxProps {
  jobId: number;
  address: string;
  isSelected?: boolean;
  onUpdate?: (isSelected: boolean) => void;
}
 
export function JobCheckbox({
  jobId,
  address,
  isSelected = false,
  onUpdate,
}: JobCheckboxProps) {
  const [checked, setChecked] = useState(isSelected);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    setError(null);
 
    // Call server action to update database
    startTransition(async () => {
      try {
        console.log('Updating job selection for jobId:', jobId, 'to:', newChecked);
        await updateJobSelection(jobId, newChecked);
        onUpdate?.(newChecked);
      } catch (err) {
        setError('Failed to update. Please try again.');
        setChecked(!newChecked); // Revert on error
        console.error('Update error:', err);
      }
    });
  };
 
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={isPending}
        aria-label={`Select job at ${address}`}
        className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      />
      {isPending && (
        <span className="text-xs text-slate-500">Updating...</span>
      )}
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}