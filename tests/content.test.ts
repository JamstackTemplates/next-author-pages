import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { books, leadBookId } from '../content/books.ts';
import { business } from '../content/business.ts';
import { events } from '../content/events.ts';
import { downloads } from '../content/press.ts';
import { reviews } from '../content/reviews.ts';
import { validateBooks, validateDownloads, validateEvents, validateReviews } from '../content/validate.ts';
import { bookStructuredData, eventStructuredData, jsonLd, personStructuredData } from '../lib/structured-data.ts';

const samplePublicationClock = '2026-11-26';
const zone = 'Europe/London';

test('the author collections have valid fields, unique slugs and existing references', () => {
  for (const key of ['name', 'jobTitle', 'introduction', 'location', 'email'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.usefulToInclude.length && business.enquiries.usefulToInclude.every(tip => tip.trim()));
  const bookIds = validateBooks(books);
  assert.ok(bookIds.has(leadBookId), `book ${leadBookId}: home feature must exist`);
  validateReviews(reviews, bookIds);
  validateEvents(events, bookIds, zone);
  validateDownloads(downloads, bookIds);
});

test('publication dates agree with status at a supplied clock, including a status-only release', () => {
  const forthcoming = { ...books[0], status: 'forthcoming' as const, publicationDate: '2027-03-04' };
  const published = { ...books[1], status: 'published' as const, publicationDate: '2024-05-16' };
  assert.doesNotThrow(() => validateBooks([forthcoming, published], samplePublicationClock));
  assert.throws(() => validateBooks([{ ...published, status: 'forthcoming' }], samplePublicationClock),
    new RegExp(`book ${published.id}.*publicationDate`));
  assert.throws(() => validateBooks([{ ...forthcoming, status: 'published' }], samplePublicationClock),
    new RegExp(`book ${forthcoming.id}.*publicationDate`));
  assert.doesNotThrow(() => validateBooks([{ ...forthcoming, status: 'published' }], '2027-03-04'));
});

test('frequent content mistakes identify the exact book, review, event or download', () => {
  const book = books[0];
  const review = reviews[0];
  const event = events[0];
  const download = downloads[0];
  const ids = validateBooks(books);
  assert.throws(() => validateBooks([book, book]), new RegExp(`book ${book.id}.*unique`));
  assert.throws(() => validateBooks([{ ...book, id: 'not/path-safe' }]), /book not\/path-safe.*URL-safe/);
  assert.throws(() => validateBooks([{ ...book, formats: [{ ...book.formats[0], priceGBP: 18.999 }] }]),
    new RegExp(`book ${book.id}.*price`));
  assert.throws(() => validateBooks([{ ...book, formats: book.formats.map(format => ({ ...format, available: false })) }]),
    new RegExp(`book ${book.id}.*available`));
  assert.throws(() => validateReviews([{ ...review, bookId: 'misspelled' }], ids), new RegExp(`review ${review.id}.*bookId`));
  assert.throws(() => validateReviews([review, review], ids), new RegExp(`review ${review.id}.*unique`));
  assert.throws(() => validateEvents([{ ...event, bookId: 'misspelled' }], ids, zone), new RegExp(`event ${event.id}.*bookId`));
  assert.throws(() => validateEvents([event, event], ids, zone), new RegExp(`event ${event.id}.*unique`));
  assert.throws(() => validateDownloads([download, download], ids), new RegExp(`download ${download.id}.*unique`));
  assert.throws(() => validateDownloads([{ ...download, file: 'wrong.svg' }], ids), new RegExp(`download ${download.id}.*file`));
});

test('Person, Book and Event schema is derived from the same site content', () => {
  const author = personStructuredData();
  assert.equal(author['@type'], 'Person');
  assert.equal(author.name, business.name);
  assert.equal(author.jobTitle, business.jobTitle);
  assert.equal(author.homeLocation.name, business.location);
  assert.deepEqual(author.sameAs, []);

  const book = books.find(book => book.id === leadBookId)!;
  const forSale = { ...book, status: 'published' as const };
  const editions = bookStructuredData({ ...book, status: 'forthcoming' });
  assert.equal(editions.author['@id'], author['@id']);
  assert.equal(editions['@type'], 'Book');
  assert.equal(editions.workExample.length, book.formats.length);
  for (const [index, format] of book.formats.entries()) {
    const edition = editions.workExample[index];
    assert.match(edition.bookFormat, /^https:\/\/schema.org\//);
    assert.equal(edition.offers.priceCurrency, 'GBP');
    assert.equal(edition.offers.price, format.priceGBP.toFixed(2));
    assert.equal(edition.offers.availability, `https://schema.org/${format.available ? 'PreOrder' : 'OutOfStock'}`);
    assert.equal(bookStructuredData(forSale).workExample[index].offers.availability,
      `https://schema.org/${format.available ? 'InStock' : 'OutOfStock'}`);
  }

  const schedule = validateEvents(events, validateBooks(books), zone);
  for (const event of schedule) {
    const schema = eventStructuredData(event);
    assert.equal(schema['@type'], 'Event');
    assert.equal(schema.performer['@id'], author['@id']);
    assert.equal(schema.startDate, event.from.iso);
    assert.equal(schema.endDate, event.to.iso);
    assert.equal(schema.location['@type'], event.online ? 'VirtualLocation' : 'Place');
    assert.match(schema.eventAttendanceMode, event.online ? /OnlineEventAttendanceMode$/ : /OfflineEventAttendanceMode$/);
  }
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { ...personStructuredData(), name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('the home photograph ships as a light and dark pair', () => {
  for (const theme of ['light', 'dark']) {
    const file = new URL(`../public/hero-${theme}.webp`, import.meta.url);
    assert.ok(existsSync(file), `public/hero-${theme}.webp: required by components/hero.tsx`);
    assert.ok(statSync(file).size < 600_000, `public/hero-${theme}.webp: keep under 600 KB for the first screen`);
  }
});
