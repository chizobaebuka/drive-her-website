'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button, ArrowRight } from '@/components/ui/Button';
import { primaryNav } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close every menu on navigation.
  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setOpenGroup(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
        scrolled
          ? 'border-b border-line bg-white/92 shadow-[0_1px_20px_-10px_rgba(8,32,58,0.4)] backdrop-blur-lg'
          : 'border-b border-transparent bg-white',
      )}
    >
      <div className="container-page">
        <div className="flex h-[4.5rem] items-center justify-between gap-4">
          <Logo showTagline />

          {/* ---------- Desktop navigation ---------- */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((group) => (
                <li
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenGroup(group.label);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={group.href ?? '#'}
                    className={cn(
                      'flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors',
                      isActive(group.href ?? '')
                        ? 'text-green-700'
                        : 'text-navy-800 hover:text-green-700',
                    )}
                    aria-expanded={openGroup === group.label}
                    aria-haspopup="true"
                    onFocus={() => setOpenGroup(group.label)}
                  >
                    {group.label}
                    <svg
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      className={cn(
                        'h-3 w-3 transition-transform duration-200',
                        openGroup === group.label && 'rotate-180',
                      )}
                    >
                      <path
                        d="M2.5 4.5 6 8l3.5-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  <div
                    className={cn(
                      'absolute left-0 top-full w-[22rem] pt-3 transition duration-200',
                      openGroup === group.label
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-1 opacity-0',
                    )}
                  >
                    <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-[var(--shadow-lift)]">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group/item block rounded-xl p-3 transition-colors hover:bg-canvas"
                        >
                          <span className="flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                            {item.label}
                            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                          </span>
                          {item.description ? (
                            <span className="mt-1 block text-[0.8125rem] leading-relaxed text-muted">
                              {item.description}
                            </span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Button href="/contact" variant="ghost" size="sm">
              Contact
            </Button>
            <Button href="/investors" size="sm">
              Investor deck
              <ArrowRight />
            </Button>
          </div>

          {/* ---------- Mobile trigger ---------- */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-line text-navy-800 lg:hidden"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              {open ? (
                <path
                  d="M6 6l12 12M18 6 6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3.5 7h17M3.5 12h17M3.5 17h17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-6">
          <ul className="divide-y divide-line">
            {primaryNav.map((group) => (
              <li key={group.label} className="py-2">
                <details className="group" open={isActive(group.href ?? '')}>
                  <summary className="flex cursor-pointer list-none items-center justify-between py-2.5 text-lg font-semibold text-navy-900 marker:hidden">
                    {group.label}
                    <svg
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-muted transition-transform duration-200 group-open:rotate-180"
                    >
                      <path
                        d="M2.5 4.5 6 8l3.5-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <ul className="pb-2 pl-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block py-2.5 text-[0.9375rem] text-body hover:text-green-700"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>

          <div className="mt-7 grid gap-3 pb-10">
            <Button href="/investors" size="lg">
              Request the investor deck
              <ArrowRight />
            </Button>
            <Button href="/partners" variant="secondary" size="lg">
              Partner with DriveHer
            </Button>
            <Button href="/drive-with-us" variant="ghost" size="lg">
              Apply to drive
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
