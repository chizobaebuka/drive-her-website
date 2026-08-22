/**
 * Enquiry categories, shared by the browser form and the server schema.
 *
 * This module is deliberately dependency-free. `validation.ts` pulls in zod,
 * and the lead form is a client component — importing the labels from there
 * would ship the whole validation library to every visitor who lands on a page
 * with a form. Keeping the plain data here means the client gets a few hundred
 * bytes of constants instead.
 */

export const INTERESTS = [
  'investment',
  'government',
  'partnership',
  'driver',
  'corporate',
  'media',
  'careers',
  'general',
] as const;

export type Interest = (typeof INTERESTS)[number];

export const interestLabels: Record<Interest, string> = {
  investment: 'Investment — pre-seed round',
  government: 'Government / PPP partnership',
  partnership: 'Private sector or development partner',
  driver: 'I want to drive with DriveHer',
  corporate: 'Corporate transport or logistics',
  media: 'Media or speaking request',
  careers: 'Careers',
  general: 'Something else',
};

/** Anything faster than this is a script, not a person. */
export const MIN_FORM_FILL_MS = 2500;
