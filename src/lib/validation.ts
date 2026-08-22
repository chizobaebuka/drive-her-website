import { z } from 'zod';
import { INTERESTS } from './interests';

/**
 * Server-side contract for every lead submitted through the site.
 *
 * Everything the browser sends is treated as hostile: lengths are bounded so a
 * payload cannot be used to exhaust memory or flood a mailbox, the interest
 * value is an enum rather than free text, and two silent bot checks
 * (`company` honeypot and `elapsed` time-on-form) are validated here rather
 * than in the browser where they could simply be skipped.
 */

/** Rejects control characters that have no place in a name or subject line. */
const noControlChars = (value: string) => !/[\x00-\x1F\x7F]/.test(value);

const safeText = (min: number, max: number, field: string) =>
  z
    .string()
    .trim()
    .min(min, `${field} is required.`)
    .max(max, `${field} must be ${max} characters or fewer.`)
    .refine(noControlChars, `${field} contains characters that aren't allowed.`);

export const leadSchema = z.object({
  name: safeText(2, 80, 'Name'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    // `min` runs before `email`, so it must only catch the empty case —
    // otherwise a short-but-invalid address like "nope" is reported as
    // missing rather than malformed.
    .min(1, 'Email address is required.')
    .max(160, 'Email address is too long.')
    .email('Enter a valid email address.'),

  phone: z
    .string()
    .trim()
    .max(32, 'Phone number is too long.')
    .regex(
      /^[+()\d\s-]*$/,
      'Phone number may only contain digits, spaces and + ( ) -',
    )
    .optional()
    .or(z.literal('')),

  organisation: z
    .string()
    .trim()
    .max(120, 'Organisation must be 120 characters or fewer.')
    .refine(noControlChars, "Organisation contains characters that aren't allowed.")
    .optional()
    .or(z.literal('')),

  interest: z.enum(INTERESTS, {
    error: () => 'Choose what you would like to talk about.',
  }),

  location: z
    .string()
    .trim()
    .max(80, 'Location must be 80 characters or fewer.')
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more — at least 10 characters.')
    .max(4000, 'Message must be 4000 characters or fewer.'),

  consent: z.literal(true, {
    error: () => 'Please confirm you are happy for us to contact you.',
  }),

  /**
   * Honeypot: a real person never sees or fills this field. It deliberately
   * passes schema validation so a bot cannot learn from the error response
   * which signal caught it — the silent check in the route handles it.
   */
  company: z.string().max(200).optional(),

  /** Milliseconds between the form mounting and being submitted. */
  elapsed: z
    .number()
    .int()
    .nonnegative()
    .max(1000 * 60 * 60 * 24, 'Submission rejected.'),

  /** Where the visitor was when they converted — for attribution only. */
  source: z.string().trim().max(120).optional().or(z.literal('')),
});

export type LeadInput = z.infer<typeof leadSchema>;

export { INTERESTS, MIN_FORM_FILL_MS, interestLabels } from './interests';
export type { Interest } from './interests';
