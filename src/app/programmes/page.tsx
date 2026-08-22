import Image from 'next/image';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { PageHero } from '@/components/marketing/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowRight, Button } from '@/components/ui/Button';
import { Badge, Card } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { bayelsa, delta, nationalRoadmap } from '@/lib/content';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Programmes — DriveHer Bayelsa and DriveHer Delta',
  description:
    'DriveHer runs two state mobility programmes on one platform: electric and solar-powered mobility in Bayelsa (BWGMI) and CNG dual-fuel lease-to-own mobility in Delta (DWCMI).',
  path: '/programmes',
  keywords: ['DriveHer programmes', 'BWGMI', 'DWCMI', 'state mobility programme Nigeria'],
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Programmes', path: '/programmes' },
];

const programmes = [
  {
    data: bayelsa,
    href: '/programmes/bayelsa',
    image: '/images/energy-hub.jpg',
    imageAlt:
      'Solar canopy over the DriveHer Energy Hub with electric vehicles charging beneath.',
    tag: 'Electric + solar',
    tone: 'green' as const,
    highlights: [
      'Pilot in Yenagoa, then eight LGAs',
      "Bayelsa's first solar-powered EV charging network",
      'Proposed as a Public–Private Partnership',
      'Long-term maritime expansion under study',
    ],
  },
  {
    data: delta,
    href: '/programmes/delta',
    image: '/images/women-fleet.jpg',
    imageAlt:
      'DriveHer women operators standing beside branded vehicles and an electric bus.',
    tag: 'CNG dual fuel',
    tone: 'magenta' as const,
    highlights: [
      '100 women across Asaba and Warri',
      'Lease-to-own with automatic repayment',
      'CNG/PMS dual-fuel vehicles',
      'Training, maintenance and support network',
    ],
  },
];

export default function ProgrammesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Programmes"
        title={
          <>
            Two states. Two energy pathways.{' '}
            <span className="text-gradient-green">One platform.</span>
          </>
        }
        lead="DriveHer does not wait for infrastructure to arrive. Each programme is designed around the clean energy a state can actually supply today, while running on the same technology, the same operating standards and the same women's empowerment framework."
        breadcrumbs={breadcrumbs}
        primary={{ label: 'Bring DriveHer to your state', href: '/partners' }}
      />

      <Section tone="light">
        <div className="space-y-8">
          {programmes.map((programme, index) => (
            <article
              key={programme.href}
              className="overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line shadow-[var(--shadow-card)]"
            >
              <div
                className={`grid lg:grid-cols-2 ${
                  index % 2 === 1 ? 'lg:[&>*:first-child]:order-last' : ''
                }`}
              >
                <div className="relative min-h-[16rem] lg:min-h-[26rem]">
                  <Image
                    src={programme.image}
                    alt={programme.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-8 sm:p-10 lg:p-12">
                  <Badge tone={programme.tone === 'green' ? 'green' : 'magenta'}>
                    {programme.tag}
                  </Badge>
                  <h2 className="mt-5 text-3xl">{programme.data.name}</h2>
                  <p className="mt-2 text-sm font-semibold text-muted">
                    {programme.data.initiative}
                  </p>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-body">
                    {programme.data.positioning}
                  </p>

                  <ul className="mt-7 space-y-2.5">
                    {programme.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-[0.9375rem] text-body"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button href={programme.href}>
                      Read the programme
                      <ArrowRight />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="canvas" id="roadmap">
        <SectionHeading
          eyebrow="Expansion"
          title="A model designed to be replicated"
          lead="The pilots exist to prove an operating framework that a new state can adopt without rebuilding the platform — different energy type, different regulations, same system."
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {nationalRoadmap.map((step, i) => (
            <li key={step.label}>
              <Card tone="outline" className="h-full">
                <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-green-600">
                  Step {i + 1}
                </span>
                <h3 className="mt-3 text-lg">{step.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {step.detail}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBanner
        eyebrow="For State Governments"
        title="Want a DriveHer programme in your state?"
        body="Tell us the state, the energy infrastructure available and the outcomes you need. We will come back with an indicative model, an implementation sequence and the partnership structure that fits."
        primary={{ label: 'Start the conversation', href: '/partners' }}
        secondary={{ label: 'See the impact framework', href: '/impact' }}
        tone="navy"
      />
    </>
  );
}
