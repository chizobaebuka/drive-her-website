import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'outlineOnDark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-[transform,background-color,color,box-shadow] duration-200 ease-out will-change-transform active:translate-y-px disabled:opacity-55 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-green-600 text-white shadow-[0_10px_24px_-12px_rgba(27,127,59,0.9)] hover:bg-green-700 hover:shadow-[0_14px_30px_-12px_rgba(27,127,59,0.95)]',
  secondary:
    'bg-navy-800 text-white shadow-[0_10px_24px_-14px_rgba(8,32,58,0.9)] hover:bg-navy-900',
  ghost:
    'bg-white text-navy-800 ring-1 ring-inset ring-line hover:ring-navy-300 hover:bg-navy-50',
  onDark: 'bg-white text-navy-900 hover:bg-green-50',
  outlineOnDark:
    'text-white ring-1 ring-inset ring-white/35 hover:ring-white/70 hover:bg-white/10',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-[0.9375rem] px-5 py-2.5',
  lg: 'text-base px-7 py-3.5',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<'button'> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in props && props.href) {
    const { href, external } = props;
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith('http')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn('h-4 w-4 shrink-0', className)}
    >
      <path
        d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
