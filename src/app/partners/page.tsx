import Image from 'next/image';
import { LeadForm } from '@/components/forms/LeadForm';
import { PageHero } from '@/components/marketing/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { Card, CheckItem } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { governance, pppRoles } from '@/lib/content';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Partners — the Public–Private Partnership framework',
  description:
    'DriveHer is structured as a PPP: government provides the enabling environment, DriveHer develops and operates, private partners supply and finance, and development partners bring technical and climate finance.',
  path: '/partners',
  keywords: [
    'public private partnership transport Nigeria',
    'PPP mobility',
    'development finance mobility Africa',
    'state government transport partnership',
  ],
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Partners', path: '/partners' },
];

const partnerTypes = [
  {
    title: 'State governments & MDAs',
    body: 'Policy and regulatory support, site allocation, permits, and integration with existing transport and women’s empowerment programmes.',
    cta: 'government' as const,
  },
  {
    title: 'Development finance & climate funds',
    body: 'Technical assistance, capacity building, pilot grant funding, climate and renewable energy financing, and impact assessment.',
    cta: 'partnership' as const,
  },
  {
    title: 'Vehicle, energy & technology suppliers',
    body: 'Electric and CNG vehicle supply, solar systems, battery storage, charging infrastructure, telematics and payment integration.',
    cta: 'partnership' as const,
  },
  {
    title: 'Financial institutions & insurers',
    body: 'Fleet financing, lease book participation, driver credit products, insurance and risk cover.',
    cta: 'partnership' as const,
  },
  {
    title: 'Corporates & institutions',
    body: 'Staff transport contracts, airport transfers, executive mobility, logistics and distribution.',
    cta: 'corporate' as const,
  },
  {
    title: 'Communities & women’s associations',
    body: 'Recruitment, local ownership, advocacy and ensuring services respond to real community needs.',
    cta: 'general' as const,
  },
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Partnership"
        title={
          <>
            A partnership model that spreads the risk and{' '}
            <span className="text-gradient-green">multiplies the return</span>.
          </>
        }
        lead="Rather than operating as a government-funded transport programme, DriveHer is designed as a Public–Private Partnership that draws on the strengths of each stakeholder — reducing the financial burden on government while bringing private sector efficiency and long-term operational sustainability."
        breadcrumbs={breadcrumbs}
        primary={{ label: 'Start a conversation', href: '#enquiry' }}
        secondary={{ label: 'Read the Bayelsa proposal', href: '/programmes/bayelsa' }}
      />

      {/* Roles */}
      <Section tone="light">
        <SectionHeading
          eyebrow="The PPP framework"
          title="Who does what"
          lead="Clear roles are what makes a partnership survive its first difficult quarter. Here is how responsibility is proposed to be divided."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {pppRoles.map((role, i) => (
            <Card key={role.title} className={i === 0 ? 'lg:col-span-2' : ''}>
              <div className="flex items-start gap-5">
                <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 font-display text-sm font-bold text-green-700 ring-1 ring-green-100">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl">{role.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                    {role.body}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-navy-900 p-8 text-white sm:p-10">
          <h3 className="text-xl text-white">A partnership for long-term impact</h3>
          <p className="mt-4 max-w-4xl text-[0.9375rem] leading-relaxed text-navy-100/85">
            Government leadership + private sector innovation + development
            partner expertise + community participation = a sustainable and
            inclusive mobility ecosystem. Combining these creates shared
            responsibility and shared value, and a governance model capable of
            supporting long-term growth while delivering measurable economic,
            social and environmental benefits.
          </p>
        </div>
      </Section>

      {/* Partner types */}
      <Section tone="canvas">
        <SectionHeading
          eyebrow="Who we work with"
          title="Six kinds of partner, one point of entry"
          lead="Tell us which of these describes your organisation and the enquiry routes to the right person on our side."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partnerTypes.map((type) => (
            <li key={type.title}>
              <Card className="flex h-full flex-col">
                <h3 className="text-lg">{type.title}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-body">
                  {type.body}
                </p>
                <a
                  href={`/contact?interest=${type.cta}`}
                  className="mt-6 inline-flex text-sm font-semibold text-green-700 underline-offset-4 hover:underline"
                >
                  Enquire as this partner type
                </a>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Governance */}
      <Section tone="dark" id="governance">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Governance"
              title="Building an institution, not just a project."
              lead="Long-term success depends as much on transparent decision-making and continuous performance monitoring as it does on vehicles and infrastructure."
            />
            <div className="mt-8 space-y-5">
              {governance.map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 border-green-500/50 pl-5"
                >
                  <h3 className="text-base text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-100/75">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-white/15">
            <Image
              src="/images/governance.jpg"
              alt="A DriveHer steering committee meeting with government and private sector representatives around a boardroom table."
              width={1200}
              height={702}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Enquiry */}
      <Section tone="light" id="enquiry">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title="Open a partnership conversation"
              lead="Whether you are a ministry evaluating a proposal, a fund assessing a pipeline or a supplier looking at a fleet order, the first step is the same."
            />
            <ul className="mt-8 space-y-3">
              {[
                'We respond within two working days',
                'Full programme proposals available under NDA where appropriate',
                'Indicative implementation sequence for your state or organisation',
                'Introductions to the relevant DriveHer workstream lead',
              ].map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>

          <LeadForm
            defaultInterest="government"
            heading="Partnership enquiry"
            submitLabel="Send partnership enquiry"
            source="/partners"
          />
        </div>
      </Section>
    </>
  );
}
