/**
 * Single source of truth for site-wide identity, navigation and contact data.
 * Anything that appears in more than one place lives here so copy changes are
 * made once.
 */

/**
 * Canonical origin for the site.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — the explicit setting, always wins.
 *   2. NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL — the project's production
 *      domain, injected by Vercel when system environment variables are
 *      exposed.
 *   3. NEXT_PUBLIC_VERCEL_URL — the per-deployment URL, so preview builds get
 *      correct canonical and OpenGraph URLs with no configuration.
 *   4. The hard-coded production domain.
 *
 * Every candidate is validated rather than trusted. An environment variable
 * that exists but is empty, whitespace, or not a usable URL is treated as
 * absent — `??` alone would accept `''` and hand an invalid value to
 * `new URL()` in the root layout, which fails the production build with a
 * cryptic ERR_INVALID_URL during page-data collection.
 *
 * Only NEXT_PUBLIC_* variables are read here. This module is imported by
 * client components, and a server-only variable would resolve differently on
 * each side of the boundary.
 */
const FALLBACK_SITE_URL = 'https://driveher.ng';

function normaliseSiteUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  // Vercel supplies bare hostnames (`my-app.vercel.app`) with no protocol, so
  // add one — but only when no scheme is present at all. Prepending to a value
  // that already carries a scheme would turn `ftp://host` into the valid but
  // nonsensical `https://ftp//host` instead of rejecting it.
  const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
  const candidate = hasScheme ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(candidate);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (!url.hostname) return null;
    // Keep a sub-path deployment, drop a meaningless trailing slash.
    return url.pathname === '/'
      ? url.origin
      : `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
  } catch {
    return null;
  }
}

export const SITE_URL =
  normaliseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normaliseSiteUrl(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
  normaliseSiteUrl(process.env.NEXT_PUBLIC_VERCEL_URL) ??
  FALLBACK_SITE_URL;

// Surface a misconfigured value at build time instead of letting it silently
// change every canonical URL on the site. Server-side only, so it never ships
// to the browser console.
if (
  typeof window === 'undefined' &&
  process.env.NEXT_PUBLIC_SITE_URL !== undefined &&
  normaliseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) === null
) {
  console.warn(
    `[site] NEXT_PUBLIC_SITE_URL is set but unusable (received ${JSON.stringify(
      process.env.NEXT_PUBLIC_SITE_URL,
    )}). Falling back to ${SITE_URL}. Set it to a full origin, e.g. https://driveher.ng`,
  );
}

