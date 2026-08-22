import Image from 'next/image';
import Link from 'next/link';
import { AudienceRouter } from '@/components/marketing/AudienceRouter';
import { ComparisonTable } from '@/components/marketing/ComparisonTable';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { EcosystemGrid } from '@/components/marketing/EcosystemGrid';
import { Faq } from '@/components/marketing/Faq';
import { Hero } from '@/components/marketing/Hero';
import { StatBand } from '@/components/marketing/StatBand';
import { ArrowRight, Button } from '@/components/ui/Button';
import { CheckItem } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { bayelsa, delta, faqs, nationalRoadmap } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: '/',
  keywords: [
    'women drivers Nigeria',
    'DriveHer Bayelsa',
    'DriveHer Delta',
    'solar EV charging Nigeria',
    'mobility investment Nigeria',
  ],
});

const problems = [
  {
    group: 'Passengers',
    items: ['Safety concerns', 'Cash-based payments', 'Inconsistent service', 'Limited accountability'],
  },
  {
    group: 'Drivers',
    items: ['No access to finance', 'No career progression', 'Poor welfare', 'Low technology adoption'],
  },
  {
    group: 'Women',
    items: ['Underrepresented in commercial transport', 'No route into mobility enterprise', 'Few pathways to asset ownership'],
  },
  {
    group: 'Government',
    items: ['Little transport data', 'Largely informal ecosystem', 'Hard to plan infrastructure', 'Environmental pressure'],
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ---------------------------------------------------------------- */}
      {/* Proof band                                                        */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-b border-line bg-white">
        <div className="container-page py-10">
          <StatBand
            columns={4}
            stats={[
              { value: '2', label: 'State programmes', sub: 'Bayelsa and Delta' },
              { value: '8', label: 'Business lines', sub: 'One shared platform' },
              { value: '1,500+', label: 'Women targeted', sub: 'Bayelsa programme' },
              { value: '₦7.5M', label: 'Pre-seed round', sub: 'Open now' },
            ]}
          />
        </div>
      </div>

      <AudienceRouter />

      {/* ---------------------------------------------------------------- */}
      {/* The problem                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="The problem"
              title="One of Nigeria's largest sectors is also one of its least organised."
              lead="Millions of Nigerians depend on transport to earn a living, reach a clinic or get to class. Yet urban mobility remains fragmented, largely informal, technologically underserved — and significantly underrepresented by women."
            />
            <div className="mt-8">
              <Button href="/about" variant="ghost">
                How we are answering it
                <ArrowRight />
              </Button>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {problems.map((block) => (
              <li
                key={block.group}
                className="rounded-2xl bg-canvas p-6 ring-1 ring-line"
              >
                <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-navy-800">
                  {block.group}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-body"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-magenta-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The ecosystem                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark">
        <SectionHeading
          tone="dark"
          eyebrow="The solution"
          title="Not one company. An ecosystem."
          lead="Eight business lines sharing one technology platform, one fleet, one energy network and one customer base. Diversified revenue, and no single point of failure."
        />

        <div className="mt-12">
          <EcosystemGrid tone="dark" />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl bg-white/[0.05] p-6 ring-1 ring-white/10">
          <p className="flex-1 text-[0.9375rem] leading-relaxed text-navy-100/85">
            <strong className="font-semibold text-white">
              One investment, multiple businesses.
            </strong>{' '}
            Shared infrastructure, shared technology, shared customers — the
            reason DriveHer&apos;s unit economics improve as it scales.
          </p>
          <Button href="/ecosystem" variant="onDark">
            Explore the ecosystem
            <ArrowRight />
          </Button>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Programmes                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="canvas" id="programmes">
        <SectionHeading
          eyebrow="Programmes on the ground"
          title="Two states. Two energy pathways. One platform."
          lead="DriveHer meets each state where its infrastructure is today — electric and solar in Bayelsa, CNG dual-fuel in Delta — while running both on the same technology and the same women's empowerment framework."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Bayelsa */}
          <article className="group overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-line shadow-[var(--shadow-card)] transition duration-300 hover:shadow-[var(--shadow-lift)]">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/energy-hub.jpg"
                alt="Solar canopy over the DriveHer Energy Hub with electric vehicles charging beneath it."
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute left-5 top-5 inline-flex rounded-full bg-navy-900/85 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
                Bayelsa · Electric
              </span>
            </div>
            <div className="p-7 sm:p-8">
              <h3 className="text-2xl">{bayelsa.name}</h3>
              <p className="mt-1.5 text-sm font-semibold text-green-700">
                {bayelsa.initiative}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">
                {bayelsa.positioning} Piloting in {bayelsa.pilotCity} with
                Bayelsa&apos;s first solar-powered EV charging network, then
                scaling to all eight LGAs.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {bayelsa.targets.slice(0, 3).map((t) => (
                  <div key={t.label}>
                    <dd className="font-display text-2xl font-bold text-navy-800">
                      {t.value}
                    </dd>
                    <dt className="mt-1 text-xs leading-snug text-muted">
                      {t.label}
                    </dt>
                  </div>
                ))}
              </dl>
              <Link
                href="/programmes/bayelsa"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900"
              >
                Read the Bayelsa programme
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </article>

          {/* Delta */}
          <article className="group overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-line shadow-[var(--shadow-card)] transition duration-300 hover:shadow-[var(--shadow-lift)]">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/women-fleet.jpg"
                alt="DriveHer women operators standing beside branded vehicles and an electric bus."
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute left-5 top-5 inline-flex rounded-full bg-magenta-700/85 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
                Delta · CNG
              </span>
            </div>
            <div className="p-7 sm:p-8">
              <h3 className="text-2xl">{delta.name}</h3>
              <p className="mt-1.5 text-sm font-semibold text-magenta-700">
                {delta.initiative}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">
                {delta.positioning} Dual-fuel vehicles on lease-to-own terms for
                100 women across Asaba and Warri, wrapped in training,
                maintenance and platform-routed work.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {delta.targets.slice(0, 3).map((t) => (
                  <div key={t.label}>
                    <dd className="font-display text-2xl font-bold text-navy-800">
                      {t.value}
                    </dd>
                    <dt className="mt-1 text-xs leading-snug text-muted">
                      {t.label}
                    </dt>
                  </div>
                ))}
              </dl>
              <Link
                href="/programmes/delta"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900"
              >
                Read the Delta programme
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Why women                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-line shadow-[var(--shadow-card)]">
              <Image
                src="/images/women-training.jpg"
                alt="A DriveHer driver at the wheel of a branded vehicle while a female technician works alongside her at a charging bay."
                width={1200}
                height={789}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-3 -top-6 hidden rounded-2xl bg-navy-900 px-6 py-5 text-white shadow-[var(--shadow-lift)] sm:block">
              <p className="font-display text-xl font-bold leading-tight">
                &ldquo;When women move,
                <br />
                economies move.&rdquo;
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Why women"
              title="Women are not our CSR programme. They are the business model."
              lead="Transport has historically been one of the least gender-inclusive sectors, and women have been its users rather than its owners. DriveHer builds structured pathways across the entire value chain — not only into the driver's seat."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Professional drivers',
                'Fleet managers',
                'EV & CNG technicians',
                'Dispatch coordinators',
                'Energy hub operators',
                'Entrepreneurs & franchisees',
                'Trainers',
                'Technology professionals',
              ].map((role) => (
                <CheckItem key={role}>{role}</CheckItem>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/women">
                The empowerment framework
                <ArrowRight />
              </Button>
              <Button href="/drive-with-us" variant="ghost">
                Apply to drive
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Competitive advantage                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="canvas">
        <SectionHeading
          eyebrow="Competitive position"
          title="DriveHer combines what the others provide separately."
          lead="Global ride-hailing platforms compete on supply and price. DriveHer competes on integration — fleet, energy, payments, training and public partnership under one operator."
        />
        <div className="mt-10">
          <ComparisonTable />
        </div>
        <p className="mt-4 text-xs text-muted">
          Comparison reflects DriveHer&apos;s assessment of publicly available
          service offerings in the Nigerian market at the time of writing.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Roadmap                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark" id="roadmap">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            tone="dark"
            eyebrow="Where this goes"
            title="Built in Delta and Bayelsa. Designed for the continent."
            lead="The pilot exists to prove an operating model that can be replicated — state by state, then across borders — without rebuilding the platform each time."
          />

          <ol className="relative space-y-2">
            {nationalRoadmap.map((step, i) => (
              <li key={step.label} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/15 font-display text-sm font-bold text-green-300 ring-1 ring-green-400/30">
                    {i + 1}
                  </span>
                  {i < nationalRoadmap.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="my-1 w-px flex-1 bg-gradient-to-b from-green-400/40 to-transparent"
                    />
                  ) : null}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg text-white">{step.label}</h3>
                  <p className="mt-1 text-[0.9375rem] text-navy-100/75">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Pre-seed round open"
        title="₦7.5 million to build the foundation of a national mobility platform."
        body="The round funds the technology MVP, corporate structuring, business development, market entry and PPP engagement — the work that makes DriveHer ready for institutional fleet capital."
        primary={{ label: 'Request the investor deck', href: '/investors' }}
        secondary={{ label: 'Talk to the team', href: '/contact' }}
      />

      <Faq items={faqs} />
    </>
  );
}
