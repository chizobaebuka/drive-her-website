import Image from 'next/image';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { PageHero } from '@/components/marketing/PageHero';
import { StatBand } from '@/components/marketing/StatBand';
import { JsonLd } from '@/components/seo/JsonLd';
import { Badge, Card, CheckItem } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { bayelsa } from '@/lib/content';
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'DriveHer Bayelsa — Bayelsa Women Green Mobility Initiative (BWGMI)',
  description:
    "A Public–Private Partnership proposal to position Bayelsa State as a national leader in women-led sustainable urban mobility: electric vehicles, solar-powered DriveHer Energy Hubs and a phased rollout from Yenagoa to all eight LGAs.",
  path: '/programmes/bayelsa',
  keywords: [
    'BWGMI',
    'Bayelsa green mobility',
    'electric vehicles Yenagoa',
    'solar EV charging Bayelsa',
    'women empowerment Bayelsa',
    'Bayelsa PPP transport',
  ],
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Programmes', path: '/programmes' },
  { name: 'Bayelsa', path: '/programmes/bayelsa' },
];

export default function BayelsaPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            name: bayelsa.initiative,
            description: bayelsa.summary,
            path: '/programmes/bayelsa',
            areaServed: 'Bayelsa State, Nigeria',
          }),
        ]}
      />

      <PageHero
        eyebrow="Programme · Bayelsa State"
        title={
          <>
            DriveHer Bayelsa —{' '}
            <span className="text-gradient-green">
              women-led electric mobility
            </span>{' '}
            powered by the sun.
          </>
        }
        lead={bayelsa.positioning}
        breadcrumbs={breadcrumbs}
        primary={{ label: 'Discuss the partnership', href: '/partners' }}
        secondary={{ label: 'Request the full proposal', href: '/contact?interest=government' }}
        aside={
          <Card tone="dark">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-300">
              At a glance
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ['Initiative', 'BWGMI'],
                ['Structure', 'Public–Private Partnership'],
                ['Pilot city', bayelsa.pilotCity],
                ['Energy', 'Electric + solar PV'],
                ['Full coverage', '8 LGAs by year three'],
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

      {/* Executive summary */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Executive summary"
              title="Two development priorities, addressed by one programme."
              lead={bayelsa.summary}
            />
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-body">
              Unlike conventional transportation projects, BWGMI is designed as
              a comprehensive socio-economic development programme in which
              electric vehicles, solar-powered charging infrastructure and smart
              mobility technology serve as the tools — and women&apos;s
              empowerment, job creation, environmental sustainability and
              technological innovation are the outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                'Women empowerment & jobs',
                'Cleaner environment',
                'Renewable energy adoption',
                'Digital innovation',
                'Economic growth',
                'Safer, inclusive mobility',
              ].map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-line shadow-[var(--shadow-card)]">
            <Image
              src="/images/mobility-centre.jpg"
              alt="The proposed DriveHer Mobility Centre in Yenagoa, with electric vehicles charging beneath a solar canopy."
              width={1200}
              height={932}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Four pillars */}
      <Section tone="canvas">
        <SectionHeading
          eyebrow="The model"
          title="Four strategic pillars"
          lead="Women at the centre of a green mobility ecosystem — not as beneficiaries of a transport project, but as its operators, technicians, managers and owners."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bayelsa.pillars.map((pillar, i) => (
            <li key={pillar.title}>
              <Card className="h-full">
                <span className="font-display text-sm font-bold text-green-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg">{pillar.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                  {pillar.body}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Energy hub */}
      <Section tone="dark" id="energy-hub">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Infrastructure"
              title={bayelsa.energyHub.title}
              lead={bayelsa.energyHub.intro}
            />
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {bayelsa.energyHub.facilities.map((facility) => (
                <CheckItem key={facility} tone="dark">
                  {facility}
                </CheckItem>
              ))}
            </ul>
          </div>

          <div>
            <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-white/15">
              <Image
                src="/images/energy-hub.jpg"
                alt="Solar canopy over the DriveHer Energy Hub charging plaza."
                width={1200}
                height={728}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-8">
              <StatBand
                tone="dark"
                columns={4}
                stats={bayelsa.energyHub.specs}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Green corridor */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Operations"
            title={bayelsa.corridor.title}
            lead={bayelsa.corridor.body}
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              The corridor connects
            </p>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {bayelsa.corridor.destinations.map((destination) => (
                <li
                  key={destination}
                  className="flex items-start gap-3 border-b border-line pb-3 text-[0.9375rem] text-body"
                >
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
                  >
                    <path
                      d="M10 18s6-5.2 6-9.4A6 6 0 0 0 4 8.6C4 12.8 10 18 10 18Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="10" cy="8.5" r="2.1" fill="currentColor" />
                  </svg>
                  {destination}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Phased rollout */}
      <Section tone="canvas" id="rollout">
        <SectionHeading
          eyebrow="Phased expansion"
          title="From Yenagoa to every community"
          lead="A phased approach ensures effective deployment, adoption and measurable impact before each next step — reducing implementation risk while building a replicable model."
        />

        <ol className="mt-12 grid gap-5 lg:grid-cols-3">
          {bayelsa.phases.map((phase) => (
            <li key={phase.phase}>
              <Card className="flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                  <Badge tone="navy">{phase.phase}</Badge>
                  <span className="text-xs font-semibold text-muted">
                    {phase.timeline}
                  </span>
                </div>
                <h3 className="mt-4 text-xl">{phase.title}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-body">
                  {phase.body}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {phase.areas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full bg-canvas px-2.5 py-1 text-xs font-medium text-navy-800 ring-1 ring-line"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ol>

        <div className="mt-14 border-t border-line pt-12">
          <StatBand columns={5} stats={bayelsa.targets} />
          <p className="mt-6 text-xs text-muted">
            Figures are programme targets set out in the BWGMI proposal and are
            subject to partnership agreement, infrastructure readiness and
            investment availability.
          </p>
        </div>
      </Section>

      {/* Blue mobility */}
      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Long-term vision"
              title={bayelsa.blueMobility.title}
              lead={bayelsa.blueMobility.body}
            />
            <p className="mt-6 rounded-xl bg-white/[0.05] p-5 text-sm leading-relaxed text-navy-100/70 ring-1 ring-white/10">
              {bayelsa.blueMobility.caveat}
            </p>
          </div>
          <blockquote className="rounded-[1.5rem] bg-gradient-to-br from-green-700/40 to-navy-800/50 p-8 ring-1 ring-white/10 sm:p-10">
            <p className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
              Today on the roads. Tomorrow on the waters. Together for a greener
              future.
            </p>
            <footer className="mt-6 text-sm text-green-300">
              — DriveHer Bayelsa
            </footer>
          </blockquote>
        </div>
      </Section>

      {/* Programme collateral */}
      <Section tone="light">
        <SectionHeading
          eyebrow="Programme collateral"
          title="The proposed facilities, in detail"
          lead="Concept designs for the DriveHer Bayelsa headquarters and the solar-powered Energy Hub that anchors the pilot."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {[
            {
              src: '/images/programme-bayelsa-hq.jpg',
              alt: 'Concept design of the DriveHer Bayelsa headquarters showing the admin building, energy hub, operations yard, training centre and fleet parking.',
              caption: 'DriveHer Bayelsa HQ — integrated operations, training and energy campus.',
            },
            {
              src: '/images/programme-energy-hub.jpg',
              alt: 'Technical overview of the DriveHer Energy Hub: five 120 kW DC fast chargers, 200 kWp solar PV, 500 kWh battery storage and a 250 kW hybrid inverter.',
              caption: 'DriveHer Energy Hub — solar-powered EV charging station.',
            },
          ].map((item) => (
            <figure key={item.src}>
              <div className="overflow-hidden rounded-2xl bg-canvas ring-1 ring-line">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1280}
                  height={853}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CtaBanner
        eyebrow="Bayelsa State"
        title="A cleaner, safer, more inclusive mobility ecosystem — built together."
        body="DriveHer invites the Bayelsa State Government, ministries, development partners and private sector organisations to shape the implementation framework for BWGMI."
        primary={{ label: 'Open a partnership conversation', href: '/partners' }}
        secondary={{ label: 'Request the full proposal', href: '/contact?interest=government' }}
      />
    </>
  );
}
