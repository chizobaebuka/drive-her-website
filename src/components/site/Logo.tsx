import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * DriveHer mark: a road ribbon sweeping up out of a rounded badge, with an
 * energy bolt cutting across it — mobility plus clean power. Drawn inline so
 * it stays crisp at any size and costs no extra network request.
 */
export function LogoMark({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const badge = tone === 'light' ? '#08203a' : '#ffffff';
  const road = tone === 'light' ? '#ffffff' : '#08203a';

  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className={cn('h-10 w-10', className)}
    >
      <rect width="44" height="44" rx="12" fill={badge} />
      {/* Road ribbon — wide at the bottom, tapering toward the horizon. */}
      <path
        d="M9 36.5c0-1 5.4-11.9 10.6-18.2C23.9 13 28.6 9 31.4 7.3c1.1-.7 2.3.6 1.6 1.6-2.6 3.8-6.1 9.6-9 15.4-2.8 5.6-4.6 10.4-5.2 12.6-.2.6-.7 1-1.3 1h-7.2c-.7 0-1.3-.6-1.3-1.4Z"
        fill={road}
      />
      {/* Centre line */}
      <path
        d="M14.6 33.5c1.6-4.2 4.6-10.4 8-15.6 2.5-3.8 5-7 6.9-9.1"
        stroke={badge}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeDasharray="2.6 3.4"
        opacity="0.9"
      />
      {/* Energy bolt */}
      <path
        d="M35.5 19.4h-5.7l2.2-7.8-9 12.4h5.7l-2.2 8.4 9-13Z"
        fill="#2fa84f"
      />
    </svg>
  );
}

export function Logo({
  tone = 'light',
  className,
  showTagline = false,
}: {
  tone?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label="DriveHer — home"
    >
      <LogoMark
        tone={tone}
        className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.35rem] font-bold tracking-tight',
            tone === 'light' ? 'text-navy-900' : 'text-white',
          )}
        >
          Drive
          <span className={tone === 'light' ? 'text-green-600' : 'text-green-400'}>
            Her
          </span>
        </span>
        {showTagline ? (
          <span
            className={cn(
              'mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.18em]',
              tone === 'light' ? 'text-muted' : 'text-navy-200/70',
            )}
          >
            Urban Mobility Services
          </span>
        ) : null}
      </span>
    </Link>
  );
}
