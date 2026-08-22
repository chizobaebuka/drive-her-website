import { ArrowRight, Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function CtaBanner({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  tone = 'green',
}: {
  eyebrow?: string;
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: 'green' | 'navy';
}) {
  return (
    <section className="container-page py-16 sm:py-20">
      <div
        className={cn(
          'relative overflow-hidden rounded-[1.75rem] px-7 py-12 sm:px-12 sm:py-14',
          tone === 'green'
            ? 'bg-green-700'
            : 'bg-navy-900 grain',
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 800 300"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
        >
          <path
            d="M-50 260C150 190 320 150 520 90S760 10 880-40"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-50 300C170 230 360 180 560 120S820 30 940-20"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5 9"
          />
        </svg>

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 text-3xl text-white sm:text-[2.25rem] sm:leading-tight">
              {title}
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/85">
              {body}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button href={primary.href} variant="onDark" size="lg">
              {primary.label}
              <ArrowRight />
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant="outlineOnDark" size="lg">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
