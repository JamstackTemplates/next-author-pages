import { jsonLd } from '../lib/structured-data';

export function JsonLd({ value }: { value: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(value) }} />;
}
