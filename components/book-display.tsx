import type { ReactNode } from 'react';
import { bookKinds, bookPath, formatNames, fullTitle, type Book } from '../content/books';
import { Divider, Jacket } from './artwork';
import { SiteLink } from './site-link';

export function publicationDate(book: Book, long = true) {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...(long ? { day: 'numeric' } : {}), month: 'long', year: 'numeric' })
    .format(new Date(`${book.publicationDate}T00:00:00Z`));
}

export function BookShelf({ books, upright = false, children }: { books: readonly Book[]; upright?: boolean; children?: ReactNode }) {
  return <div className="mat-band edge-top edge-tide">
    <div className="wrap pt-8 pb-9 md:pt-12 md:pb-13">
      {children}
      <div className={`mt-8 grid grid-cols-2 gap-x-5 gap-y-7 sm:gap-x-9 md:grid-cols-4 md:gap-x-6 lg:gap-x-12 ${upright ? 'upright-shelf' : 'loose-shelf'}`}>
        {books.map(book => <SiteLink href={bookPath(book.id)} key={book.id} className="shelf-book grid justify-items-center gap-3 pt-1 text-center">
          <div className="w-full max-w-54 px-1"><Jacket book={book} decorative/></div>
          <div className="grid gap-1 justify-items-center">
            <em className="font-display text-lg leading-tight md:text-xl">{fullTitle(book)}</em>
            <span className="shelf-tag">{bookKinds[book.kind]} · {book.publicationDate.slice(0, 4)}</span>
          </div>
        </SiteLink>)}
      </div>
    </div>
    <div className="wrap"><Divider kind="measuring"/></div>
  </div>;
}

const pound = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

export function Formats({ book }: { book: Book }) {
  return <table className="format-table w-full max-w-[32rem] text-left text-[.97rem]">
    <caption className="sr-only">Editions of {fullTitle(book)}</caption>
    <thead className="font-note text-sm font-normal text-muted"><tr><th scope="col">Edition</th><th scope="col">Price</th><th scope="col">Availability</th></tr></thead>
    <tbody>
      {book.formats.map(({ format, priceGBP, available }) => {
        const outOfPrint = !available && book.status === 'published';
        return <tr key={format}>
          <th scope="row" className="font-normal">{!available ? <del>{formatNames[format]}</del> : formatNames[format]}</th>
          <td>{!available ? <del>{pound.format(priceGBP)}</del> : pound.format(priceGBP)}</td>
          <td className="text-sm text-muted">{outOfPrint ? <><abbr title="Out of print" aria-hidden="true">o/p</abbr><span className="sr-only">Out of print</span></> : !available ? 'Unavailable' : book.status === 'forthcoming' ? 'Pre-order' : 'Available'}</td>
        </tr>;
      })}
    </tbody>
  </table>;
}

export function Bibliography({ books, children }: { books: readonly Book[]; children: ReactNode }) {
  return <section className="wrap py-13 md:py-18">
    {children}
    <ol className="mt-6 border-t border-line">
      {books.map(book => <li key={book.id} className="grid gap-4 border-b border-line py-6 md:grid-cols-[1fr_1fr] md:gap-12">
        <div>
          <h3 className="biblio-title font-display text-[clamp(1.45rem,3vw,2.1rem)]"><SiteLink className="text-link" href={bookPath(book.id)}><em>{fullTitle(book)}</em></SiteLink></h3>
          <p className="mt-2 text-sm text-muted">{bookKinds[book.kind]} · {book.publicationDate.slice(0, 4)} · {book.publisher} · {book.pages} pages</p>
        </div>
        <Formats book={book}/>
      </li>)}
    </ol>
  </section>;
}

export function BookRecord({ book, children }: { book: Book; children: ReactNode }) {
  return <div className="wrap grid items-start gap-9 pt-10 pb-12 md:grid-cols-12 md:gap-10 md:pt-15 md:pb-19">
    <div className="md:sticky md:top-8 md:col-span-5">
      <div className="mat-band crop-frame mx-auto w-full max-w-[27rem] px-[14%] py-8 sm:py-10 md:px-[13%] md:py-13">
        <Jacket book={book}/>
      </div>
    </div>
    <div className="md:col-span-7">{children}</div>
  </div>;
}
