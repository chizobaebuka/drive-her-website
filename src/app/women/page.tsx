import Image from 'next/image';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { PageHero } from '@/components/marketing/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { Card, CheckItem } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { academyTracks, impact, womenPathways } from '@/lib/content';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Women — the economic empowerment framework",
  description:
    "DriveHer's framework moves women from transport users to mobility leaders: ten career pathways across driving, technical, operational, energy and entrepreneurial roles, supported by the DriveHer Academy.",
  path: '/women',
  keywords: [
    'women drivers Nigeria',
    'women in transport Africa',
    'women economic empowerment mobility',
    'female EV technicians',
    'DriveHer Academy',
  ],
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Women', path: '/women' },
];

const inclusionAreas = [
  {
    title: 'Capacity development',
    body: 'Structured training programmes equip women with the technical, entrepreneurial and leadership skills required to participate successfully in the green mobility sector — delivered with technical institutions, certified training providers and strategic partners.',
  },
  {
    title: 'Entrepreneurship & financial inclusion',
    body: 'Beyond employment, DriveHer supports women in building sustainable businesses within the mobility ecosystem — fleet ownership, charging hub management and mobility-related enterprises — working with financial institutions and development partners on access to finance.',
  },
  {
    title: 'Leadership & decision-making',
    body: 'Participation is designed to extend beyond driving into technical, managerial and decision-making roles, so that women help shape how the mobility system is planned and run.',
  },
];

export default function WomenPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Women's economic empowerment"
        title={
          <>
            From transport users to{' '}
            <span className="text-gradient-green">mobility leaders</span>.
          </>
        }
        lead="Historically, women have been beneficiaries of transportation systems rather than active participants in shaping and managing them. DriveHer is designed to change that — by integrating women across the entire mobility value chain, not only into the driver's seat."
        breadcrumbs={breadcrumbs}
        primary={{ label: 'Apply to drive', href: '/drive-with-us' }}
        secondary={{ label: 'Partner on training', href: '/contact?interest=partnership' }}
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Strategic areas of inclusion"
              title="Ten pathways, one value chain"
              lead="Every role in a mobility business is a role a woman can hold. These are the pathways DriveHer recruits and trains for."
            />
            <ol className="mt-8 space-y-px overflow-hidden rounded-2xl ring-1 ring-line">
              {womenPathways.map((pathway, i) => (
                <li
                  key={pathway}
                  className="flex items-center gap-4 bg-white p-4 transition-colors hover:bg-canvas"
                >
                  <span className="font-display text-xs font-bold tabular-nums text-green-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.9375rem] text-ink">{pathway}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-line shadow-[var(--shadow-card)]">
              <Image
                src="/images/women-training.jpg"
                alt="A DriveHer driver at the wheel of a branded vehicle while a female technician in high-visibility clothing works at the charging bay."
                width={1200}
                height={789}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-8 space-y-5">
              {inclusionAreas.map((area) => (
                <div key={area.title} className="border-l-2 border-green-500 pl-5">
                  <h3 className="text-base">{area.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {area.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Academy */}
      <Section tone="dark" id="academy">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            tone="dark"
            eyebrow="DriveHer Academy"
            title="Training that ends in a certificate, a job and a career."
            lead="Participants receive professional training before deployment, so that service quality, operational efficiency and safety compliance are consistent from the first day of operation."
          />

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-300">
              Training tracks
            </p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {academyTracks.map((track) => (
                <CheckItem key={track} tone="dark">
                  {track}
                </CheckItem>
              ))}
            </ul>

            <div className="mt-9 rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
              <p className="text-[0.9375rem] leading-relaxed text-navy-100/85">
                This approach enables women not only to earn income but to build
                long-term economic assets — and to contribute to the growth of a
                green economy that did not previously have a place for them.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Social impact */}
      <Section tone="canvas">
        <SectionHeading
          eyebrow="Expected outcomes"
          title="What changes when women hold the wheel"
          lead="The programme's social objectives are stated, measurable and reported against — not left as ambition."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {impact.social.map((outcome) => (
            <li key={outcome}>
              <Card tone="outline" className="h-full">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-7 w-7 text-green-600"
                >
                  <circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  <path
                    d="M12 12.2V21m-3-3.2h6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink">
                  {outcome}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        eyebrow="Join the programme"
        title="If you can drive, we can build a career around it."
        body="Applications are open for professional drivers, trainee drivers, technicians, dispatchers and hub operators across Yenagoa, Asaba and Warri."
        primary={{ label: 'Apply to drive with DriveHer', href: '/drive-with-us' }}
        secondary={{ label: 'See the Delta programme', href: '/programmes/delta' }}
      />
    </>
  );
}
