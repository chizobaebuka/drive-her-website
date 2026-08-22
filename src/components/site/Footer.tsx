import Link from 'next/link';
import { Button, ArrowRight } from '@/components/ui/Button';
import { footerNav, site } from '@/lib/site';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-200">
      {/* Conversion band — the last chance to act before the site ends. */}
      <div className="border-b border-white/10">
        <div className="container-page py-14 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-2xl text-white sm:text-3xl">
                Let&apos;s build the future of mobility in Nigeria — together.
              </h2>
              <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-navy-200/80">
                Whether you invest, govern, drive or ride, there is a way into
                the DriveHer ecosystem. Tell us which one fits and we will come
                back within two working days.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href="/investors" size="lg">
                Investor deck
                <ArrowRight />
              </Button>
              <Button href="/contact" variant="outlineOnDark" size="lg">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.4fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-navy-200/80">
              {site.legalName}. Building Africa&apos;s first women-centred
              integrated smart mobility ecosystem.
            </p>
            <p className="mt-5 font-display text-lg font-semibold text-green-400">
              {site.tagline}
            </p>

            <address className="mt-7 space-y-2 text-sm not-italic text-navy-200/80">
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${site.phone}`}
                  className="transition-colors hover:text-white"
                >
                  {site.phoneDisplay}
                </a>
              </p>
              <p>
                {site.address.locality} &middot; {site.address.countryName}
              </p>
            </address>

            <ul className="mt-6 flex gap-3">
              {[
                { label: 'LinkedIn', href: site.social.linkedin },
                { label: 'X', href: site.social.x },
                { label: 'Instagram', href: site.social.instagram },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full px-3 py-1.5 text-xs font-semibold text-navy-200 ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-navy-200/80 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-navy-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved. Registered in
            Nigeria.
          </p>
          <p className="max-w-xl sm:text-right">
            Programme figures, timelines and impact numbers on this site are
            planning targets from published proposals and are not guarantees of
            future performance.
          </p>
        </div>
      </div>
    </footer>
  );
}
