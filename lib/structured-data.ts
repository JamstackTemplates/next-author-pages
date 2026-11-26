import { business } from '../content/business.ts';
import { bookPath, fullTitle, type Book } from '../content/books.ts';
import { absoluteUrl, documentHref } from './paths.ts';
import type { ScheduledEvent } from './event-time.ts';

const context = 'https://schema.org';

function publicUrl(path: string) {
  return absoluteUrl(path) ?? documentHref(path);
}

export function person() {
  return {
    '@type': 'Person',
    '@id': `${publicUrl('/')}#wren-calloway`,
    name: business.name,
    jobTitle: business.jobTitle,
    description: business.introduction,
    homeLocation: { '@type': 'Place', name: business.location },
    sameAs: [],
    url: publicUrl('/'),
  };
}

export function personStructuredData() {
  return { '@context': context, ...person() };
}

const formatTypes = {
  hardback: 'Hardcover', paperback: 'Paperback', ebook: 'EBook', audiobook: 'AudiobookFormat',
};

export function bookStructuredData(book: Book) {
  const url = publicUrl(bookPath(book.id));
  return {
    '@context': context, '@type': 'Book', '@id': url, url,
    name: fullTitle(book), author: person(), datePublished: book.publicationDate, numberOfPages: book.pages,
    description: book.logline, publisher: { '@type': 'Organization', name: book.publisher },
    workExample: book.formats.map(format => ({
      '@type': 'Book', name: fullTitle(book), bookFormat: `${context}/${formatTypes[format.format]}`,
      offers: {
        '@type': 'Offer', price: format.priceGBP.toFixed(2), priceCurrency: 'GBP',
        availability: `${context}/${!format.available ? 'OutOfStock' : book.status === 'forthcoming' ? 'PreOrder' : 'InStock'}`,
      },
    })),
  };
}

export function eventStructuredData(event: ScheduledEvent) {
  const url = `${publicUrl('/events/')}#${event.id}`;
  return {
    '@context': context, '@type': 'Event', '@id': url, url,
    name: event.title, startDate: event.from.iso, endDate: event.to.iso,
    eventAttendanceMode: `${context}/${event.online ? 'Online' : 'Offline'}EventAttendanceMode`,
    eventStatus: `${context}/EventScheduled`,
    location: event.online
      ? { '@type': 'VirtualLocation', name: event.venue, url }
      : { '@type': 'Place', name: event.venue, address: { '@type': 'PostalAddress', addressLocality: event.town, addressCountry: 'GB' } },
    performer: person(), description: event.tickets,
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
