import Image from 'next/image';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { PageHero } from '@/components/marketing/PageHero';
import { StatBand } from '@/components/marketing/StatBand';
import { JsonLd } from '@/components/seo/JsonLd';
import { Card } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { governance, impact } from '@/lib/content';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Impact — economic, social and environmental outcomes',
  description:
    "DriveHer's programmes are designed to deliver measurable economic, social and environmental impact, monitored against defined indicators through a published governance framework.",
  path: '/impact',
  keywords: [
    'impact measurement mobility',
    'clean transport emissions Nigeria',
    'women employment impact',
    'ESG transport Africa',
  ],
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Impact', path: '/impact' },
];

const pillars = [
  {
    key: 'economic' as const,
    title: 'Economic impact',
    lead: 'Stimulating activity by creating employment, supporting entrepreneurship and attracting investment into the emerging green economy.',
    tone: 'bg-navy-800',
  },
  {
    key: 'social' as const,
    title: 'Social impact',
    lead: 'Promoting social inclusion by expanding opportunity for women and improving access to safe, reliable, technology-driven transport.',
    tone: 'bg-magenta-700',
  },
  {
    key: 'environmental' as const,
    title: 'Environmental impact',
    lead: 'Adopting electric vehicles supported by solar-powered charging contributes directly to state and national sustainability objectives.',
    tone: 'bg-green-700',
  },
];

const indicators = [
  'Number of women trained and economically empowered',
  'Employment opportunities created',
  'Electric vehicle fleet utilisation',
  'Renewable energy generated and consumed',
  'Passenger satisfaction',
  'Safety performance',
  'Revenue and operational efficiency',
  'Carbon emission reductions',
  'Expansion of charging infrastructure',
  'Community engagement outcomes',
];

export default function ImpactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Impact"
        title={
          <>
            Impact that is{' '}
            <span className="text-gradient-green">measured</span>, not asserted.
          </>
        }
        lead="DriveHer is designed to deliver economic, social and environmental benefits that extend beyond transportation — and to report against defined indicators so that partners, funders and the public can see whether it is working."
        breadcrumbs={breadcrumbs}
        primary={{ label: 'Partner with us', href: '/partners' }}
      />

      <Section tone="light">
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.key}
              className="flex flex-col overflow-hidden rounded-[1.5rem] ring-1 ring-line"
            >
              <div className={`${pillar.tone} p-7 text-white`}>
                <h2 className="text-xl text-white">{pillar.title}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/85">
                  {pillar.lead}
                </p>
              </div>
              <ul className="flex-1 space-y-3 bg-white p-7">
                {impact[pillar.key].map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] text-body">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Targets */}
      <Section tone="dark" compact>
        <SectionHeading
          tone="dark"
          eyebrow="Programme targets"
          title="What the pilots are aiming at"
          align="center"
        />
        <div className="mt-12">
          <StatBand
            tone="dark"
            columns={5}
            stats={[
              { value: '1,500+', label: 'Women empowered', sub: 'Bayelsa programme' },
              { value: '100', label: 'Women in year one', sub: 'Delta programme' },
              { value: '500+', label: 'EVs at statewide scale', sub: 'Bayelsa, year three' },
              { value: '400+', label: 'Direct & indirect jobs', sub: 'Delta, year one' },
              { value: '8', label: 'LGAs covered', sub: 'Bayelsa, full rollout' },
            ]}
          />
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-navy-200/60">
          Targets set out in the published BWGMI and DWCMI programme documents.
          They are planning objectives subject to partnership agreement,
          infrastructure readiness and investment availability — not forecasts
          or guarantees.
        </p>
      </Section>

      {/* Indicators */}
      <Section tone="canvas" id="governance">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Monitoring & evaluation"
              title="Ten indicators, reported regularly"
              lead="A comprehensive M&E system assesses project performance, measures impact and supports continuous improvement. Regular reporting lets partners evaluate progress and make informed decisions about future investment and expansion."
            />
            <ul className="mt-8 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {indicators.map((indicator, i) => (
                <li
                  key={indicator}
                  className="flex gap-3 border-b border-line pb-2.5 text-[0.9375rem] text-body"
                >
                  <span className="font-display text-xs font-bold tabular-nums text-green-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {indicator}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-line shadow-[var(--shadow-card)]">
              <Image
                src="/images/governance.jpg"
                alt="A DriveHer governance meeting with government and private sector representatives reviewing programme performance."
                width={1200}
                height={702}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {governance.map((item) => (
                <Card key={item.title} tone="outline">
                  <h3 className="text-base">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {item.body}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Replication */}
      <Section tone="light">
        <div className="rounded-[1.75rem] bg-canvas p-8 ring-1 ring-line sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="A model for replication"
                title="Designed from the outset to be copied."
                lead="While the pilots begin in Yenagoa, Asaba and Warri, their long-term significance extends further. The model is deliberately built so that other states — and other countries — can adapt it to promote inclusive economic development through sustainable transport and renewable energy."
              />
            </div>
            <ul className="grid grid-cols-2 gap-4">
              {['Scalable', 'Adaptable', 'Replicable', 'Impactful'].map(
                (word) => (
                  <li
                    key={word}
                    className="rounded-2xl bg-white p-6 text-center ring-1 ring-line"
                  >
                    <p className="font-display text-lg font-bold text-navy-800">
                      {word}
                    </p>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBanner
        eyebrow="For funders and evaluators"
        title="Want the full impact framework?"
        body="Development finance institutions, climate funds and impact investors can request the detailed monitoring and evaluation framework, indicator definitions and reporting cadence."
        primary={{ label: 'Request the framework', href: '/contact?interest=partnership' }}
        secondary={{ label: 'Read the Bayelsa proposal', href: '/programmes/bayelsa' }}
        tone="navy"
      />
    </>
  );
}
