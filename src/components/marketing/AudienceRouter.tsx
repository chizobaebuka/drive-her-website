import Link from 'next/link';
import { ArrowRight } from '@/components/ui/Button';
import { SectionHeading, Section } from '@/components/ui/Section';
import { audiences } from '@/lib/site';

const icons: Record<string, React.ReactNode> = {
  investors: (
    <path
      d="M4 20V9m5 11V4m5 16v-7m5 7V7"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  ),
  government: (
    <>
      <path
        d="M3 10 12 4l9 6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M6 11v7m4-7v7m4-7v7m4-7v7M3.5 20.5h17"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </>
  ),
  women: (
    <>
      <circle
        cx="12"
        cy="8"
        r="4.2"
        stroke="currentColor"
        strokeWidth="1.9"
        fill="none"
      />
      <path
        d="M12 12.5V21m-3-3h6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </>
  ),
  corporate: (
    <>
      <path
        d="M3.5 15.5 5 10.2A2.4 2.4 0 0 1 7.3 8.5h9.4a2.4 2.4 0 0 1 2.3 1.7l1.5 5.3"
        stroke="currentColor"
        strokeWidth="1.9"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="3"
        y="15"
        width="18"
        height="4.6"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.9"
        fill="none"
      />
      <path d="M6.6 17.3h.01M17.4 17.3h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
};

export function AudienceRouter() {
  return (
    <Section tone="canvas">
      <SectionHeading
        eyebrow="Find your route in"
        title="Four ways into the DriveHer ecosystem"
        lead="Every visitor arrives with a different question. Pick the one that sounds like yours and we will take you straight to the answer — and the form that gets a reply."
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((audience) => (
          <li key={audience.id}>
            <Link
              href={audience.href}
              className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-green-200"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 ring-1 ring-green-100 transition-colors group-hover:bg-green-600 group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
                  {icons[audience.id]}
                </svg>
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                {audience.label}
              </p>
              <h3 className="mt-1.5 text-xl">{audience.headline}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-body">
                {audience.copy}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                {audience.cta}
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
