import { cn } from '@/lib/utils';
import EmptyState from './EmptyState';

/**
 * columns: [{ key, header, render(row), className, headerClassName }]
 * rowKey: a string field name or a function(row) returning a unique key.
 */
export default function DataTable({
  columns,
  rows = [],
  loading = false,
  rowKey = '_id',
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your search or filters.',
  emptyIcon,
  emptyAction,
  className,
}) {
  const getRowKey =
    typeof rowKey === 'function' ? rowKey : (row) => row[rowKey];

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card',
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/80">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500',
                    column.headerClassName
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading &&
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={`skeleton-${rowIndex}`}>
                  {columns.map((column) => (
                    <td key={column.key} className="whitespace-nowrap px-4 py-4">
                      <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState
                    icon={emptyIcon}
                    title={emptyTitle}
                    description={emptyDescription}
                    action={emptyAction}
                  />
                </td>
              </tr>
            )}

            {!loading &&
              rows.map((row) => (
                <tr
                  key={getRowKey(row)}
                  className="transition-colors hover:bg-slate-50/70"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'whitespace-nowrap px-4 py-3.5 text-sm text-slate-700',
                        column.className
                      )}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
