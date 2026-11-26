import { useId } from 'react';
import type { Book } from '../content/books';
import { business } from '../content/business';
import { jacketSvg, portraitSvg } from '../lib/artwork';

export function Jacket({ book, decorative = false }: { book: Book; decorative?: boolean }) {
  const id = useId();
  return <span className="jacket block" aria-hidden={decorative || undefined} dangerouslySetInnerHTML={{ __html: jacketSvg(book, business.name, id) }} />;
}

export function Portrait() {
  const id = useId();
  return <figure className="portrait" dangerouslySetInnerHTML={{ __html: portraitSvg(id) }} />;
}

const marks = {
  caret: 'M6 41q13-22 23-31 7 11 17 31M10 42q9-20 18-29',
  stet: 'M4 29q11 4 18-2t19 0M8 38h1m7 1h1m7-1h1m8 1h1m7-2h1',
  deletion: 'M4 34c9-17 35-25 40-13S25 40 14 33 13 17 27 19s15 16 3 25',
  transposition: 'M4 34c10 2 12-9 13-14 2-13 16-14 19-3s-2 22 13 18M9 30l-5 4 6 5',
  paragraph: 'M42 10H24c-19 0-18 21 1 21h3M29 10l-2 35m11-35-1 35',
  close: 'M5 22c1 19 16 15 17 3m-1 0h10m-1 0c3-15 17-18 19 0',
  spelling: 'M45 15c-5-12-38-8-41 10s27 22 40 12c6-5 5-15 1-22Z',
} as const;

export type MarkKind = keyof typeof marks;

export function ProofMark({ kind = 'caret', draw = false }: { kind?: MarkKind; draw?: boolean }) {
  const id = useId();
  return <svg viewBox="0 0 52 48" aria-hidden="true" className={draw ? 'proof-mark proof-mark-draw' : 'proof-mark'}>
    <defs><filter id={`${id}-pencil`} x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency=".16" numOctaves="2" seed="9" result="grain"/><feDisplacementMap in="SourceGraphic" in2="grain" scale="1.15" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
    <path d={marks[kind]} pathLength="1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${id}-pencil)`}/>
    {(kind === 'stet' || kind === 'spelling') && <text x="25" y={kind === 'stet' ? 23 : 32} textAnchor="middle" fill="currentColor" fontSize={kind === 'stet' ? 16 : 19}>{kind === 'stet' ? 'stet' : 'sp'}</text>}
  </svg>;
}

export function Divider({ kind = 'fleuron' }: { kind?: 'fleuron' | 'perforated' | 'measuring' }) {
  if (kind === 'measuring') return <div className="measuring-edge" aria-hidden="true"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span><span>07</span><span>08</span></div>;
  if (kind === 'perforated') return <div className="perforated-edge" aria-hidden="true"><span>⊕</span><span>⊕</span></div>;
  return <div className="fleuron-rule" aria-hidden="true"><span>❧</span></div>;
}

const icons = {
  pencil: 'm4 16-1 5 5-1L20 8l-4-4L4 16Zm10-10 4 4M4 16l4 4',
  calendar: 'M4 6h16v15H4zM8 3v6m8-6v6M4 11h16m-12 4h3m2 0h3',
  pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z M14.5 10a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z',
  mic: 'M9 6a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0zm-3 5a6 6 0 0 0 12 0m-6 6v4m-3 0h6',
  ticket: 'M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4zm12 2v1m0 2v2m0 2v1',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4',
  copy: 'M8 8h12v13H8zM16 8V3H3v13h5',
  envelope: 'M3 5h18v14H3zM3 6l9 7 9-7',
  ribbon: 'M17 9a5 5 0 1 0-10 0 5 5 0 0 0 10 0Zm-8 4-3 8 6-3 6 3-3-8',
  scissors: 'M8 6a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm0 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0ZM7 8l13 12M7 16l13-12',
} as const;

export function Icon({ name }: { name: keyof typeof icons }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round"><path d={icons[name]}/></svg>;
}

export function CutProof({ children }: { children: React.ReactNode }) {
  return <div className="cut-proof" aria-hidden="true">
    <span className="eyebrow">Galley / proof copy</span>
    <svg viewBox="0 0 560 152" preserveAspectRatio="none">
      <path d="M43 25h432M43 45h450M43 65h422M43 85h455M43 105h422M43 125h223" stroke="var(--rule)" strokeWidth="4" strokeLinecap="round"/>
      <path d="M31 130Q94 61 224 33t258-5c55 28-23 71-156 87S76 109 49 72q-17-26 48-49M40 49q118 32 239 27t241-24M35 98q115-19 232-12t218 13" fill="none" stroke="var(--pencil)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
    <span className="cut-note">{children}</span>
  </div>;
}
