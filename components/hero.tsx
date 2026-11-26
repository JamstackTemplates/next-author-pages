import type { CSSProperties, ReactNode } from 'react';
import { asset } from '../lib/paths';
import { ProofMark } from './artwork';
import { Tidelines } from './decor';
import { SiteLink } from './site-link';

type Children = { children: ReactNode };
type Action = Children & { href: string };

// The opening photograph: an overhead still life of the new novel's hardback on a writing table with
// its galley proofs, red pencil, a cut russet-apple bough, sea salt, sea glass and a grafting knife.
// public/hero-light.webp is morning light on paper; public/hero-dark.webp is the same table at night
// under a desk lamp. `.hero-photo` in app/tailwind.input.css swaps the pair with the theme toggle, so
// only the active theme's photograph downloads. Decorative only: the copy carries every fact.
function Scene({ children }: Children) {
  const style = {
    '--hero-light': `url("${asset('/hero-light.webp')}")`,
    '--hero-dark': `url("${asset('/hero-dark.webp')}")`,
  } as CSSProperties;
  return <section className="hero-stage">
    <div className="hero-photo" style={style} aria-hidden="true"/>
    <Tidelines className="hero-tides"/>
    <div className="wrap grid lg:grid-cols-12">
      <div className="hero-copy lg:col-span-5 lg:col-start-8">{children}</div>
    </div>
  </section>;
}

function DateLine({ children }: Children) {
  return <p className="eyebrow mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 md:mb-6">
    <span className="hero-rule" aria-hidden="true"><ProofMark/></span>{children}
  </p>;
}

function Heading({ children }: Children) {
  return <h1 className="hero-title">{children}</h1>;
}

function Lead({ children }: Children) {
  return <p className="mt-4 max-w-[34ch] border-l-2 border-accent/70 pl-3 text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.45] text-muted md:mt-7 md:pl-4">{children}</p>;
}

function Actions({ children }: Children) {
  return <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-9">{children}</div>;
}

function Primary({ children, href }: Action) {
  return <SiteLink href={href} className="button button-lg">{children} <span aria-hidden="true">→</span></SiteLink>;
}

function Secondary({ children, href }: Action) {
  return <SiteLink href={href} className="text-link inline-flex min-h-10 items-center gap-1.5 font-note text-sm">
    <span className="inline-block w-4"><ProofMark/></span>{children}
  </SiteLink>;
}

export const Hero = Object.assign(Scene, { DateLine, Heading, Lead, Actions, Primary, Secondary });
