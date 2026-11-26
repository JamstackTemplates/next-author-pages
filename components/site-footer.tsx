import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { Icon } from './artwork';
import { navigation } from './site-header';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return <footer className="press-footer edge-top edge-tide mt-6 py-10 md:py-14">
    <div className="wrap">
      <div className="grid gap-x-12 gap-y-7 min-[600px]:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow mb-3">Colophon / Press room</p>
          <p className="font-display text-3xl tracking-tight">{business.name}</p>
          <a className="text-link mt-2 inline-flex items-center gap-2 wrap-anywhere" href={`mailto:${business.email}`}><Icon name="envelope"/> {business.email}</a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap content-start gap-x-5 gap-y-3 self-start pt-1 font-note text-sm">
          {navigation.map(({ href, label }) => <SiteLink key={href} href={href}>{label}</SiteLink>)}
        </nav>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5">
        <p className="text-sm text-[#C9C4B6]">Set in Brygada 1918 and Petrona. <span className="inline-block">Sample site — all names invented.</span></p>
        <DarkModeToggle />
      </div>
    </div>
  </footer>;
}
