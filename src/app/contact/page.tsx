import { Suspense } from 'react';
import { LeadForm } from '@/components/forms/LeadForm';
import { PageHero } from '@/components/marketing/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { Card } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact DriveHer',
  description:
    'Get in touch with DriveHer Urban Mobility Services Limited about investment, government partnership, driving with us, corporate transport or media enquiries. We reply within two working days.',
  path: '/contact',
  keywords: ['contact DriveHer', 'DriveHer Nigeria contact', 'mobility partnership enquiry'],
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
];

const routes = [
  {
    title: 'Investment',
    body: 'Pre-seed round, pitch deck and Investment Memorandum.',
    href: '/investors',
    linkLabel: 'Investor page',
  },
  {
    title: 'Government & PPP',
    body: 'State partnerships, programme proposals and implementation frameworks.',
    href: '/partners',
    linkLabel: 'Partnership framework',
  },
  {
    title: 'Drive with us',
    body: 'Applications for women drivers, trainees, technicians and hub operators.',
    href: '/drive-with-us',
    linkLabel: 'Driver applications',
  },
  {
    title: 'Corporate & logistics',
    body: 'Staff transport, airport transfers, executive mobility and delivery contracts.',
    href: '/ecosystem',
    linkLabel: 'Services',
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact DriveHer',
            url: `${site.url}/contact`,
            mainEntity: {
              '@type': 'Organization',
              name: site.legalName,
              email: site.email,
              telephone: site.phone,
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  contactType: 'investor relations',
                  email: site.email,
                  availableLanguage: ['en'],
                },
                {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  telephone: site.phone,
                  availableLanguage: ['en'],
                },
              ],
            },
          },
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us what you need.{' '}
            <span className="text-gradient-green">We reply in two days.</span>
          </>
        }
        lead="One form, routed to the right team. Choose what you would like to talk about and your message goes straight to the person who can answer it."
        breadcrumbs={breadcrumbs}
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Reach us directly"
              title="Or skip the form entirely"
              lead="If you would rather email or call, these reach the same team."
            />

            <dl className="mt-8 space-y-5">
              <div className="rounded-2xl bg-canvas p-6 ring-1 ring-line">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lg font-semibold text-navy-900 underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="rounded-2xl bg-canvas p-6 ring-1 ring-line">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${site.phone}`}
                    className="text-lg font-semibold text-navy-900 underline-offset-4 hover:underline"
                  >
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="rounded-2xl bg-canvas p-6 ring-1 ring-line">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  Operating locations
                </dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                  Yenagoa, Bayelsa State
                  <br />
                  Asaba &amp; Warri, Delta State
                  <br />
                  {site.address.countryName}
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                Looking for something specific?
              </p>
              <ul className="mt-4 space-y-3">
                {routes.map((route) => (
                  <li key={route.title}>
                    <Card tone="outline" className="p-5">
                      <h3 className="text-base">{route.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-body">
                        {route.body}
                      </p>
                      <a
                        href={route.href}
                        className="mt-3 inline-flex text-sm font-semibold text-green-700 underline-offset-4 hover:underline"
                      >
                        {route.linkLabel}
                      </a>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <Suspense
              fallback={
                <div className="h-[40rem] animate-pulse rounded-2xl bg-canvas ring-1 ring-line" />
              }
            >
              <LeadForm heading="Send us a message" source="/contact" />
            </Suspense>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              We use the details you provide only to respond to your enquiry and
              to keep a record of the conversation. See the{' '}
              <a
                href="/legal/privacy"
                className="font-medium text-green-700 underline underline-offset-2"
              >
                privacy notice
              </a>{' '}
              for how long we keep it and how to ask us to delete it.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
