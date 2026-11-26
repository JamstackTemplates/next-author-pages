import type { ReactNode } from 'react';
import { books } from '../content/books';
import { downloads, facts } from '../content/press';
import { asset } from '../lib/paths';
import { Divider, Icon, Jacket, Portrait } from './artwork';
import { BookText } from './book-text';
import { CopyText } from './copy-email';

type Children = { children: ReactNode };

export function FastFacts({ children }: Children) {
  return <aside className="facts-card crop-frame px-5 py-6 sm:px-7">
    {children}
    <dl className="mt-4">
      {facts.map(fact => <div key={fact.label} className="grid grid-cols-[7.4rem_1fr] gap-2 border-b border-dotted border-line py-2">
        <dt className="font-note text-sm text-muted">{fact.label}</dt><dd>{fact.value}</dd>
      </div>)}
    </dl>
  </aside>;
}

export function BioSheet({ heading, text }: { heading: string; text: string }) {
  const paragraphs = text.split('\n\n');
  const words = text.trim().split(/\s+/).length;
  return <article className="bio-sheet px-5 py-6 sm:px-7">
    <h3 className="text-2xl">{heading}</h3>
    <p className="eyebrow mt-1">{words} words</p>
    <div className="mt-4 max-w-(--measure) space-y-3">
      {paragraphs.map(paragraph => <p key={paragraph}><BookText>{paragraph}</BookText></p>)}
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-2"><CopyText text={text} label="Copy" accessibleLabel={`Copy ${heading.toLowerCase()} biography`}/></div>
  </article>;
}

export function PressDownloads({ children }: Children) {
  return <section className="wrap py-10 md:py-14">
    {children}
    <div className="press-downloads mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
      {downloads.map(download => {
        const book = books.find(item => item.id === download.id);
        return <a key={download.id} href={asset(`/${download.file}`)} download className="grid content-start gap-2 border-r border-b border-line p-3 sm:p-4">
          <div className="press-download-art" aria-hidden="true">
            {book ? <Jacket book={book} decorative/> : download.id === 'portrait' ? <div className="w-full max-w-28"><Portrait/></div> : <div className="w-17 border border-line bg-bg p-2"><Divider kind="perforated"/><span className="mt-2 block text-center font-note text-sm">BIO</span><span className="mt-2 block h-5 border-y border-line"/></div>}
          </div>
          <span className="inline-flex items-start gap-1.5 font-display text-lg leading-tight">
            <span className="shrink-0 text-accent-ink"><Icon name="download"/></span>{book ? <em>{download.label}</em> : download.label}
          </span>
          <span className="font-note text-sm text-muted">{download.format} · {download.note}</span>
        </a>;
      })}
    </div>
  </section>;
}

export function PressContacts({ children }: Children) {
  return <section className="wrap pb-12 md:pb-18">
    <div className="crop-frame border-y border-line bg-surface bg-[image:var(--grain)] p-5 sm:p-8">{children}</div>
  </section>;
}