export const site = {
  legalName: 'DriveHer Urban Mobility Services Limited',
  name: 'DriveHer',
  shortName: 'DriveHer',
  tagline: 'Driving Women. Powering Communities.',
  altTagline: 'Driving Hope. Fueling Futures.',
  description:
    "DriveHer is building Africa's first women-centred integrated smart mobility ecosystem — electric and CNG fleets, solar-powered energy hubs, digital payments and a women's enterprise pipeline across Bayelsa and Delta State, Nigeria.",
  url: SITE_URL,
  email: 'info@driveher.ng',
  phone: '+2349061914708',
  phoneDisplay: '+234 906 191 4708',
  address: {
    street: 'Yenagoa',
    locality: 'Bayelsa State',
    region: 'Bayelsa',
    country: 'NG',
    countryName: 'Nigeria',
  },
  founded: '2025',
  social: {
    linkedin: 'https://www.linkedin.com/company/driveher',
    x: 'https://x.com/driveherng',
    instagram: 'https://www.instagram.com/driveherng',
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  items: NavItem[];
};

export const primaryNav: NavGroup[] = [
  {
    label: 'Programmes',
    href: '/programmes',
    items: [
      {
        label: 'DriveHer Bayelsa',
        href: '/programmes/bayelsa',
        description:
          'BWGMI — electric mobility and solar energy hubs, in partnership with Bayelsa State.',
      },
      {
        label: 'DriveHer Delta',
        href: '/programmes/delta',
        description:
          'DWCMI — CNG clean mobility and lease-to-own for 100 women in Asaba and Warri.',
      },
      {
        label: 'All programmes',
        href: '/programmes',
        description: 'How the state programmes fit into one national platform.',
      },
    ],
  },
  {
    label: 'Ecosystem',
    href: '/ecosystem',
    items: [
      {
        label: 'The eight business lines',
        href: '/ecosystem',
        description:
          'Ride, Transport, Logistics, Fleet, Pay, Tech, Academy and Green.',
      },
      {
        label: 'Technology platform',
        href: '/ecosystem#technology',
        description:
          'Dispatch engine, configurable pricing rules and fleet intelligence.',
      },
      {
        label: 'Energy infrastructure',
        href: '/ecosystem#energy',
        description: 'Solar PV, battery storage and DC fast charging.',
      },
    ],
  },
  {
    label: 'Women',
    href: '/women',
    items: [
      {
        label: 'Empowerment framework',
        href: '/women',
        description: 'Nine career pathways across the mobility value chain.',
      },
      {
        label: 'DriveHer Academy',
        href: '/women#academy',
        description: 'Training, certification and leadership development.',
      },
      {
        label: 'Drive with us',
        href: '/drive-with-us',
        description: 'Lease-to-own and owner-driver applications.',
      },
    ],
  },
  {
    label: 'Impact',
    href: '/impact',
    items: [
      {
        label: 'Economic, social & environmental',
        href: '/impact',
        description: 'What the programme is designed to deliver, and how.',
      },
      {
        label: 'Governance & monitoring',
        href: '/impact#governance',
        description: 'Steering committee, PMO and the M&E framework.',
      },
    ],
  },
  {
    label: 'Invest',
    href: '/investors',
    items: [
      {
        label: 'Pre-seed round',
        href: '/investors',
        description: '₦7.5 million to build the platform and pilot foundation.',
      },
      {
        label: 'Partner with us',
        href: '/partners',
        description: 'Government, PPP, development finance and corporates.',
      },
    ],
  },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Programmes',
    items: [
      { label: 'DriveHer Bayelsa (BWGMI)', href: '/programmes/bayelsa' },
      { label: 'DriveHer Delta (DWCMI)', href: '/programmes/delta' },
      { label: 'Expansion roadmap', href: '/programmes#roadmap' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About DriveHer', href: '/about' },
      { label: 'The ecosystem', href: '/ecosystem' },
      { label: 'Impact', href: '/impact' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Get involved',
    items: [
      { label: 'Investors', href: '/investors' },
      { label: 'Government & PPP', href: '/partners' },
      { label: 'Women drivers', href: '/drive-with-us' },
      { label: 'Corporate & logistics', href: '/contact?interest=corporate' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy notice', href: '/legal/privacy' },
      { label: 'Terms of use', href: '/legal/terms' },
    ],
  },
];

/** Audiences the site is designed to convert, in priority order. */
export const audiences = [
  {
    id: 'investors',
    label: 'Investors',
    href: '/investors',
    headline: 'Back the pre-seed round',
    copy: '₦7.5M pre-seed to build the platform, corporate structure and pilot foundation of a multi-line mobility business.',
    cta: 'Request the deck',
  },
  {
    id: 'government',
    label: 'Government & PPP',
    href: '/partners',
    headline: 'Structure a partnership',
    copy: 'A PPP-ready model that delivers women’s empowerment, clean energy and transport data without carrying the full capital burden.',
    cta: 'Open a conversation',
  },
  {
    id: 'women',
    label: 'Women drivers',
    href: '/drive-with-us',
    headline: 'Earn, grow, own',
    copy: 'Professional training, a vehicle on lease-to-own terms and a clear pathway from driver to fleet owner.',
    cta: 'Apply to drive',
  },
  {
    id: 'corporate',
    label: 'Riders & corporates',
    href: '/contact?interest=corporate',
    headline: 'Move your people',
    copy: 'Staff transport, airport transfers, executive mobility and last-mile logistics on one accountable platform.',
    cta: 'Get a quote',
  },
] as const;
