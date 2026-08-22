import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowRight } from '@/components/ui/Button';
import { SectionHeading, Section } from '@/components/ui/Section';
import { faqSchema } from '@/lib/seo';

/**
 * FAQ built on native <details>/<summary> — works with zero JavaScript, is
 * keyboard accessible by default, and is emitted as FAQPage structured data
 * so answers are eligible for rich results.
 */
export function Faq({
  items,
  title = 'Questions we get asked',
  lead = 'The things investors, government partners and drivers ask before the first meeting.',
  emitSchema = true,
}: {
  items: { question: string; answer: string }[];
  title?: string;
  lead?: string;
  emitSchema?: boolean;
}) {
  return (
    <Section tone="light" id="faq">
      {emitSchema ? <JsonLd data={faqSchema(items)} /> : null}

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title={title} lead={lead} />

          <div className="mt-9 rounded-2xl bg-canvas p-6 ring-1 ring-line">
            <h3 className="text-base">Still have a question?</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              Ask us directly — we reply within two working days.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-900"
              >
                Contact us
                <ArrowRight />
              </Link>
              <a
                href="mailto:info@driveher.ng"
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-800 ring-1 ring-inset ring-line transition-colors hover:ring-navy-300"
              >
                info@driveher.ng
              </a>
            </div>
          </div>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left marker:hidden">
                <h3 className="text-[1.0625rem] font-semibold leading-snug text-navy-900">
                  {item.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-canvas text-navy-700 ring-1 ring-line transition-transform duration-200 group-open:rotate-45"
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3">
                    <path
                      d="M8 3v10M3 8h10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 pr-12 text-[0.9375rem] leading-relaxed text-body">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
