import type { Metadata } from 'next';
import { SITE_URL, site } from './site';

type PageSeoInput = {
  title: string;
  description: string;
  /** Path beginning with a slash, e.g. `/investors`. */
  path: string;
  keywords?: string[];
  /** Set false for pages that should not be indexed (thank-you pages etc.). */
  index?: boolean;
  type?: 'website' | 'article';
};

/**
 * Builds a complete, canonical-correct metadata object for a page.
 * Keeping this in one place guarantees every route ships OpenGraph, Twitter
 * card, canonical URL and robots directives without per-page drift.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  index = true,
  type = 'website',
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    keywords: [...baseKeywords, ...keywords],
    alternates: { canonical: url },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : { index: false, follow: false },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: 'en_NG',
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export const baseKeywords = [
  'DriveHer',
  'women mobility Nigeria',
  'electric vehicles Bayelsa',
  'CNG transport Delta State',
  'ride hailing Nigeria',
  'clean mobility Africa',
  'women empowerment transport',
  'public private partnership mobility',
];

/* -------------------------------------------------------------------------- */
/*  Structured data (JSON-LD)                                                  */
/* -------------------------------------------------------------------------- */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    slogan: site.tagline,
    description: site.description,
    foundingDate: site.founded,
    email: site.email,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Bayelsa State, Nigeria' },
      { '@type': 'AdministrativeArea', name: 'Delta State, Nigeria' },
    ],
    knowsAbout: [
      'Electric mobility',
      'Compressed natural gas vehicles',
      'Solar energy infrastructure',
      'Ride-hailing',
      'Fleet management',
      "Women's economic empowerment",
    ],
    sameAs: [site.social.linkedin, site.social.x, site.social.instagram],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.name,
    description: site.description,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-NG',
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  areaServed: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    serviceType: 'Urban mobility',
    areaServed: { '@type': 'AdministrativeArea', name: input.areaServed },
    provider: { '@id': `${SITE_URL}/#organization` },
  };
}
