import 'server-only';
import { interestLabels, type LeadInput } from './validation';
import { site } from './site';

/**
 * Pluggable notification transport.
 *
 * Configure ONE of the following in the deployment environment:
 *
 *   RESEND_API_KEY   — sends via the Resend HTTP API (no SMTP port needed).
 *   LEAD_WEBHOOK_URL — POSTs the lead JSON to a webhook (Zapier, Make, n8n,
 *                      a CRM endpoint, or your own drive-her API).
 *
 * With neither set, the lead is written to the server log so nothing is lost
 * in development. No secret is ever exposed to the browser — this module is
 * server-only and every key is read from process.env at request time.
 */

const LEAD_TO = process.env.LEAD_TO_EMAIL ?? site.email;
const LEAD_FROM = process.env.LEAD_FROM_EMAIL ?? `DriveHer Website <onboarding@resend.dev>`;

export type DeliveryResult = { delivered: boolean; channel: string };

export async function deliverLead(
  lead: LeadInput,
  meta: { ip: string; userAgent: string; receivedAt: string },
): Promise<DeliveryResult> {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;

  if (webhook) {
    await postWebhook(webhook, lead, meta);
    return { delivered: true, channel: 'webhook' };
  }

  if (resendKey) {
    await sendViaResend(resendKey, lead, meta);
    return { delivered: true, channel: 'email' };
  }

  // Development fallback. Never log the raw message body in production.
  console.info(
    '[lead] no transport configured — captured:',
    JSON.stringify({
      name: lead.name,
      email: lead.email,
      interest: lead.interest,
      organisation: lead.organisation,
      receivedAt: meta.receivedAt,
    }),
  );
  return { delivered: false, channel: 'log' };
}

async function postWebhook(
  url: string,
  lead: LeadInput,
  meta: { ip: string; userAgent: string; receivedAt: string },
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { 'x-driveher-signature': process.env.LEAD_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({ lead, meta }),
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Webhook responded ${res.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

async function sendViaResend(
  apiKey: string,
  lead: LeadInput,
  meta: { ip: string; userAgent: string; receivedAt: string },
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: LEAD_FROM,
        to: [LEAD_TO],
        reply_to: lead.email,
        subject: `[${interestLabels[lead.interest]}] ${lead.name}`,
        text: plainTextBody(lead, meta),
      }),
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 200)}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Plain text only — deliberately no HTML email body, so no user-supplied
 * string is ever interpolated into markup anywhere in the pipeline.
 */
function plainTextBody(
  lead: LeadInput,
  meta: { ip: string; userAgent: string; receivedAt: string },
): string {
  return [
    `New enquiry from the DriveHer website`,
    ``,
    `Interest:      ${interestLabels[lead.interest]}`,
    `Name:          ${lead.name}`,
    `Email:         ${lead.email}`,
    `Phone:         ${lead.phone || '—'}`,
    `Organisation:  ${lead.organisation || '—'}`,
    `Location:      ${lead.location || '—'}`,
    `Page:          ${lead.source || '—'}`,
    ``,
    `Message:`,
    lead.message,
    ``,
    `---`,
    `Received:      ${meta.receivedAt}`,
    `IP:            ${meta.ip}`,
    `User agent:    ${meta.userAgent.slice(0, 200)}`,
  ].join('\n');
}
