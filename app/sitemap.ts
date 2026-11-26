import type { MetadataRoute } from 'next';
import { bookPath, booksByDate } from '../content/books';
import { absoluteUrl } from '../lib/paths';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/books/', ...booksByDate.map(book => bookPath(book.id)), '/events/', '/praise/', '/media-kit/', '/contact/'].flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
