'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ToastContext = createContext(null);

const TYPES = {
  success: {
    icon: CheckCircle2,
    iconClass: 'text-emerald-600',
    barClass: 'bg-emerald-500',
  },
  error: {
    icon: AlertCircle,
    iconClass: 'text-rose-600',
    barClass: 'bg-rose-500',
  },
  info: {
    icon: Info,
    iconClass: 'text-blue-600',
    barClass: 'bg-blue-500',
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());
  const nextIdRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message, type = 'success') => {
      const id = (nextIdRef.current += 1);
      setToasts((current) => [...current, { id, message, type }]);

      const timer = setTimeout(() => removeToast(id), 4500);
      timersRef.current.set(id, timer);
    },
    [removeToast]
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const value = useMemo(
    () => ({
      success: (message) => showToast(message, 'success'),
      error: (message) => showToast(message, 'error'),
      info: (message) => showToast(message, 'info'),
    }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => {
          const config = TYPES[toast.type] || TYPES.info;
          const Icon = config.icon;

          return (
            <div
              key={toast.id}
              className="pointer-events-auto flex w-full max-w-sm animate-toast-in items-start gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-lg"
            >
              <span className={cn('mt-0.5 h-8 w-1 shrink-0 rounded-full', config.barClass)} />
              <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', config.iconClass)} aria-hidden="true" />
              <p className="flex-1 text-sm font-medium text-slate-700">{toast.message}</p>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notification"
                className="rounded p-0.5 text-slate-400 transition hover:text-slate-600"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used inside a ToastProvider');
  }

  return context;
}
