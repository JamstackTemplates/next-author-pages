import { business } from '../content/business';
import { MobileContents } from './mobile-contents';
import { SiteLink } from './site-link';

export const navigation = [
  { href: '/books/', label: 'Books' },
  { href: '/events/', label: 'Events' },
  { href: '/praise/', label: 'Praise' },
  { href: '/media-kit/', label: 'Media kit' },
  { href: '/contact/', label: 'Contact' },
];

function MainLinks() {
  return navigation.map(({ href, label }) => <SiteLink key={href} href={href} markCurrent="section">{label}</SiteLink>);
}

export function SiteHeader() {
  return <header className="slug-header">
    <div className="wrap slug-inner crop-frame flex min-h-16 items-center justify-between gap-4 md:min-h-20">
      <SiteLink href="/" className="wordmark">{business.name}</SiteLink>
      <nav aria-label="Main" className="site-nav hidden items-center gap-7 md:flex"><MainLinks/></nav>
      <MobileContents><MainLinks/></MobileContents>
    </div>
  </header>;
}
