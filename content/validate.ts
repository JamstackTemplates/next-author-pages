import { bookKinds, formatNames, type Book } from './books.ts';
import { eventKinds, type AuthorEvent } from './events.ts';
import type { Review } from './reviews.ts';
import type { PressDownload } from './press.ts';
import { isCalendarDate, scheduleEvents } from '../lib/event-time.ts';

const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function requireValue(value: unknown, item: string, requirement: string): asserts value {
  if (!value) throw new Error(`${item}: ${requirement}`);
}

function uniqueIds(entries: readonly { id: string }[], collection: string) {
  const ids = new Set<string>();
  for (const { id } of entries) {
    requireValue(slug.test(id) && !ids.has(id), `${collection} ${id}`, 'expected a unique, URL-safe id');
    ids.add(id);
  }
  return ids;
}

function requiredFields(item: string, fields: Record<string, string>) {
  for (const [name, value] of Object.entries(fields)) requireValue(value?.trim(), item, `${name} is required`);
}

export function validateBooks(books: readonly Book[], asOf?: string) {
  const ids = uniqueIds(books, 'book');
  for (const book of books) {
    const item = `book ${book.id}`;
    requiredFields(item, { title: book.title, publisher: book.publisher, logline: book.logline });
    requireValue(Object.hasOwn(bookKinds, book.kind), item, 'invalid kind');
    requireValue(['published', 'forthcoming'].includes(book.status), item, 'invalid status');
    requireValue(isCalendarDate(book.publicationDate), item, 'publicationDate must be a valid YYYY-MM-DD date');
    if (asOf) {
      requireValue(book.status === 'forthcoming' ? book.publicationDate > asOf : book.publicationDate <= asOf,
        item, `publicationDate does not match status at ${asOf}`);
    }
    requireValue(Number.isInteger(book.pages) && book.pages > 0, item, 'pages must be a positive integer');
    requireValue(book.description.length && book.description.every(paragraph => paragraph.trim()), item, 'description needs non-empty paragraphs');
    requireValue(['orchard', 'lighthouse', 'tenement', 'tideline'].includes(book.jacket.motif), item, 'invalid jacket motif');
    for (const colour of [book.jacket.ground, book.jacket.ink]) requireValue(/^#[0-9a-f]{6}$/i.test(colour), item, 'jacket colours must be six-digit hex values');
    requireValue(new Set(book.formats.map(format => format.format)).size === book.formats.length, item, 'formats must be unique');
    for (const { format, priceGBP, available } of book.formats) {
      requireValue(Object.hasOwn(formatNames, format), item, `unknown format "${format}"`);
      requireValue(Number.isFinite(priceGBP) && priceGBP > 0 && Number(priceGBP.toFixed(2)) === priceGBP, item, `${format} price must be positive GBP with at most two decimal places`);
      requireValue(typeof available === 'boolean', item, `${format} available must be true or false`);
    }
    requireValue(book.formats.some(format => format.available), item, 'at least one format must be available');
    if (book.extract) requireValue(book.extract.length && book.extract.every(paragraph => paragraph.trim()), item, 'extract needs non-empty lines');
    for (const retailer of book.retailers ?? []) {
      requiredFields(item, { retailer: retailer.label });
      const url = URL.canParse(retailer.url) ? new URL(retailer.url) : null;
      requireValue(url && ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password, item, `invalid retailer URL for "${retailer.label}"`);
    }
  }
  return ids;
}

export function validateReviews(reviews: readonly Review[], bookIds: ReadonlySet<string>) {
  uniqueIds(reviews, 'review');
  for (const review of reviews) {
    const item = `review ${review.id}`;
    requiredFields(item, { quote: review.quote, source: review.source });
    requireValue(bookIds.has(review.bookId), item, `unknown bookId "${review.bookId}"`);
    requireValue(isCalendarDate(review.date), item, 'date must be a valid YYYY-MM-DD date');
    requireValue(['review', 'endorsement', 'prize'].includes(review.kind), item, 'invalid kind');
    requireValue(typeof review.featured === 'boolean', item, 'featured must be true or false');
  }
}

export function validateEvents(events: readonly AuthorEvent[], bookIds: ReadonlySet<string>, zone: string) {
  uniqueIds(events, 'event');
  for (const event of events) {
    const item = `event ${event.id}`;
    requiredFields(item, { title: event.title, venue: event.venue, tickets: event.tickets });
    requireValue(Object.hasOwn(eventKinds, event.kind), item, 'invalid kind');
    requireValue(typeof event.online === 'boolean' && (event.kind === 'online') === event.online, item, 'online and kind must agree');
    if (!event.online) requiredFields(item, { town: event.town });
    if (event.bookId !== undefined) requireValue(bookIds.has(event.bookId), item, `unknown bookId "${event.bookId}"`);
  }
  return scheduleEvents(events, zone);
}

export function validateDownloads(downloads: readonly PressDownload[], bookIds: ReadonlySet<string>) {
  const ids = uniqueIds(downloads, 'download');
  for (const download of downloads) {
    const item = `download ${download.id}`;
    requiredFields(item, { label: download.label, note: download.note });
    const bios = download.id === 'bios';
    requireValue(bios || download.id === 'portrait' || bookIds.has(download.id), item, 'expected the portrait, bios, or an existing book ID');
    requireValue(download.format === (bios ? 'TXT' : 'SVG') && download.file === `media-kit/${download.id}.${bios ? 'txt' : 'svg'}`, item, 'file and format must match its build-generated path');
  }
  for (const id of ['portrait', 'bios', ...bookIds]) requireValue(ids.has(id), `download ${id}`, 'missing from press.ts');
}
