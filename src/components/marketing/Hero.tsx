import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';

const trustPoints = [
  'PPP-ready structure',
  'Bayelsa & Delta State',
  '8 business lines, one platform',
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 grain">
      {/* Decorative corridor lines — the "road" motif from the brand mark. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 700"
      >
        <path
          d="M-100 620C220 470 460 380 760 250s520-200 820-330"
          stroke="url(#g1)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M-100 700C260 540 520 440 840 300s560-220 860-350"
          stroke="url(#g1)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M-100 540C180 410 400 330 700 210S1180 30 1480-80"
          stroke="url(#g1)"
          strokeWidth="1.4"
          fill="none"
          strokeDasharray="6 10"
        />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#43b869" stopOpacity="0" />
            <stop offset="45%" stopColor="#43b869" />
            <stop offset="100%" stopColor="#7ba3d3" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container-page relative py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Eyebrow tone="dark">
              DriveHer Urban Mobility Services Limited
            </Eyebrow>

            <h1 className="mt-5 text-[2.5rem] leading-[1.05] text-white sm:text-5xl lg:text-[3.9rem]">
              Africa&apos;s first{' '}
              <span className="text-gradient-green">women-centred</span>{' '}
              integrated mobility ecosystem.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100/85">
              Electric and CNG fleets. Solar-powered energy hubs. Ride-hailing,
              logistics, fleet management and digital payments on one platform —
              built so that women own the vehicles, run the hubs and lead the
              company.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/investors" size="lg">
                Request the investor deck
                <ArrowRight />
              </Button>
              <Button href="/partners" variant="outlineOnDark" size="lg">
                Partner with DriveHer
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-sm font-medium text-navy-100/75"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-green-400"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/15 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
              <Image
                src="/images/mobility-centre.jpg"
                alt="A DriveHer Mobility Centre with electric vehicles charging under a solar canopy, staffed by women operators."
                width={1200}
                height={932}
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent"
              />
            </div>

            {/* Credential card — stacked under the image on phones, floated
                over its lower-left corner from the small breakpoint up. */}
            <div className="mt-4 rounded-2xl bg-white/95 p-5 shadow-[var(--shadow-lift)] backdrop-blur sm:absolute sm:-bottom-6 sm:-left-6 sm:mt-0 sm:w-64">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-600">
                Pilot programmes
              </p>
              <p className="mt-2 text-sm leading-relaxed text-body">
                <Link
                  href="/programmes/bayelsa"
                  className="font-semibold text-navy-900 underline-offset-2 hover:underline"
                >
                  Bayelsa (EV + solar)
                </Link>{' '}
                and{' '}
                <Link
                  href="/programmes/delta"
                  className="font-semibold text-navy-900 underline-offset-2 hover:underline"
                >
                  Delta (CNG)
                </Link>{' '}
                — proposed in partnership with State Government.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
