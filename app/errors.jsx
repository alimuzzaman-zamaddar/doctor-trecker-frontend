'use client';

import { cn } from '@/lib/utils';
import ErrorState from '@/components/ui/ErrorState';

export default function Errors404({
  className,
}) {
  return (
    <div className={cn('min-h-screen flex items-center justify-center py-12', className)}>
      <ErrorState
        title="Page not found"
        message="The route you are looking for does not exist. Check the URL and try again."
        onRetry={() => {}}
      />
    </div>
  );
}