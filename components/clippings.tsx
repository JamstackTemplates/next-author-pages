import type { Review } from '../content/reviews';
import { bookPath, books, fullTitle } from '../content/books';
import { SiteLink } from './site-link';

export function Clipping({ review, showBook = false }: { review: Review; showBook?: boolean }) {
  const book = showBook ? books.find(item => item.id === review.bookId) : undefined;
  return <figure className="clipping">
    <div className="clipping-paper px-5 pt-5 pb-7 sm:px-7 sm:pt-7 sm:pb-8">
      {book && <p className="eyebrow mb-3">
        <SiteLink href={bookPath(book.id)} className="text-link"><em>{book.title}</em></SiteLink>
      </p>}
      <blockquote className="font-display text-[clamp(1.18rem,2vw,1.56rem)] leading-[1.24]">
        <p>“{review.quote}”</p>
      </blockquote>
      <figcaption className="mt-4 border-t border-line pt-2 text-sm text-muted">
        {review.reviewer ? `${review.reviewer}, ` : ''}<cite>{review.source}</cite>
        {book && book.subtitle ? <span className="sr-only"> on {fullTitle(book)}</span> : null}
      </figcaption>
    </div>
  </figure>;
}

export function Clippings({ reviews, pinned = false, showBook = false }: { reviews: readonly Review[]; pinned?: boolean; showBook?: boolean }) {
  return <div className={pinned ? 'pinned-row items-start md:grid md:auto-cols-fr md:grid-flow-col md:gap-6 lg:gap-9' : 'clipping-columns'}>
    {reviews.map(review => <Clipping key={review.id} review={review} showBook={showBook}/>)}
  </div>;
}
