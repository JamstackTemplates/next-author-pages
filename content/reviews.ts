export interface Review {
  /** Stable slug for this clipping. */
  id: string;
  /** ID from books.ts. */
  bookId: string;
  quote: string;
  source: string;
  reviewer?: string;
  kind: 'review' | 'endorsement' | 'prize';
  /** Publication date (YYYY-MM-DD). */
  date: string;
  /** Include in the home and press selections. */
  featured: boolean;
}

export const reviews: readonly Review[] = [
  { id: 'firth-review-almanac', bookId: 'the-lighthouse-almanac', source: 'The Firth Review', kind: 'review', date: '2022-02-06', featured: true, quote: 'Calloway writes weather the way other novelists write grief: precisely, and as if it might come back.' },
  { id: 'northlight-almanac', bookId: 'the-lighthouse-almanac', source: 'Northlight Magazine', kind: 'review', date: '2022-02-09', featured: false, quote: 'A quiet book with a gale in it.' },
  { id: 'saturday-ledger-almanac', bookId: 'the-lighthouse-almanac', source: 'The Saturday Ledger', kind: 'review', date: '2022-02-12', featured: false, quote: 'Every page has the salt-stiff texture of something kept.' },
  { id: 'bookseller-quarterly-leith', bookId: 'small-hours-in-leith', source: 'Booksellers’ Quarterly', kind: 'review', date: '2019-09-20', featured: true, quote: 'Eleven stories, not a wasted sentence. Leith has found its night clerk.' },
  { id: 'saltire-shore-leith', bookId: 'small-hours-in-leith', source: 'Saltire Shore Debut Award judges', kind: 'prize', date: '2020-05-08', featured: false, quote: 'Funny, unsentimental and exact about the hour when a city admits what it is.' },
  { id: 'firth-review-tidelines', bookId: 'on-tidelines', source: 'The Firth Review', kind: 'review', date: '2024-05-19', featured: true, quote: 'Essays that walk at the pace of thought and stop where the tide does.' },
  { id: 'ruth-ansel-tidelines', bookId: 'on-tidelines', source: 'Ruth Ansel, author of The Weir', kind: 'endorsement', date: '2024-04-15', featured: false, quote: 'I read it twice, the second time with a map.' },
  { id: 'lantern-proof-orchard', bookId: 'the-salt-orchard', source: 'Tomas Rhee, author of Low Country', kind: 'endorsement', date: '2026-09-08', featured: false, quote: 'A novel about what survives, written by someone who knows exactly what it costs.' },
  { id: 'northlight-orchard', bookId: 'the-salt-orchard', source: 'Northlight Magazine, “Most anticipated of 2027”', kind: 'review', date: '2026-11-10', featured: false, quote: 'Calloway’s best book, and her most generous.' },
];

export const featuredReviews = reviews.filter(review => review.featured)
  .sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
