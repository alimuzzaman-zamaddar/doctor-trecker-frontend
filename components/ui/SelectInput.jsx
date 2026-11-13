import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function normalizeOptions(options = []) {
  return options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option
  );
}

const SelectInput = forwardRef(function SelectInput(
  {
    label,
    name,
    error,
    hint,
    options = [],
    placeholder = 'Select an option',
    className,
    id,
    required,
    ...props
  },
  ref
) {
  const inputId = id || name;
  const errorId = `${inputId}-error`;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-900 shadow-sm transition focus:outline-none focus:ring-2',
            error
              ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
              : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100',
            className
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {normalizeOptions(options).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
      </div>
      {error ? (
        <p id={errorId} className="text-xs font-medium text-rose-600">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-slate-500">{hint}</p>
      )}
    </div>
  );
});

export default SelectInput;
