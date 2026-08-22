'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to your monitoring service here. The digest is safe to display;
    // the raw error message is not, so it is never rendered.
    console.error('[app] unhandled error', error.digest ?? error.message);
  }, [error]);

  return (
    <section className="bg-navy-950">
      <div className="container-page flex min-h-[60vh] flex-col justify-center py-24">
        <h1 className="max-w-2xl text-4xl text-white">
          Something went wrong on our side.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-navy-100/80">
          The page could not be loaded. Please try again — if it keeps
          happening, email{' '}
          <a
            href="mailto:info@driveher.ng"
            className="font-semibold text-green-400 underline underline-offset-2"
          >
            info@driveher.ng
          </a>{' '}
          and we will look into it.
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs text-navy-200/50">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-9">
          <button
            type="button"
            onClick={reset}
            className="inline-flex rounded-full bg-green-600 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-green-700"
          >
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}
