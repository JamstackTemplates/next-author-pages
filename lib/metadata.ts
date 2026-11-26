import type { Metadata } from 'next';
import { business } from '../content/business';
import { absoluteUrl } from './paths';
import { site } from './site';

export function pageMetadata(path: string, title?: string, description = site.description || business.introduction): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = title ? `${title} — ${business.name}` : business.name;
  const images = site.url ? [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: 'Wren Calloway and The Salt Orchard jacket on the proof desk' }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: business.name, title: socialTitle, description, url, images },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images },
  };
}
