import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SIZES = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-9 w-9',
};

export default function LoadingSpinner({ size = 'md', className, label }) {
  const icon = (
    <Loader2
      role="status"
      aria-label="Loading"
      className={cn('animate-spin text-teal-600', SIZES[size], className)}
    />
  );

  if (!label) return icon;

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
      {icon}
      <span>{label}</span>
    </div>
  );
}
