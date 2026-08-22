import Image from 'next/image';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { PageHero } from '@/components/marketing/PageHero';
import { StatBand } from '@/components/marketing/StatBand';
import { JsonLd } from '@/components/seo/JsonLd';
import { Badge, Card, CheckItem } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { delta } from '@/lib/content';
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'DriveHer Delta — Delta Women Clean Mobility Initiative (DWCMI)',
  description:
    'A programme empowering 100 women in Asaba and Warri through CNG-powered vehicles on lease-to-own terms, professional training, maintenance support and platform-routed work in Delta State.',
  path: '/programmes/delta',
  keywords: [
    'DWCMI',
    'Delta women clean mobility',
    'CNG vehicles Delta State',
    'lease to own drivers Nigeria',
    'Asaba Warri transport',
  ],
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Programmes', path: '/programmes' },
  { name: 'Delta', path: '/programmes/delta' },
];

export default function DeltaPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            name: delta.initiative,
            description: delta.summary,
            path: '/programmes/delta',
            areaServed: 'Delta State, Nigeria',
          }),
        ]}
      />

      <PageHero
        eyebrow="Programme · Delta State"
        title={
          <>
            DriveHer Delta — clean fuel,{' '}
            <span className="text-gradient-green">better income</span>, a
            pathway to ownership.
          </>
        }
        lead={delta.positioning}
        breadcrumbs={breadcrumbs}
        primary={{ label: 'Apply to drive', href: '/drive-with-us' }}
        secondary={{ label: 'Partner on DWCMI', href: '/partners' }}
        aside={
          <Card tone="dark">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-300">
              At a glance
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ['Initiative', 'DWCMI'],
                ['Energy', 'CNG / PMS dual fuel'],
                ['Vehicle', 'Chery Tiggo 2 Pro'],
                ['Pilot cities', 'Asaba & Warri'],
                ['Year one', '100 women · 50 vehicles'],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-navy-200/70">{term}</dt>
                  <dd className="text-right font-semibold text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        }
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The programme"
              title="A vehicle is only useful if it keeps earning."
              lead={delta.summary}
            />
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-body">
              Grant a woman a car and you have made a donation. Give her a
              vehicle on structured terms, a platform that finds her work, a
              maintenance network that keeps her moving and a repayment
              deducted automatically from earnings — and you have built a
              business she owns at the end of it.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {delta.cities.map((city) => (
                <Card key={city.name} tone="outline">
                  <h3 className="text-lg">{city.name}</h3>
                  <dl className="mt-4 flex gap-8">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted">
                        Women
                      </dt>
                      <dd className="font-display text-3xl font-bold text-navy-800">
                        {city.women}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted">
                        Vehicles
                      </dt>
                      <dd className="font-display text-3xl font-bold text-navy-800">
                        {city.vehicles}
                      </dd>
                    </div>
                  </dl>
                </Card>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] bg-canvas ring-1 ring-line shadow-[var(--shadow-card)]">
            <Image
              src="/images/programme-delta-overview.jpg"
              alt="Delta Women Clean Mobility Initiative overview: proposed CNG/PMS dual-fuel vehicle, pilot cities, programme components and lease-to-own scheme."
              width={853}
              height={1280}
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Section>

      {/* Year one impact */}
      <Section tone="dark" compact>
        <StatBand tone="dark" columns={4} stats={delta.targets} />
      </Section>

      {/* Programme components */}
      <Section tone="canvas">
        <SectionHeading
          eyebrow="Programme components"
          title="Six parts that have to work together"
          lead="Each one covers a reason women drop out of transport programmes elsewhere — training, vehicle reliability, work supply, finance, maintenance and community."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {delta.components.map((component, i) => (
            <li key={component.title}>
              <Card className="h-full">
                <span className="font-display text-sm font-bold text-magenta-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg">{component.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                  {component.body}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Lease to own + CNG */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-[1.5rem] bg-canvas p-8 ring-1 ring-line sm:p-10">
            <Badge tone="magenta">Earn · Grow · Own</Badge>
            <h2 className="mt-5 text-2xl">The lease-to-own scheme</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">
              Two driver categories run on the platform. Owner drivers keep
              normal earnings. DriveHer lease partners have repayment deducted
              automatically from daily revenue — no manual collection, no
              arrears spiral, and a formal repayment record that unlocks future
              finance.
            </p>

            <div className="mt-7 rounded-xl bg-white p-5 ring-1 ring-line">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                Illustrative daily settlement
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-body">Daily revenue</dt>
                  <dd className="font-display text-lg font-bold text-navy-800">
                    ₦35,000
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-body">Automatic lease repayment</dt>
                  <dd className="font-display text-lg font-bold text-magenta-600">
                    −₦8,000
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-semibold text-ink">Driver receives</dt>
                  <dd className="font-display text-xl font-bold text-green-700">
                    ₦27,000
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-muted">
                Illustrative figures only. Actual earnings vary by city, hours
                worked, demand and fuel cost.
              </p>
            </div>

            <ul className="mt-7 space-y-2.5">
              {delta.leaseToOwn.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              eyebrow="Why CNG"
              title="The smart choice for Delta today"
              lead="Delta State sits at the centre of Nigeria's CNG build-out. Dual-fuel vehicles cut running cost immediately, reduce emissions against petrol-only operation, and never leave a driver stranded when one fuel is unavailable."
            />
            <ul className="mt-8 space-y-3">
              {delta.cngBenefits.map((benefit) => (
                <CheckItem key={benefit}>{benefit}</CheckItem>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl bg-navy-900 p-7 text-white">
              <h3 className="text-lg text-white">The proposed vehicle</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-100/85">
                {delta.vehicle} — selected for running-cost efficiency,
                availability of parts and suitability for daily commercial use
                on Delta roads.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Delta State"
        title="One hundred women. Fifty vehicles. A cleaner, stronger Delta."
        body="Whether you want to drive, supply the fleet, fund the lease book or bring the programme to your local government area — this is the door."
        primary={{ label: 'Apply to drive', href: '/drive-with-us' }}
        secondary={{ label: 'Partner with us', href: '/partners' }}
      />
    </>
  );
}
