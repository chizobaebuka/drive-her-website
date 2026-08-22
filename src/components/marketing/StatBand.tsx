import { cn } from '@/lib/utils';

/**
 * A row of headline figures rendered as a real description list: each figure
 * is a <dd> described by its <dt>, wrapped in a <div> so the markup stays a
 * valid <dl> (which screen readers announce as a list of term/value pairs).
 */
export function StatBand({
  stats,
  tone = 'light',
  columns = 4,
  className,
}: {
  stats: { value: string; label: string; sub?: string }[];
  tone?: 'light' | 'dark';
  columns?: 3 | 4 | 5;
  className?: string;
}) {
  const cols = {
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
    5: 'sm:grid-cols-3 lg:grid-cols-5',
  } as const;

  return (
    <dl className={cn('grid gap-x-8 gap-y-10', cols[columns], className)}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <dd
            className={cn(
              'font-display text-4xl font-bold tracking-tight sm:text-5xl',
              tone === 'light' ? 'text-navy-800' : 'text-white',
            )}
          >
            {stat.value}
          </dd>
          <dt
            className={cn(
              'mt-2 text-sm font-semibold',
              tone === 'light' ? 'text-ink' : 'text-green-300',
            )}
          >
            {stat.label}
            {stat.sub ? (
              <span
                className={cn(
                  'mt-1 block font-normal',
                  tone === 'light' ? 'text-muted' : 'text-navy-200/80',
                )}
              >
                {stat.sub}
              </span>
            ) : null}
          </dt>
        </div>
      ))}
    </dl>
  );
}
