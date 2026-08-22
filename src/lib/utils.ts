/** Minimal class-name joiner — avoids pulling in a dependency for this. */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}
