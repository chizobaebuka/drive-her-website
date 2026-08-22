/**
 * Renders a JSON-LD block.
 *
 * Security: the payload is produced by our own code (never user input) and is
 * serialised with JSON.stringify, then `<` is escaped so a string value can
 * never terminate the script element early. This is the only place in the app
 * where `dangerouslySetInnerHTML` is used.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
