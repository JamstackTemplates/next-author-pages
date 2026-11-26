import { notFound } from 'next/navigation';
import { Divider, Icon, ProofMark } from '../../../components/artwork';
import { BookRecord, Formats, publicationDate } from '../../../components/book-display';
import { BookText } from '../../../components/book-text';
import { Clippings } from '../../../components/clippings';
import { EditorialSection, GalleyColumn, GalleyMargin, GalleySection, MarginLink } from '../../../components/editorial';
import { UpcomingEvents } from '../../../components/event-itinerary';
import { Galley } from '../../../components/galley';
import { JsonLd } from '../../../components/json-ld';
import { SectionTitle } from '../../../components/page-head';
import { SiteLink } from '../../../components/site-link';
import { bookKinds, bookPath, booksByDate, fullTitle } from '../../../content/books';
import { events } from '../../../content/events';
import { reviews } from '../../../content/reviews';
import { pageMetadata } from '../../../lib/metadata';
import { bookStructuredData } from '../../../lib/structured-data';

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return booksByDate.map(book => ({ id: book.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const book = booksByDate.find(item => item.id === id);
  if (!book) notFound();
  return pageMetadata(bookPath(book.id), fullTitle(book), book.logline);
}

export default async function BookPage({ params }: Props) {
  const { id } = await params;
  const index = booksByDate.findIndex(item => item.id === id);
  if (index === -1) notFound();
  const book = booksByDate[index];
  const previous = booksByDate[index - 1];
  const next = booksByDate[index + 1];
  const cuttings = reviews.filter(review => review.bookId === id);
  const hasEvents = events.some(event => event.bookId === id);

  return <>
    <BookRecord book={book}>
      <p className="eyebrow mb-3 flex flex-wrap items-center gap-2"><span className="mr-1 inline-block w-5"><ProofMark kind="transposition"/></span><SiteLink href="/books/" className="text-link">Books</SiteLink> / {bookKinds[book.kind]} · {String(index + 1).padStart(2, '0')}</p>
      <h1 className="text-[clamp(3.25rem,7.5vw,7rem)] tracking-[-.075em]"><em>{book.title}</em></h1>
      {book.subtitle && <p className="mt-1 font-display text-[clamp(1.65rem,3.6vw,2.65rem)] leading-tight"><em>{book.subtitle}</em></p>}
      <p className="mt-3 max-w-[42ch] text-xl text-muted">{book.logline}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="status-stamp">{book.status === 'forthcoming' ? 'Forthcoming' : 'In print'}</span>
        <p className="text-sm">{book.status === 'forthcoming'
          ? <>Out <time dateTime={book.publicationDate}>{publicationDate(book)}</time> — ask your bookshop to pre-order</>
          : <>Published <time dateTime={book.publicationDate}>{book.publicationDate.slice(0, 4)}</time></>}</p>
      </div>
      <p className="my-4 text-sm text-muted">{book.publisher} · {book.pages} pages</p>
      <Formats book={book}/>
      <div className="mt-4">
        {book.retailers?.length ? <ul className="flex flex-wrap gap-4">{book.retailers.map(retailer => <li key={retailer.url}><a href={retailer.url} className="text-link">{retailer.label}</a></li>)}</ul>
          : book.status === 'published' && <p className="text-muted">Available from your local bookshop.</p>}
        {book.extract && <MarginLink href={`${bookPath(id)}#extract`}>Read the opening pages</MarginLink>}
      </div>
      <div className="mt-8 border-t border-line pt-6">
        <SectionTitle mark="paragraph">About the book</SectionTitle>
        <div className="mt-4 max-w-(--measure) space-y-3">
          {book.description.map((paragraph, index) => <p className={index === 0 ? 'drop-cap' : undefined} key={paragraph}><BookText>{paragraph}</BookText></p>)}
        </div>
        {!!book.awards.length && <ul className="mt-6 space-y-2 border-t border-dotted border-line pt-4">
          {book.awards.map(award => <li className="flex items-start gap-2 text-accent-ink" key={award}><Icon name="ribbon"/>{award}</li>)}
        </ul>}
      </div>
    </BookRecord>
    {book.extract && <section id="extract">
      <GalleySection>
        <GalleyMargin><SectionTitle mark="caret">Opening pages</SectionTitle><p className="eyebrow mt-3 md:ml-14">Chapter one</p></GalleyMargin>
        <GalleyColumn><Galley book={book} complete/></GalleyColumn>
      </GalleySection>
    </section>}
    {!!cuttings.length && <EditorialSection>
      <SectionTitle mark="stet">Press cuttings</SectionTitle>
      <div className="mt-7 max-w-[58rem]"><Clippings reviews={cuttings}/></div>
    </EditorialSection>}
    {hasEvents && <EditorialSection>
      <UpcomingEvents bookId={id} heading="On the road with this book" staticHeading="Events" empty="There are no upcoming events for this book.">
        <MarginLink href="/events/">See all events →</MarginLink>
      </UpcomingEvents>
    </EditorialSection>}
    <div className="wrap pb-10">
      <Divider/>
      <nav aria-label="Adjacent books" className="mt-5 grid grid-cols-2 gap-3">
        <div>{previous && <SiteLink className="text-link" href={bookPath(previous.id)}><span className="eyebrow block">← p. {index}</span><em>{fullTitle(previous)}</em></SiteLink>}</div>
        <div className="text-right">{next && <SiteLink className="text-link" href={bookPath(next.id)}><span className="eyebrow block">p. {index + 2} →</span><em>{fullTitle(next)}</em></SiteLink>}</div>
      </nav>
    </div>
    <JsonLd value={bookStructuredData(book)}/>
  </>;
}
