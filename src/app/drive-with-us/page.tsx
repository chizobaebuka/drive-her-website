import { LeadForm } from '@/components/forms/LeadForm';
import { Faq } from '@/components/marketing/Faq';
import { PageHero } from '@/components/marketing/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { Card, CheckItem } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Drive with us — earn, grow, own',
  description:
    'Apply to drive with DriveHer in Yenagoa, Asaba or Warri. Professional training, a vehicle on lease-to-own terms, automatic repayment from earnings and a clear pathway to ownership.',
  path: '/drive-with-us',
  keywords: [
    'driver jobs Nigeria women',
    'lease to own car Nigeria',
    'female driver recruitment Warri Asaba',
    'ride hailing driver Yenagoa',
  ],
});

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Drive with us', path: '/drive-with-us' },
];

const steps = [
  {
    title: 'Apply',
    body: 'Send us your details and the city you are in. It takes two minutes and there is no fee at any stage.',
  },
  {
    title: 'Screening & interview',
    body: 'We check your licence, driving history and availability, then meet you — in person or by phone.',
  },
  {
    title: 'Training & certification',
    body: 'Professional driving, road safety, customer service, digital and financial literacy through the DriveHer Academy.',
  },
  {
    title: 'Choose your track',
    body: 'Join as an owner driver with your own vehicle, or as a DriveHer lease partner on lease-to-own terms.',
  },
  {
    title: 'Deployment',
    body: 'You go live on the platform with a branded vehicle, dispatch support and a maintenance network behind you.',
  },
  {
    title: 'Grow',
    body: 'Progress into supervision, dispatch, technical roles or fleet ownership as your record builds.',
  },
];

const requirements = [
  'A valid Nigerian driver’s licence',
  'Willingness to complete the full training programme',
  'Availability for regular commercial driving hours',
  'A smartphone able to run the DriveHer driver app',
  'Clean driving record and valid identification',
  'Based in or able to relocate to Yenagoa, Asaba or Warri',
];

const driverFaqs = [
  {
    question: 'Does it cost anything to apply?',
    answer:
      'No. Applying, screening and selection are free. DriveHer will never ask you to pay a fee to be considered for the programme. If anyone requests payment on our behalf, please report it to us immediately.',
  },
  {
    question: 'Do I need my own car?',
    answer:
      'No. There are two tracks. Owner drivers bring their own vehicle and keep normal earnings. DriveHer lease partners are allocated a programme vehicle and repay it automatically from daily earnings until they own it outright.',
  },
  {
    question: 'How does the lease repayment work?',
    answer:
      'Repayment is deducted automatically by the platform from your daily revenue before payout — so there is no cash to collect, no missed instalment and a clean repayment record that helps you access finance later.',
  },
  {
    question: 'What training will I receive?',
    answer:
      'Professional driving and road safety, customer relations and service excellence, fleet operations, digital mobility systems, renewable energy awareness, business management, financial literacy, and leadership and professional development.',
  },
  {
    question: 'Do I only get ride-hailing work?',
    answer:
      'No. The platform routes ride-hailing, corporate staff transport, airport transfers, government mobility and delivery work to the same fleet, which is how utilisation — and therefore earnings — stays high through the day.',
  },
  {
    question: 'Which cities are recruiting?',
    answer:
      'Yenagoa in Bayelsa State under the BWGMI electric mobility programme, and Asaba and Warri in Delta State under the DWCMI CNG programme. Register your interest even if your city is not listed — we expand by local government area.',
  },
];

export default function DriveWithUsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Drive with DriveHer"
        title={
          <>
            Earn. Grow. <span className="text-gradient-green">Own.</span>
          </>
        }
        lead="A vehicle, professional training, steady work routed to you by the platform, and repayment that comes out of earnings automatically — so the car you drive today can be the car you own tomorrow."
        breadcrumbs={breadcrumbs}
        primary={{ label: 'Apply now', href: '#apply' }}
        secondary={{ label: 'How the programme works', href: '/programmes/delta' }}
      />

      {/* Value props */}
      <Section tone="light">
        <SectionHeading
          eyebrow="What you get"
          title="More than a job on an app"
          lead="Most platforms give you a login and leave you to it. DriveHer gives you a training programme, a vehicle route to ownership, a maintenance network and a community of women doing the same work."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'A vehicle you can own',
              body: 'Lease-to-own terms with affordable daily payments deducted at source, and a defined pathway to full ownership.',
            },
            {
              title: 'Professional training',
              body: 'Driving, safety, customer service, digital tools and financial literacy — certified before you deploy.',
            },
            {
              title: 'Work that finds you',
              body: 'Ride-hailing, corporate transport, airport transfers and delivery routed through one app.',
            },
            {
              title: 'Cheaper fuel',
              body: 'CNG dual-fuel in Delta and solar-powered charging in Bayelsa — a materially lower cost per kilometre.',
            },
            {
              title: '24/7 support',
              body: 'Maintenance support and operational assistance so a breakdown does not cost you a week of income.',
            },
            {
              title: 'A career, not a shift',
              body: 'Progression into supervision, dispatch, technical roles, training and fleet ownership.',
            },
          ].map((item) => (
            <li key={item.title}>
              <Card className="h-full">
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                  {item.body}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Process */}
      <Section tone="dark">
        <SectionHeading
          tone="dark"
          eyebrow="How it works"
          title="Six steps from application to the driver's seat"
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl bg-white/[0.05] p-6 ring-1 ring-white/10"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-500/15 font-display text-sm font-bold text-green-300 ring-1 ring-green-400/30">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg text-white">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-100/80">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Apply */}
      <Section tone="canvas" id="apply">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Apply"
              title="Register your interest"
              lead="Fill this in and a member of the recruitment team will contact you about the next intake in your city."
            />

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                What you need
              </p>
              <ul className="mt-4 space-y-2.5">
                {requirements.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </div>

            <div className="mt-9 rounded-2xl border-l-4 border-magenta-500 bg-white p-6 ring-1 ring-line">
              <h3 className="text-base">Applying is always free</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                DriveHer never charges a fee to apply, train or be selected. If
                anyone asks you to pay to join the programme, do not pay —
                report it to{' '}
                <a
                  href="mailto:info@driveher.ng"
                  className="font-semibold text-green-700 underline underline-offset-2"
                >
                  info@driveher.ng
                </a>
                .
              </p>
            </div>
          </div>

          <LeadForm
            defaultInterest="driver"
            heading="Driver application"
            submitLabel="Submit application"
            source="/drive-with-us"
          />
        </div>
      </Section>

      <Faq
        items={driverFaqs}
        title="Questions from drivers"
        lead="What women ask us before they apply."
      />
    </>
  );
}
