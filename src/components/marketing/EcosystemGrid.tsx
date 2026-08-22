import { ecosystem } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * The eight business lines. On the home page a condensed grid; on the
 * ecosystem page the full version with supporting bullets.
 */
export function EcosystemGrid({
  detailed = false,
  tone = 'light',
}: {
  detailed?: boolean;
  tone?: 'light' | 'dark';
}) {
  return (
    <ul
      className={cn(
        'grid gap-4',
        detailed ? 'lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4',
      )}
    >
      {ecosystem.map((line, index) => (
        <li
          key={line.id}
          id={detailed ? line.id : undefined}
          className={cn(
            'group relative flex flex-col rounded-2xl p-6 transition duration-300',
            tone === 'light'
              ? 'bg-white ring-1 ring-line hover:ring-green-200 hover:shadow-[var(--shadow-lift)]'
              : 'bg-white/[0.05] ring-1 ring-white/10 hover:bg-white/[0.08]',
            detailed && 'sm:p-8 scroll-mt-28',
          )}
        >
          <div className="flex items-baseline gap-3">
            <span
              className={cn(
                'font-display text-xs font-bold tabular-nums',
                tone === 'light' ? 'text-green-600' : 'text-green-400',
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={cn(
                'text-[0.6875rem] font-bold uppercase tracking-[0.14em]',
                tone === 'light' ? 'text-muted' : 'text-navy-200/60',
              )}
            >
              {line.role}
            </span>
          </div>

          <h3
            className={cn(
              'mt-3 text-lg',
              detailed && 'text-xl',
              tone === 'dark' && 'text-white',
            )}
          >
            {line.name}
          </h3>

          <p
            className={cn(
              'mt-2.5 text-[0.9375rem] leading-relaxed',
              tone === 'light' ? 'text-body' : 'text-navy-100/80',
            )}
          >
            {line.description}
          </p>

          {detailed ? (
            <ul
              className={cn(
                'mt-5 space-y-2 border-t pt-5',
                tone === 'light' ? 'border-line' : 'border-white/10',
              )}
            >
              {line.points.map((point) => (
                <li
                  key={point}
                  className={cn(
                    'flex gap-2.5 text-sm leading-relaxed',
                    tone === 'light' ? 'text-body' : 'text-navy-100/75',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-2 h-1 w-1 shrink-0 rounded-full',
                      tone === 'light' ? 'bg-green-500' : 'bg-green-400',
                    )}
                  />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
