import { comparison } from '@/lib/content';
import { cn } from '@/lib/utils';

const columns = [
  { key: 'driveher', label: 'DriveHer' },
  { key: 'uber', label: 'Uber' },
  { key: 'bolt', label: 'Bolt' },
  { key: 'indrive', label: 'inDrive' },
] as const;

function Mark({ value, highlight }: { value: string; highlight: boolean }) {
  if (value === 'core') {
    return (
      <span
        className={cn(
          'inline-flex rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider',
          'bg-green-600 text-white',
        )}
      >
        Core model
      </span>
    );
  }
  if (value === 'yes') {
    return (
      <span className="inline-flex items-center justify-center">
        <span className="sr-only">Yes</span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={cn('h-5 w-5', highlight ? 'text-green-600' : 'text-navy-500')}
        >
          <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.13" />
          <path
            d="M6 10.3 8.6 13 14 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (value === 'limited') {
    return (
      <span className="text-xs font-medium text-muted">Limited</span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center">
      <span className="sr-only">No</span>
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-navy-200">
        <path
          d="M6 6l8 8M14 6l-8 8"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function ComparisonTable() {
  return (
    /* `relative` matters: the sr-only caption and cell labels are absolutely
       positioned, and without a positioned ancestor here their containing block
       would be the viewport — escaping the scroll container and widening the
       whole document on narrow screens. */
    <div className="relative overflow-x-auto rounded-2xl ring-1 ring-line">
      <table className="w-full min-w-[42rem] border-collapse bg-white text-left">
        <caption className="sr-only">
          Feature comparison between DriveHer and other mobility platforms
          operating in Nigeria
        </caption>
        <thead>
          <tr className="border-b border-line">
            <th
              scope="col"
              className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-muted"
            >
              Capability
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  'px-5 py-4 text-center text-sm font-bold',
                  col.key === 'driveher'
                    ? 'bg-green-50 text-green-800'
                    : 'text-navy-700',
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {comparison.map((row) => (
            <tr key={row.feature}>
              <th
                scope="row"
                className="px-5 py-4 text-[0.9375rem] font-medium text-ink"
              >
                {row.feature}
              </th>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    'px-5 py-4 text-center',
                    col.key === 'driveher' && 'bg-green-50/60',
                  )}
                >
                  <Mark value={row[col.key]} highlight={col.key === 'driveher'} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
