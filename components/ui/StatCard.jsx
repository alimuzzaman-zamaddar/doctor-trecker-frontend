import { cn } from '@/lib/utils';

const ACCENTS = {
  teal: 'bg-teal-50 text-teal-600',
  blue: 'bg-blue-50 text-blue-600',
  violet: 'bg-violet-50 text-violet-600',
  amber: 'bg-amber-50 text-amber-600',
};

export default function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = 'teal',
  isLoading = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          {isLoading ? (
            <div className="mt-2 h-8 w-20 animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {value}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
              ACCENTS[accent] || ACCENTS.teal
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}
      </div>
      {hint && <p className="mt-3 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
