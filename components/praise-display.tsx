import type { ReactNode } from 'react';
import { bookPath, booksByDate, fullTitle } from '../content/books';
import { reviews } from '../content/reviews';
import { Icon, Jacket } from './artwork';
import { Clippings } from './clippings';
import { PressCuttings } from './press-cuttings';
import { SiteLink } from './site-link';

export function PraiseLayout({ all, filterLabel, empty, children }: {
  all: string; filterLabel: string; empty: string; children: ReactNode;
}) {
  const groups = booksByDate.map(book => {
    const cuttings = reviews.filter(review => review.bookId === book.id);
    return { id: book.id, count: cuttings.length, content: <section key={book.id} id={`cuttings-${book.id}`} className="border-b border-line pt-7 pb-6 sm:pt-9">
      <h2 className="mb-7 text-[clamp(1.8rem,3vw,3rem)] tracking-[-.04em]"><SiteLink href={bookPath(book.id)} className="text-link"><em>{fullTitle(book)}</em></SiteLink></h2>
      {cuttings.length ? <Clippings reviews={cuttings}/> : <p className="text-muted">{empty}</p>}
    </section> };
  });
  const options = [{ value: '', label: all }, ...booksByDate.map(book => ({
    value: book.id, label: <><span className="w-5"><Jacket book={book} decorative/></span><em>{book.title}</em></>,
  }))];
  return <div className="wrap grid gap-9 pb-11 lg:grid-cols-[minmax(0,3fr)_minmax(12rem,1fr)] lg:gap-11 lg:pb-18">
    <div><PressCuttings groups={groups} options={options} label={filterLabel}/></div>
    <aside className="border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-2 lg:pl-6">
      {children}
      <ul className="mt-5 space-y-5">
        {booksByDate.flatMap(book => book.awards.map(award => <li key={`${book.id}-${award}`} className="flex gap-2">
          <span className="shrink-0 text-accent-ink"><Icon name="ribbon"/></span>
          <p>{award}<br/><SiteLink href={bookPath(book.id)} className="text-link text-sm"><em>{book.title}</em></SiteLink></p>
        </li>))}
      </ul>
    </aside>
  </div>;
}
