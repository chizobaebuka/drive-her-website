import { CtaBanner } from '@/components/marketing/CtaBanner';
import { EcosystemGrid } from '@/components/marketing/EcosystemGrid';
import { PageHero } from '@/components/marketing/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { Card, CheckItem } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { pricingPolicy } from '@/lib/content';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'The ecosystem — eight business lines on one mobility platform',
  description:
    'DriveHer Ride, Transport, Logistics, Fleet, Pay, Tech, Academy and Green: eight business lines sharing one technology platform, one fleet and one energy network.',
  path: '/ecosystem',
  keywords: [
    'mobility platform Nigeria',
    'fleet management Nigeria',
    'mobility wallet',
    'pricing rules engine',
    'EV charging management software',
  ],
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Ecosystem', path: '/ecosystem' },
];

const stack = [
  { layer: 'Customer app', detail: 'Booking, live tracking, cashless payment, ratings and safety tools.' },
  { layer: 'Driver app', detail: 'Job offers, navigation, earnings, lease balance and performance feedback.' },
  { layer: 'Dispatch engine', detail: 'Intelligent matching and route optimisation across every service line.' },
  { layer: 'Pricing rules engine', detail: 'Fares, commission, levies and surcharges configured — never hard-coded.' },
  { layer: 'Energy management', detail: 'Solar, battery and charger orchestration with load balancing.' },
  { layer: 'Fleet dashboard', detail: 'Telematics, utilisation, maintenance scheduling and compliance.' },
  { layer: 'Payment engine', detail: 'Wallet, mobility card, corporate billing and automatic lease deduction.' },
  { layer: 'Business intelligence', detail: 'Operational analytics and reporting for management and regulators.' },
];

export default function EcosystemPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="The ecosystem"
        title={
          <>
            One investment. Multiple businesses.{' '}
            <span className="text-gradient-green">Shared everything.</span>
          </>
        }
        lead="Traditional transport businesses run each service as a separate company with separate overheads. DriveHer runs eight business lines on shared infrastructure, shared technology and a shared customer base — which is where the margin comes from."
        breadcrumbs={breadcrumbs}
        primary={{ label: 'See the investment case', href: '/investors' }}
        secondary={{ label: 'Corporate & logistics enquiry', href: '/contact?interest=corporate' }}
      />

      <Section tone="light">
        <SectionHeading
          eyebrow="Business lines"
          title="Eight lines, one platform"
          lead="Every line strengthens the others: the Academy supplies drivers to Ride, Green supplies energy to Fleet, Pay settles all of them, and Tech runs the lot."
        />
        <div className="mt-12">
          <EcosystemGrid detailed />
        </div>
      </Section>

      {/* Technology */}
      <Section tone="dark" id="technology">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            tone="dark"
            eyebrow="Technology"
            title="Built as a platform, not an app."
            lead="The DriveHer technology stack is designed so a new state, a new energy type or a new regulation is a configuration change — not a rebuild."
          />

          <ol className="space-y-px overflow-hidden rounded-2xl ring-1 ring-white/10">
            {stack.map((item, i) => (
              <li
                key={item.layer}
                className="flex gap-5 bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.08]"
              >
                <span className="font-display text-xs font-bold tabular-nums text-green-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base text-white">{item.layer}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy-100/75">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Pricing policy */}
      <Section tone="canvas" id="pricing">
        <SectionHeading
          eyebrow="Platform policy"
          title="Fair to drivers. Predictable for riders. Configurable for regulators."
          lead="Pricing is where mobility platforms usually lose the trust of one side of the market. DriveHer's policy is published, capped and adjustable without an engineering release."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="h-fit">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-600">
              Platform commission
            </p>
            <p className="mt-3 font-display text-6xl font-bold text-navy-800">
              {pricingPolicy.commission}
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
              {pricingPolicy.commissionNote}
            </p>
            <dl className="mt-7 space-y-2.5 border-t border-line pt-6">
              {pricingPolicy.tiers.map((tier) => (
                <div
                  key={tier.label}
                  className="flex items-baseline justify-between gap-4 text-sm"
                >
                  <dt className="text-body">{tier.label}</dt>
                  <dd className="font-semibold text-navy-800">{tier.value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <ul className="grid gap-4 sm:grid-cols-2">
            {pricingPolicy.principles.map((principle) => (
              <li key={principle.title}>
                <Card tone="outline" className="h-full">
                  <h3 className="text-base">{principle.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-body">
                    {principle.body}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Energy */}
      <Section tone="light" id="energy">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Energy infrastructure"
              title="The cheapest kilometre is the one you generate yourself."
              lead="Fuel and electricity are the largest variable cost in any fleet. Owning generation and storage turns that cost from a market risk into an asset — and makes electric mobility viable where the grid alone would not support it."
            />
            <ul className="mt-8 space-y-3">
              {[
                'Solar photovoltaic generation at every Energy Hub',
                'Battery energy storage for uninterrupted supply and peak shaving',
                'Hybrid inverters balancing solar, battery and grid',
                'DC fast charging for commercial fleet turnaround',
                'Smart charging management with load balancing across chargers',
                'CNG dual-fuel deployment where electric is not yet practical',
              ].map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { value: '200 kWp', label: 'Solar PV', sub: 'Per flagship hub' },
              { value: '500 kWh', label: 'Battery storage', sub: 'LiFePO₄' },
              { value: '600 kW', label: 'Charging capacity', sub: '5 × 120 kW DC' },
              { value: '~300,000', label: 'kWh generated / year', sub: 'Estimated, 5 peak sun hours per day' },
            ].map((stat) => (
              <Card key={stat.label} tone="outline">
                <p className="font-display text-3xl font-bold text-navy-800">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-muted">{stat.sub}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Technology licensing & partnerships"
        title="The platform is an asset in its own right."
        body="Fleet operators, state agencies and mobility businesses in other markets can license the DriveHer stack rather than build one. Tell us what you run and we will show you what it would look like."
        primary={{ label: 'Talk to us about the platform', href: '/contact?interest=partnership' }}
        secondary={{ label: 'Investor materials', href: '/investors' }}
      />
    </>
  );
}
