import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 72px',
          background:
            'linear-gradient(135deg, #051426 0%, #08203a 45%, #12503a 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#2fa84f',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            D
          </div>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>
            <span>Drive</span>
            <span style={{ color: '#75d193' }}>Her</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              maxWidth: 940,
            }}
          >
            Africa&apos;s first women-centred integrated mobility ecosystem
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              color: '#adc8e7',
              maxWidth: 900,
            }}
          >
            Electric and CNG fleets · Solar energy hubs · Ride-hailing,
            logistics and fleet management · Bayelsa &amp; Delta State, Nigeria
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.18)',
            paddingTop: 26,
            fontSize: 23,
          }}
        >
          <span style={{ color: '#75d193', fontWeight: 700 }}>
            {site.tagline}
          </span>
          <span style={{ color: '#7ba3d3' }}>driveher.ng</span>
        </div>
      </div>
    ),
    size,
  );
}
