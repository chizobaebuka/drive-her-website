import { PageHero } from '@/components/marketing/PageHero';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Privacy notice',
  description:
    'How DriveHer Urban Mobility Services Limited collects, uses, stores and protects personal information submitted through this website, under the Nigeria Data Protection Act.',
  path: '/legal/privacy',
});

const LAST_UPDATED = '21 August 2026';

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy notice"
        lead={`How we handle personal information collected through ${site.url.replace('https://', '')}. Last updated ${LAST_UPDATED}.`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Privacy notice', path: '/legal/privacy' },
        ]}
      />

      <Section tone="light">
        <div className="prose-dh max-w-3xl">
          <p>
            {site.legalName} (&ldquo;DriveHer&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;) is the data controller for personal information
            submitted through this website. This notice explains what we
            collect, why, how long we keep it and what rights you have. It is
            written to align with the Nigeria Data Protection Act 2023 and, where
            applicable, comparable data protection standards.
          </p>

          <h2>What we collect</h2>
          <p>
            We collect only the information you choose to give us through a form
            on this site:
          </p>
          <ul>
            <li>Your name and email address (required to reply to you)</li>
            <li>Your phone number, organisation and location (optional)</li>
            <li>The category of enquiry you select and the message you write</li>
            <li>
              The page you submitted from, so we understand which content is
              useful
            </li>
          </ul>
          <p>
            Our server also records the IP address and browser user agent of the
            submission. We use these solely to detect and block automated abuse
            of the form, and they are not used to build a profile of you.
          </p>

          <h2>What we do not collect</h2>
          <ul>
            <li>
              <strong>No advertising or tracking cookies.</strong> This site sets
              no cookies for advertising, profiling or cross-site tracking.
            </li>
            <li>
              <strong>No third-party analytics by default.</strong> If we later
              add privacy-respecting analytics, this notice will be updated
              before it goes live.
            </li>
            <li>
              <strong>No special category data.</strong> Please do not send us
              health, biometric, financial account or other sensitive
              information through the website form.
            </li>
          </ul>

          <h2>Why we use it</h2>
          <p>
            We process your information to respond to your enquiry, to send you
            the materials you requested (for example, an investor deck or
            programme proposal), to keep an internal record of the conversation,
            and to protect the website from abuse. Our lawful basis is your
            consent, given when you tick the consent box, together with our
            legitimate interest in operating a secure website and responding to
            business enquiries.
          </p>

          <h2>Who we share it with</h2>
          <p>
            We do not sell your personal information and we do not share it for
            marketing purposes. We share it only with:
          </p>
          <ul>
            <li>
              Members of the DriveHer team who need it to answer your enquiry
            </li>
            <li>
              Our email delivery or workflow provider, acting on our instructions
              solely to deliver the message to us
            </li>
            <li>
              Regulators, auditors or legal advisers where we are legally
              required to do so
            </li>
          </ul>

          <h2>How long we keep it</h2>
          <p>
            Enquiries are retained for up to 24 months from your last contact
            with us, after which they are deleted or anonymised. Records relating
            to an investment, partnership or employment relationship may be kept
            longer where law or legitimate business need requires it.
          </p>

          <h2>How we protect it</h2>
          <p>
            The site is served over HTTPS with strict transport security. Form
            submissions are validated and rate-limited on the server, the site
            enforces a content security policy, and access to enquiry data is
            limited to the people who need it. No system is perfectly secure, but
            we take reasonable technical and organisational measures appropriate
            to the sensitivity of the data.
          </p>

          <h2>Your rights</h2>
          <p>
            You may ask us to give you a copy of the information we hold about
            you, correct it if it is wrong, delete it, restrict or object to how
            we use it, or withdraw your consent at any time. Withdrawing consent
            does not affect processing carried out before you withdrew it.
          </p>
          <p>
            To exercise any of these rights, email{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>. We will respond
            within 30 days. If you are not satisfied with our response, you may
            complain to the Nigeria Data Protection Commission.
          </p>

          <h2>Children</h2>
          <p>
            This website is intended for adults and for organisations. We do not
            knowingly collect information from anyone under 18. If you believe a
            child has submitted information to us, contact us and we will delete
            it.
          </p>

          <h2>Changes to this notice</h2>
          <p>
            If we change how we handle personal information we will update this
            page and change the date at the top. Material changes will be
            highlighted on the page.
          </p>

          <h2>Contact</h2>
          <p>
            {site.legalName}
            <br />
            {site.address.locality}, {site.address.countryName}
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          </p>
        </div>
      </Section>
    </>
  );
}
