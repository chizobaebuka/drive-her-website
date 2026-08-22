import { PageHero } from '@/components/marketing/PageHero';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Terms of use',
  description:
    'The terms on which DriveHer Urban Mobility Services Limited makes this website and its content available.',
  path: '/legal/terms',
});

const LAST_UPDATED = '21 August 2026';

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        lead={`The terms on which we make this website available. Last updated ${LAST_UPDATED}.`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Terms of use', path: '/legal/terms' },
        ]}
      />

      <Section tone="light">
        <div className="prose-dh max-w-3xl">
          <h2>Who we are</h2>
          <p>
            This website is operated by {site.legalName}, a company registered in
            Nigeria. By accessing or using the site you accept these terms. If
            you do not accept them, please do not use the site.
          </p>

          <h2>Nature of the information on this site</h2>
          <p>
            The content on this website is provided for general information about
            DriveHer, its programmes and its plans. In particular:
          </p>
          <ul>
            <li>
              <strong>Programme figures are targets, not guarantees.</strong>{' '}
              Vehicle numbers, participant numbers, timelines, infrastructure
              specifications and impact figures are planning targets drawn from
              published programme proposals. They depend on partnership
              agreements, regulatory approvals, infrastructure readiness and
              investment availability, and they may change.
            </li>
            <li>
              <strong>Forward-looking statements.</strong> Statements about
              future expansion, performance or impact reflect current intentions
              and assumptions. Actual outcomes may differ materially.
            </li>
            <li>
              <strong>Nothing here is an offer of securities.</strong> Information
              on the investor pages is a general description of a fundraising
              intention. It is not an offer to sell, or a solicitation of an
              offer to buy, any security or investment, and it is not investment,
              legal, tax or financial advice. Any investment would be made only
              under separate formal documentation, and you should take your own
              professional advice.
            </li>
            <li>
              <strong>Illustrative examples.</strong> Earnings, repayment and
              pricing examples are illustrative only. Actual figures vary by
              city, hours worked, demand, fuel and energy cost and applicable
              regulation.
            </li>
            <li>
              <strong>Comparisons.</strong> Any comparison with other platforms
              reflects our assessment of publicly available service offerings at
              the time of writing, and may change.
            </li>
          </ul>

          <h2>Recruitment is free</h2>
          <p>
            DriveHer does not charge any fee to apply to, be trained by or be
            selected for its driver programmes. If anyone asks you to pay a fee
            in connection with a DriveHer application, do not pay and report it
            to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use the site or its forms for any unlawful, fraudulent or abusive
              purpose
            </li>
            <li>
              Submit false information, or another person&apos;s information
              without their permission
            </li>
            <li>
              Attempt to gain unauthorised access to the site, its servers or any
              connected system
            </li>
            <li>
              Introduce malware, attempt denial-of-service, or otherwise
              interfere with the availability of the site
            </li>
            <li>
              Scrape, harvest or systematically extract content except as a
              search engine indexing the site in the ordinary way
            </li>
          </ul>

          <h2>Intellectual property</h2>
          <p>
            The DriveHer name, logo, brand elements, page content, images and
            design are owned by {site.legalName} or licensed to us. You may view
            and print pages for your own information and for the purpose of
            evaluating a possible investment, partnership or application. Any
            other reproduction, distribution or commercial use requires our
            written permission.
          </p>

          <h2>Third-party links</h2>
          <p>
            Where we link to another website, we do so for convenience. We do not
            control those sites and are not responsible for their content or
            their handling of your data.
          </p>

          <h2>Availability and liability</h2>
          <p>
            We aim to keep the site available and accurate but do not guarantee
            that it will be uninterrupted or error-free. To the fullest extent
            permitted by law, we exclude liability for any loss arising from
            reliance on the content of this site. Nothing in these terms excludes
            liability that cannot lawfully be excluded.
          </p>

          <h2>Privacy</h2>
          <p>
            Personal information you submit is handled as described in our{' '}
            <a href="/legal/privacy">privacy notice</a>.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. The version published on
            this page is the one that applies to your use of the site.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the Federal Republic of
            Nigeria, and the Nigerian courts have exclusive jurisdiction over any
            dispute arising from them.
          </p>

          <h2>Contact</h2>
          <p>
            {site.legalName}
            <br />
            {site.address.locality}, {site.address.countryName}
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </Section>
    </>
  );
}
