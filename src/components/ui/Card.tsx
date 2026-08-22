import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from './Button';

export function Card({
  children,
  className,
  tone = 'light',
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: 'light' | 'dark' | 'outline';
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 sm:p-7',
        tone === 'light' && 'bg-white shadow-[var(--shadow-card)] ring-1 ring-line',
        tone === 'outline' && 'bg-canvas ring-1 ring-line',
        tone === 'dark' && 'bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-sm',
        interactive &&
          'transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function LinkCard({
  href,
  eyebrow,
  title,
  children,
  cta = 'Learn more',
  tone = 'light',
  icon,
  className,
}: {
  href: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  cta?: string;
  tone?: 'light' | 'dark';
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col rounded-2xl p-6 sm:p-7 transition duration-300 ease-out hover:-translate-y-1',
        tone === 'light'
          ? 'bg-white shadow-[var(--shadow-card)] ring-1 ring-line hover:shadow-[var(--shadow-lift)] hover:ring-green-200'
          : 'bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/[0.1] hover:ring-white/25',
        className,
      )}
    >
      {icon ? <div className="mb-5">{icon}</div> : null}
      {eyebrow ? (
        <p
          className={cn(
            'text-xs font-bold uppercase tracking-[0.14em]',
            tone === 'light' ? 'text-green-600' : 'text-green-300',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h3
        className={cn(
          'mt-2 text-xl',
          tone === 'dark' && 'text-white',
        )}
      >
        {title}
      </h3>
      <div
        className={cn(
          'mt-3 flex-1 text-[0.9375rem] leading-relaxed',
          tone === 'light' ? 'text-body' : 'text-navy-100/80',
        )}
      >
        {children}
      </div>
      <span
        className={cn(
          'mt-6 inline-flex items-center gap-1.5 text-sm font-semibold',
          tone === 'light' ? 'text-navy-800' : 'text-white',
        )}
      >
        {cta}
        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function Stat({
  value,
  label,
  sub,
  tone = 'light',
}: {
  value: string;
  label: string;
  sub?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <div>
      <p
        className={cn(
          'font-display text-4xl font-bold tracking-tight sm:text-5xl',
          tone === 'light' ? 'text-navy-800' : 'text-white',
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          'mt-2 text-sm font-semibold',
          tone === 'light' ? 'text-ink' : 'text-green-300',
        )}
      >
        {label}
      </p>
      {sub ? (
        <p
          className={cn(
            'mt-1 text-sm',
            tone === 'light' ? 'text-muted' : 'text-navy-200/70',
          )}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export function Badge({
  children,
  tone = 'green',
}: {
  children: ReactNode;
  tone?: 'green' | 'navy' | 'gold' | 'magenta' | 'onDark';
}) {
  const tones = {
    green: 'bg-green-50 text-green-700 ring-green-200',
    navy: 'bg-navy-50 text-navy-700 ring-navy-200',
    gold: 'bg-gold-100 text-gold-700 ring-gold-300',
    magenta: 'bg-magenta-100 text-magenta-700 ring-magenta-300',
    onDark: 'bg-white/10 text-white ring-white/20',
  } as const;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset',
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function CheckItem({
  children,
  tone = 'light',
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
}) {
  return (
    <li className="flex gap-3">
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className={cn(
          'mt-0.5 h-5 w-5 shrink-0',
          tone === 'light' ? 'text-green-500' : 'text-green-400',
        )}
      >
        <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.14" />
        <path
          d="M6 10.3l2.6 2.6L14 7.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          'text-[0.9375rem] leading-relaxed',
          tone === 'light' ? 'text-body' : 'text-navy-100/85',
        )}
      >
        {children}
      </span>
    </li>
  );
}
