import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FilterDropdown({
  label,
  value,
  onChange,
  options = [],
  allLabel = 'All',
  id,
  className,
}) {
  const inputId = id || `filter-${label || 'dropdown'}`;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={inputId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-700 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
        >
          <option value="">{allLabel}</option>
          {options.map((option) => {
            const normalized =
              typeof option === 'string' ? { value: option, label: option } : option;
            return (
              <option key={normalized.value} value={normalized.value}>
                {normalized.label}
              </option>
            );
          })}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
