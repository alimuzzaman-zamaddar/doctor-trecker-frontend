/** Join truthy class names. A tiny alternative to the clsx dependency. */
export function cn(...values) {
  return values.filter(Boolean).join(' ');
}

/** Format an ISO date (or Date) as "Nov 13, 2026". */
export function formatDate(value, options = {}) {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(date);
}

/** Format an ISO date with the time included. */
export function formatDateTime(value) {
  return formatDate(value, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** "Dr. Sarah Chen" -> "SC" (or at most two initials). */
export function getInitials(name = '') {
  return name
    .replace(/^Dr\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

/** Remove empty query params so the URL stays clean. */
export function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined
    )
  );
}
