import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: 'DriveHer Bayelsa', href: '/programmes/bayelsa' },
  { label: 'DriveHer Delta', href: '/programmes/delta' },
  { label: 'Investors', href: '/investors' },
  { label: 'Partner with us', href: '/partners' },
  { label: 'Drive with us', href: '/drive-with-us' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFound() {
  return (
    <section className="bg-navy-950 grain">
      <div className="container-page flex min-h-[60vh] flex-col justify-center py-24">
        <p className="font-display text-7xl font-bold text-green-400">404</p>
        <h1 className="mt-5 max-w-2xl text-4xl text-white">
          That road doesn&apos;t exist — but every other route is open.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-navy-100/80">
          The page you were looking for may have moved. Here is where most
          people were heading.
        </p>

        <ul className="mt-9 flex flex-wrap gap-2.5">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex rounded-full px-4 py-2 text-sm font-medium text-navy-100 ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="/" size="lg">
            Back to the homepage
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
