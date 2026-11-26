import type { ReactNode } from 'react';
import type { Book } from '../content/books';
import { business } from '../content/business';
import { Divider, ProofMark } from './artwork';
import { ProofReveal } from './proof-reveal';

// Keep the proof numbering independent of the visitor's viewport.
function typeset(paragraph: string) {
  const lines: string[] = [];
  let line = '';
  for (const word of paragraph.trim().split(/\s+/)) {
    if (line && line.length + word.length + 1 > 66) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function Galley({ book, complete = false, children }: { book: Book; complete?: boolean; children?: ReactNode }) {
  if (!book.extract?.length) return null;
  const preview = book.extract.slice(0, 12);
  return <ProofReveal className="galley-sheet crop-frame">
    <p className="galley-slug eyebrow px-4 pt-3 pb-2 sm:px-6">Galley 1 · {book.title} · {business.name.split(' ').at(-1)} · {book.publisher.replace(/ Press$/, '')}</p>
    <div className="py-4 pr-8 pl-8 sm:py-6 sm:pr-16 sm:pl-14">
      <div className="relative max-w-(--measure)">
        <ol className="galley-lines" role="list">
          {preview.map((line, index) => <li key={index}>{line}</li>)}
          {complete && book.extract.slice(12).map((paragraph, index) => typeset(paragraph).map((line, lineIndex) =>
            <li key={`${index}-${lineIndex}`} className={lineIndex === 0 ? 'proof-paragraph' : undefined}>{line}</li>
          ))}
        </ol>
        <div className="pointer-events-none absolute top-0 -right-6 h-[calc(var(--baseline)*12)] w-8 sm:-right-13 sm:w-11" aria-hidden="true">
          <span className="galley-annotation"><span>still</span><ProofMark kind="caret" draw/></span>
          <span className="galley-annotation"><ProofMark kind="stet" draw/></span>
          <span className="galley-annotation"><ProofMark kind="deletion" draw/></span>
        </div>
      </div>
      {children ? <div className="mt-5 pl-4">{children}</div> : null}
    </div>
    <Divider kind="perforated"/>
  </ProofReveal>;
}
