import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'light' | 'canvas' | 'dark' | 'deep';

const tones: Record<Tone, string> = {
  light: 'bg-white text-body',
  canvas: 'bg-canvas text-body',
  dark: 'bg-navy-900 text-navy-100 grain',
  deep: 'bg-navy-950 text-navy-200',
};

export function Section({
  children,
  tone = 'light',
  className,
  id,
  compact = false,
  as: Tag = 'section',
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  compact?: boolean;
  as?: 'section' | 'div' | 'article' | 'footer';
}) {
  return (
    <Tag
      id={id}
      className={cn(
        tones[tone],
        compact ? 'py-14 sm:py-16' : 'py-20 sm:py-24 lg:py-28',
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </Tag>
  );
}

export function Eyebrow({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]',
        tone === 'dark' ? 'text-green-300' : 'text-green-600',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-px w-6',
          tone === 'dark' ? 'bg-green-400/70' : 'bg-green-500/60',
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = 'light',
  align = 'left',
  className,
  level = 2,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
  level?: 1 | 2 | 3;
}) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3';
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone} className={align === 'center' ? 'justify-center' : ''}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag
        className={cn(
          'mt-4 text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]',
          tone === 'dark' && 'text-white',
        )}
      >
        {title}
      </Tag>
      {lead ? (
        <div
          className={cn(
            'mt-5 text-lg leading-relaxed',
            tone === 'dark' ? 'text-navy-100/85' : 'text-body',
          )}
        >
          {lead}
        </div>
      ) : null}
    </div>
  );
}
