import { ComparisonTable } from '@/components/marketing/ComparisonTable';
import { PageHero } from '@/components/marketing/PageHero';
import { StatBand } from '@/components/marketing/StatBand';
import { LeadForm } from '@/components/forms/LeadForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { Badge, Card, CheckItem } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { investment } from '@/lib/content';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Investors — ₦7.5 million pre-seed round',
  description:
    "DriveHer is raising a ₦7.5 million pre-seed round to build the technology MVP, corporate structure and pilot foundation of Africa's first women-centred integrated mobility ecosystem. Request the deck.",
  path: '/investors',
  keywords: [
    'pre-seed Nigeria',
    'mobility startup investment',
    'impact investment Africa',
    'transport tech Nigeria funding',
    'women-led business investment',
  ],
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Investors', path: '/investors' },
];

const sectors = [
  'Urban mobility',
  'Financial technology',
  'Clean energy',
  'Logistics',
  'Smart cities',
  "Women's economic empowerment",
];

export default function InvestorsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Pre-seed round"
        title={
          <>
            You are not investing in a taxi company. You are investing in{' '}
            <span className="text-gradient-green">the infrastructure</span>.
          </>
        }
        lead="DriveHer is raising ₦7.5 million to establish the operational and institutional foundation for pilot implementation — and to become an investment-ready platform capable of attracting institutional fleet capital."
        breadcrumbs={breadcrumbs}
        primary={{ label: 'Request the deck', href: '#request' }}
        secondary={{ label: 'See the ecosystem', href: '/ecosystem' }}
        aside={
          <Card tone="dark">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-300">
              Round summary
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ['Stage', investment.round],
                ['Raising', investment.amount],
                ['Instrument', 'Discussed with investors'],
                ['Use of funds', 'MVP, structure, market entry'],
                ['Markets', 'Bayelsa & Delta State'],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-navy-200/70">{term}</dt>
                  <dd className="text-right font-semibold text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        }
      />

      {/* Why now */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <SectionHeading
            eyebrow="Why now"
            title="Several market trends are converging at once."
            lead="Timing matters. DriveHer is entering the market at the point where urbanisation, smartphone penetration, digital payments, CNG infrastructure and public policy on women's empowerment all line up."
          />
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {investment.whyNow.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </ul>
        </div>

        <div className="mt-16 border-t border-line pt-12">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
            DriveHer sits at the intersection of
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {sectors.map((sector) => (
              <li key={sector}>
                <Badge tone="navy">{sector}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Use of funds */}
      <Section tone="dark" id="use-of-funds">
        <SectionHeading
          tone="dark"
          eyebrow="Use of funds"
          title="Where the ₦7.5 million goes"
          lead="This round funds the foundation — the platform, the company structure and the market entry work that makes the fleet round investable."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <ul className="space-y-4">
            {investment.useOfFunds.map((item) => (
              <li key={item.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base text-white">{item.label}</h3>
                  <span className="font-display text-lg font-bold text-green-300 tabular-nums">
                    {item.share}%
                  </span>
                </div>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"
                  role="img"
                  aria-label={`${item.label}: ${item.share} per cent of the round`}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-300"
                    style={{ width: `${(item.share / 30) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-navy-100/70">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="space-y-6">
            <Card tone="dark">
              <h3 className="text-lg text-white">What the round buys</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-100/80">
                {investment.purpose}
              </p>
            </Card>

            <Card tone="dark">
              <h3 className="text-lg text-white">Go-to-market sequence</h3>
              <ol className="mt-4 space-y-3">
                {investment.goToMarket.map((step) => (
                  <li
                    key={step.phase}
                    className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-navy-200/70">{step.phase}</span>
                    <span className="text-right">
                      <span className="font-semibold text-white">
                        {step.label}
                      </span>
                      <span className="ml-2 text-navy-200/60">
                        {step.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </Section>

      {/* Revenue */}
      <Section tone="canvas">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Business model"
            title="Twelve revenue streams from one asset base."
            lead="The same vehicle, driver, hub and platform generate income across passenger, corporate, logistics, financial and data services — which is what keeps utilisation high and revenue diversified."
          />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {investment.revenueStreams.map((stream) => (
              <li
                key={stream}
                className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-navy-800 ring-1 ring-line"
              >
                {stream}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 border-t border-line pt-12">
          <SectionHeading
            eyebrow="Financial outlook"
            title="Illustrative three-year shape"
          />
          <div className="mt-10">
            <StatBand
              columns={4}
              stats={[
                { value: '100', label: 'Vehicles in pilot', sub: 'Phase one' },
                { value: '500', label: 'Vehicles by year three', sub: 'Delta State scale' },
                { value: '12', label: 'Recurring revenue streams', sub: 'Across eight business lines' },
                { value: '8', label: 'Business lines', sub: 'Shared infrastructure' },
              ]}
            />
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
            These are illustrative planning targets, not projections or
            guarantees. Detailed financial assumptions, unit economics and
            sensitivity analysis are provided in the Investment Memorandum,
            available on request to qualified investors.
          </p>
        </div>
      </Section>

      {/* Competitive */}
      <Section tone="light">
        <SectionHeading
          eyebrow="Competitive advantage"
          title="What competitors provide separately, DriveHer provides together."
          lead="Ride-hailing alone is a price war. Integration across fleet, energy, payments, training and public partnership is a moat that is expensive to copy and slow to catch."
        />
        <div className="mt-10">
          <ComparisonTable />
        </div>
      </Section>

      {/* Request form */}
      <Section tone="canvas" id="request">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Next step"
              title="Request the investor deck"
              lead="Tell us a little about your mandate and we will send the pitch deck, and where appropriate the Investment Memorandum, within two working days."
            />

            <ul className="mt-8 space-y-3">
              {[
                'Pre-seed pitch deck (PDF)',
                'Investment Memorandum on qualification',
                'Programme proposals for Bayelsa and Delta',
                'A 30-minute call with the founding team',
              ].map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-line">
              <p className="text-sm leading-relaxed text-body">
                <strong className="font-semibold text-ink">
                  Not an investor?
                </strong>{' '}
                Development finance institutions, climate funds and corporate
                partners should use the{' '}
                <a
                  href="/partners"
                  className="font-semibold text-green-700 underline underline-offset-2"
                >
                  partnership route
                </a>{' '}
                instead — it fits how those organisations engage.
              </p>
            </div>
          </div>

          <LeadForm
            defaultInterest="investment"
            heading="Investor enquiry"
            submitLabel="Request the deck"
            source="/investors"
          />
        </div>
      </Section>
    </>
  );
}
