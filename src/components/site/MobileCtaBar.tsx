'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useScrolledPast } from '@/lib/use-scrolled-past';

/**
 * Persistent mobile action bar. Appears once the visitor has shown intent by
 * scrolling past the hero, and hides itself on pages that already end in a
 * form so it never covers a submit button.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const visible = useScrolledPast(700);

  if (pathname.startsWith('/contact')) return null;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg transition-transform duration-300 lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="flex gap-2.5">
        <Link
          href="/contact"
          tabIndex={visible ? 0 : -1}
          className="flex-1 rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-navy-800 ring-1 ring-inset ring-line"
        >
          Contact
        </Link>
        <Link
          href="/investors"
          tabIndex={visible ? 0 : -1}
          className="flex-[1.4] rounded-full bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Request the deck
        </Link>
      </div>
    </div>
  );
}
