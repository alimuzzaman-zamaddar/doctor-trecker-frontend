import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

export default function Pagination({
  page = 1,
  totalPages = 1,
  total = 0,
  limit = 10,
  onPageChange,
  className,
}) {
  if (total === 0 || totalPages <= 0) return null;

  const firstItem = (page - 1) * limit + 1;
  const lastItem = Math.min(page * limit, total);
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div
      className={cn(
        'flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <p className="text-xs text-slate-500">
        Showing <span className="font-semibold text-slate-700">{firstItem}</span>–
        <span className="font-semibold text-slate-700">{lastItem}</span> of{' '}
        <span className="font-semibold text-slate-700">{total}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="rounded-lg border border-slate-200 p-1.5 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        {visiblePages.map((pageNumber, index) => {
          const previousPage = visiblePages[index - 1];
          const showEllipsis = previousPage && pageNumber - previousPage > 1;

          return (
            <span key={pageNumber} className="flex items-center gap-1">
              {showEllipsis && <span className="px-1 text-xs text-slate-400">…</span>}
              <button
                type="button"
                onClick={() => onPageChange(pageNumber)}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={pageNumber === page ? 'page' : undefined}
                className={cn(
                  'min-w-[32px] rounded-lg px-2 py-1.5 text-xs font-semibold transition',
                  pageNumber === page
                    ? 'bg-teal-600 text-white'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                )}
              >
                {pageNumber}
              </button>
            </span>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="rounded-lg border border-slate-200 p-1.5 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
