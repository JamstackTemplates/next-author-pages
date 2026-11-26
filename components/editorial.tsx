import type { ReactNode } from 'react';
import { SiteLink } from './site-link';
import { Portrait } from './artwork';
import { AppleBough } from './decor';

type Children = { children: ReactNode };

export function GalleySection({ children }: Children) {
  return <section className="edge-top edge-bottom edge-deckle z-1 bg-surface bg-[image:var(--grain)] py-10 md:py-17">
    <div className="wrap grid gap-5 md:grid-cols-12 md:gap-8">
      {children}
    </div>
  </section>;
}

export function GalleyMargin({ children }: Children) {
  return <div className="md:col-span-3 md:pt-6">{children}</div>;
}

export function GalleyColumn({ children }: Children) {
  return <div className="md:col-span-9">{children}</div>;
}

export function EditorialSection({ children, id }: Children & { id?: string }) {
  return <section className="wrap py-10 md:py-16" id={id}>{children}</section>;
}

export function MarginLink({ children, href }: Children & { href: string }) {
  return <SiteLink href={href} className="text-link inline-flex min-h-10 items-center font-note text-sm">{children}</SiteLink>;
}

export function AuthorSplit({ children }: Children) {
  return <section className="relative isolate overflow-hidden">
    <AppleBough className="author-bough"/>
    <div className="wrap grid items-center gap-8 py-10 md:grid-cols-12 md:gap-10 md:py-16">
      <div className="md:col-span-4"><Portrait/></div>
      <div className="md:col-span-8">{children}</div>
    </div>
  </section>;
}

export function ItinerarySheet({ children }: Children) {
  return <section className="wrap py-10 md:py-16">
    <div className="ticket-sheet px-6 pt-6 pb-3 sm:px-10 sm:pt-8 md:px-14">{children}</div>
  </section>;
}
