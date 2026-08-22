'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * True once the page is scrolled further than `threshold` pixels.
 *
 * Implemented with `useSyncExternalStore` rather than an effect + setState.
 * Three things fall out of that:
 *
 *   - No cascading render on mount. An effect that calls setState during
 *     hydration renders the tree twice; subscribing to the scroll position as
 *     an external store renders it once.
 *   - The server snapshot is explicit (`false`), so there is no hydration
 *     mismatch and no `window` access during SSR.
 *   - Notifications are coalesced into one per animation frame, so a fast
 *     scroll cannot queue work per event on the main thread.
 *
 * React bails out when the snapshot is unchanged, so crossing the threshold is
 * the only thing that actually re-renders.
 */
export function useScrolledPast(threshold: number): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    let frame = 0;

    const handle = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        onStoreChange();
      });
    };

    window.addEventListener('scroll', handle, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handle);
    };
  }, []);

  const getSnapshot = useCallback(
    () => window.scrollY > threshold,
    [threshold],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
