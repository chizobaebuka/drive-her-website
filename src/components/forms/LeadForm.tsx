'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight } from '@/components/ui/Button';
import { INTERESTS, interestLabels, type Interest } from '@/lib/interests';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const fieldBase =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/12';

export function LeadForm({
  defaultInterest = 'general',
  heading,
  submitLabel = 'Send enquiry',
  compact = false,
  source,
}: {
  defaultInterest?: Interest;
  heading?: string;
  submitLabel?: string;
  compact?: boolean;
  source?: string;
}) {
  const uid = useId();
  const mountedAt = useRef<number>(0);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [interest, setInterest] = useState<Interest>(defaultInterest);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Allow an inbound link like /contact?interest=corporate to preselect.
  //
  // This genuinely has to run after hydration. Reading the query string during
  // render would diverge from the server-rendered markup, and `useSearchParams`
  // would opt the whole page out of static generation — a much larger cost than
  // one extra render on the small subset of visits that arrive with the
  // parameter set.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('interest');
    if (param && (INTERESTS as readonly string[]).includes(param)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
      setInterest(param as Interest);
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrors({});
    setMessage('');

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      phone: String(form.get('phone') ?? ''),
      organisation: String(form.get('organisation') ?? ''),
      location: String(form.get('location') ?? ''),
      interest,
      message: String(form.get('message') ?? ''),
      consent: form.get('consent') === 'on',
      company: String(form.get('company') ?? ''),
      elapsed: Date.now() - mountedAt.current,
      source: source ?? window.location.pathname,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: { ok?: boolean; error?: string; fieldErrors?: Record<string, string> } =
        await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus('success');
        return;
      }

      setStatus('error');
      setErrors(data.fieldErrors ?? {});
      setMessage(
        data.error ??
          'Something went wrong sending your message. Please try again.',
      );
    } catch {
      setStatus('error');
      setMessage(
        'We could not reach the server. Check your connection and try again.',
      );
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
            <path
              d="M5 12.5 10 17.5 19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-5 text-xl text-navy-900">Message received</h3>
        <p className="mx-auto mt-2 max-w-md text-[0.9375rem] leading-relaxed text-body">
          Thank you. A member of the DriveHer team will come back to you within
          two working days. For anything urgent, call us on{' '}
          <a
            href="tel:+2349061914708"
            className="font-semibold text-green-700 underline underline-offset-2"
          >
            +234 906 191 4708
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8"
    >
      {heading ? (
        <h3 className="mb-6 text-xl text-navy-900">{heading}</h3>
      ) : null}

      {/* Honeypot — hidden from people and from assistive technology. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company (leave this empty)</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={cn('grid gap-5', compact ? '' : 'sm:grid-cols-2')}>
        <Field
          id={`${uid}-name`}
          name="name"
          label="Full name"
          autoComplete="name"
          required
          error={errors.name}
        />
        <Field
          id={`${uid}-email`}
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          required
          error={errors.email}
        />
        <Field
          id={`${uid}-phone`}
          name="phone"
          type="tel"
          label="Phone"
          hint="Optional"
          autoComplete="tel"
          error={errors.phone}
        />
        <Field
          id={`${uid}-organisation`}
          name="organisation"
          label="Organisation"
          hint="Optional"
          autoComplete="organization"
          error={errors.organisation}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor={`${uid}-interest`}
          className="mb-1.5 block text-sm font-semibold text-navy-900"
        >
          What would you like to talk about?
        </label>
        <select
          id={`${uid}-interest`}
          name="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value as Interest)}
          className={cn(fieldBase, 'appearance-none bg-[right_1rem_center] pr-10')}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5 6 8l3.5-3.5' fill='none' stroke='%236b7a87' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '12px',
          }}
        >
          {INTERESTS.map((value) => (
            <option key={value} value={value}>
              {interestLabels[value]}
            </option>
          ))}
        </select>
        {errors.interest ? <FieldError>{errors.interest}</FieldError> : null}
      </div>

      {interest === 'driver' ? (
        <div className="mt-5">
          <Field
            id={`${uid}-location`}
            name="location"
            label="Which city are you in?"
            hint="e.g. Yenagoa, Asaba, Warri"
            error={errors.location}
          />
        </div>
      ) : null}

      <div className="mt-5">
        <label
          htmlFor={`${uid}-message`}
          className="mb-1.5 block text-sm font-semibold text-navy-900"
        >
          Message <span className="text-magenta-500">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={compact ? 4 : 5}
          required
          maxLength={4000}
          placeholder={placeholderFor(interest)}
          aria-invalid={Boolean(errors.message)}
          className={cn(fieldBase, 'resize-y')}
        />
        {errors.message ? <FieldError>{errors.message}</FieldError> : null}
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input
          id={`${uid}-consent`}
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4.5 w-4.5 shrink-0 rounded border-line text-green-600 focus:ring-green-500/30"
        />
        <label
          htmlFor={`${uid}-consent`}
          className="text-[0.8125rem] leading-relaxed text-muted"
        >
          I agree that DriveHer may store these details and contact me about
          this enquiry, as described in the{' '}
          <a
            href="/legal/privacy"
            className="font-medium text-green-700 underline underline-offset-2"
          >
            privacy notice
          </a>
          .
        </label>
      </div>
      {errors.consent ? <FieldError>{errors.consent}</FieldError> : null}

      {status === 'error' && message ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-magenta-300 bg-magenta-100 px-4 py-3 text-sm text-magenta-700"
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_24px_-12px_rgba(27,127,59,0.9)] transition hover:bg-green-700 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowRight />
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-muted">
        We reply within two working days. We never sell or share your details.
      </p>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function Field({
  id,
  name,
  label,
  type = 'text',
  hint,
  required = false,
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  hint?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-semibold text-navy-900"
      >
        <span>
          {label} {required ? <span className="text-magenta-500">*</span> : null}
        </span>
        {hint ? (
          <span className="text-xs font-normal text-muted">{hint}</span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldBase, error && 'border-magenta-500')}
      />
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-magenta-700">
      {children}
    </p>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 animate-spin">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function placeholderFor(interest: Interest): string {
  switch (interest) {
    case 'investment':
      return 'Tell us about your fund or ticket size and what you would like to see — deck, financial model, or a call.';
    case 'government':
      return 'Which State, ministry or agency are you writing from, and what would you like to explore?';
    case 'partnership':
      return 'What does your organisation supply or fund — vehicles, energy systems, financing, technology?';
    case 'driver':
      return 'Tell us about your driving experience and whether you are interested in lease-to-own.';
    case 'corporate':
      return 'How many staff or trips per week, which routes, and when would you want to start?';
    default:
      return 'How can we help?';
  }
}
