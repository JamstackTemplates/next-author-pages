import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { site } from '../lib/site';
import '@fontsource-variable/brygada-1918/wght.css';
import '@fontsource-variable/brygada-1918/wght-italic.css';
import '@fontsource-variable/petrona/wght.css';
import '@fontsource-variable/petrona/wght-italic.css';
import '@fontsource/special-elite/latin.css';
import './tailwind.input.css';

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description: site.description || business.introduction,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-GB" suppressHydrationWarning>
    <head><ThemeScript /></head>
    <body><ThemeProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
    </ThemeProvider></body>
  </html>;
}
