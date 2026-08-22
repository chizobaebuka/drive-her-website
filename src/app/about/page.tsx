import Image from 'next/image';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { PageHero } from '@/components/marketing/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { Card, CheckItem } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { nationalRoadmap } from '@/lib/content';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'About DriveHer Urban Mobility Services Limited',
  description:
    "DriveHer Urban Mobility Services Limited is a technology-enabled mobility company building an integrated ecosystem across ride-hailing, logistics, fleet management, digital payments, clean mobility and women's economic empowerment.",
  path: '/about',
  keywords: [
    'DriveHer Urban Mobility Services Limited',
    'mobility company Nigeria',
    'about DriveHer',
  ],
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

const values = [
  {
    title: 'Inclusion as strategy',
    body: 'Women are not a beneficiary group attached to a transport business. Their participation across the value chain is the business.',
  },
  {
    title: 'Clean by design',
    body: 'Every fleet decision starts from the energy question: what is the cleanest option this state can actually supply, reliably, today.',
  },
  {
    title: 'Built to be governed',
    body: 'Transparent reporting, clear procurement, independent review and regulatory compliance are designed in, not retrofitted.',
  },
  {
    title: 'Configurable, not hard-coded',
    body: 'Fares, levies, energy types and vehicle categories are settings. A new state or a new regulation should never require a rebuild.',
  },
  {
    title: 'Utilisation over expansion',
    body: 'A vehicle that earns across passenger, corporate and logistics work all day beats a larger fleet that idles half of it.',
  },
  {
    title: 'Local ownership',
    body: 'Communities, women’s associations and traditional institutions are engaged from planning, so services fit real needs.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="About us"
        title={
          <>
            Transportation can be more than transportation. It can be{' '}
            <span className="text-gradient-green">a platform</span>.
          </>
        }
        lead="Every day, millions of Nigerians rely on transport to earn a living, build businesses, access healthcare and pursue education. Yet one of the country's largest economic sectors remains fragmented, largely informal and significantly underrepresented by women. DriveHer exists to change what that sector can be."
        breadcrumbs={breadcrumbs}
        primary={{ label: 'Contact the team', href: '/contact' }}
        secondary={{ label: 'Investor materials', href: '/investors' }}
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Company"
              title={site.legalName}
              lead="A technology-enabled mobility company established to transform urban transportation through an integrated ecosystem combining ride-hailing, urban taxi services, logistics, fleet management, digital transport payments, clean mobility and women's economic empowerment."
            />
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-body">
              Unlike traditional transportation businesses that operate
              individual services independently, DriveHer integrates multiple
              mobility solutions into one scalable platform capable of serving
              passengers, businesses, government institutions and logistics
              operators. The company has been conceived as a Public–Private
              Partnership-ready enterprise with an initial focus on Bayelsa and
              Delta State, and a long-term vision of national and regional
              expansion.
            </p>

            <div className="mt-10 rounded-2xl bg-navy-900 p-8 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-300">
                Vision
              </p>
              <p className="mt-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                To become Africa&apos;s leading women-centred smart mobility
                ecosystem — transforming transportation into a platform for
                economic inclusion, innovation and sustainable prosperity.
              </p>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-line shadow-[var(--shadow-card)]">
              <Image
                src="/images/ev-charging.jpg"
                alt="DriveHer electric vehicles at a branded mobility centre with women staff and charging infrastructure."
                width={1200}
                height={617}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ['Legal name', site.legalName],
                ['Registered', `Nigeria, ${site.founded}`],
                ['Operating states', 'Bayelsa · Delta'],
                ['Structure', 'PPP-ready enterprise'],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className="rounded-xl bg-canvas p-5 ring-1 ring-line"
                >
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    {term}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] font-semibold text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section tone="canvas">
        <SectionHeading
          eyebrow="How we operate"
          title="Six principles that decide the hard calls"
          lead="Every business writes values. These are the ones that actually get used when a trade-off has to be made."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <li key={value.title}>
              <Card className="h-full">
                <h3 className="text-lg">{value.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                  {value.body}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Roadmap */}
      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            tone="dark"
            eyebrow="The long view"
            title="Launch in the South-South. Build for the continent."
            lead="The pilot programmes are not the destination. They are the proving ground for an operating model designed to travel."
          />
          <ol className="grid gap-4 sm:grid-cols-2">
            {nationalRoadmap.map((step, i) => (
              <li
                key={step.label}
                className="rounded-2xl bg-white/[0.05] p-6 ring-1 ring-white/10"
              >
                <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-green-300">
                  Stage {i + 1}
                </span>
                <h3 className="mt-3 text-lg text-white">{step.label}</h3>
                <p className="mt-1.5 text-sm text-navy-100/75">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* What we believe */}
      <Section tone="light">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            align="center"
            eyebrow="What we believe"
            title="DriveHer is more than transportation."
          />
          <ul className="mt-10 space-y-3 text-left sm:mx-auto sm:max-w-md">
            {[
              'A platform for women',
              'A platform for technology',
              'A platform for cleaner cities',
              'A platform for inclusive economic growth',
            ].map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </ul>
          <p className="mt-10 font-display text-2xl font-bold text-navy-800">
            {site.tagline}
          </p>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Work with us"
        title="And we invite you to help build it."
        body="Investors, State Governments, development partners, suppliers, corporates and the women who will drive it — there is a way in for each of you."
        primary={{ label: 'Get in touch', href: '/contact' }}
        secondary={{ label: 'See the programmes', href: '/programmes' }}
      />
    </>
  );
}
