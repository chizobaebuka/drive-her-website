import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';

export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  primary,
  secondary,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  breadcrumbs: { name: string; path: string }[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 grain">
      <div className="container-page relative py-14 sm:py-16 lg:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-navy-200/65">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {i === breadcrumbs.length - 1 ? (
                  <span aria-current="page" className="text-navy-100">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="transition-colors hover:text-white"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-[2.25rem] leading-[1.08] text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100/85">
              {lead}
            </p>

            {primary ? (
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={primary.href} size="lg">
                  {primary.label}
                  <ArrowRight />
                </Button>
                {secondary ? (
                  <Button href={secondary.href} variant="outlineOnDark" size="lg">
                    {secondary.label}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>

          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
