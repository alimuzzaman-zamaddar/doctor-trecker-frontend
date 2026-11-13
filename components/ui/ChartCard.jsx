import { cn } from '@/lib/utils';

export default function ChartCard({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
}) {
  return (
    <section className={cn('rounded-2xl border border-slate-200 bg-white shadow-card', className)}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs text-slate-500">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className={cn('p-5', bodyClassName)}>{children}</div>
    </section>
  );
}
