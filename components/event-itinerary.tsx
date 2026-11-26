import type { ReactNode } from 'react';
import { bookPath, books, fullTitle } from '../content/books';
import { eventKinds, events } from '../content/events';
import { eventDate, scheduleEvents, type ScheduledEvent } from '../lib/event-time';
import { Icon, Jacket } from './artwork';
import { EventAgenda, EventPreview, type EventEntry } from './event-agenda';
import type { FilterOption } from './hash-filter';
import { SiteLink } from './site-link';
import { BookText } from './book-text';
import { JsonLd } from './json-ld';
import { eventStructuredData } from '../lib/structured-data';

const kinds = Object.keys(eventKinds) as (keyof typeof eventKinds)[];
const icons = { reading: 'mic', festival: 'calendar', workshop: 'pencil', online: 'mic' } as const;
const eventKindLabels = { reading: 'Reading', festival: 'Festival', workshop: 'Workshop', online: 'Online' } as const;
const schedule = scheduleEvents(events);

export { schedule };

function ItineraryRow({ event, compact = false, id }: { event: ScheduledEvent; compact?: boolean; id?: string }) {
  const { date, day, month, time } = eventDate(event);
  const book = !compact && books.find(item => item.id === event.bookId);
  return <li id={id} className="grid grid-cols-[3.9rem_minmax(0,1fr)] items-center py-4 sm:grid-cols-[6.4rem_minmax(0,1fr)] sm:py-5">
    <div className="self-stretch border-r border-line pr-2 pt-0.5 sm:pr-3" aria-hidden="true">
      <span className="block font-display text-[clamp(2.6rem,5.1vw,4.9rem)] leading-[.86] tracking-[-.07em] tabular-nums">{day}</span>
      <span className="eyebrow mt-2 block">{month}</span>
    </div>
    <div className="flex min-w-0 items-center justify-between gap-2 pl-3 sm:gap-5 sm:pl-5">
      <div className="min-w-0">
        <p className="eyebrow mb-1 inline-flex items-center gap-1.5 tracking-[.06em]"><Icon name={icons[event.kind]}/>{eventKindLabels[event.kind]}</p>
        <h3 className="text-[clamp(1.24rem,2.6vw,1.9rem)] leading-tight tracking-[-.025em]">
          <BookText>{event.title}</BookText>
        </h3>
        <p className="mt-1 text-[.93rem]">{event.venue}{event.town ? ` · ${event.town}` : ''}</p>
        <p className="text-[.9rem] text-muted"><time dateTime={event.from.iso}>{date}, {time}</time></p>
        {!compact && <p className="mt-2 flex items-center gap-1.5 text-sm text-muted"><Icon name="ticket"/>{event.tickets}</p>}
        {!compact && event.access && <p className="mt-1 text-sm text-muted">{event.access}</p>}
      </div>
      {book && <SiteLink href={bookPath(book.id)} aria-label={fullTitle(book)} className="w-10 shrink-0 sm:mr-2 sm:w-15"><Jacket book={book} decorative/></SiteLink>}
    </div>
  </li>;
}

function toEntry(event: ScheduledEvent, compact: boolean): EventEntry {
  return { id: event.id, kind: event.kind, to: event.to,
    row: <ItineraryRow key={event.id} event={event} compact={compact} id={compact ? undefined : event.id}/> };
}

export function UpcomingEvents({ bookId, heading, staticHeading, empty, children }: {
  bookId?: string; heading: string; staticHeading: string; empty: string; children?: ReactNode;
}) {
  const listed = bookId ? schedule.filter(event => event.bookId === bookId) : schedule;
  return <EventPreview entries={listed.map(event => toEntry(event, true))} heading={heading} staticHeading={staticHeading} empty={empty} limit={bookId ? undefined : 3}>{children}</EventPreview>;
}

export function AllEvents({ copy, exportedAt }: {
  exportedAt: number;
  copy: { all: string; label: string; staticHeading: string; upcoming: string; archive: string; earlier: string; empty: string; emptyArchive: string };
}) {
  const options: FilterOption[] = [{ value: '', label: copy.all }, ...kinds.map(kind => ({ value: kind, label: eventKinds[kind] }))];
  const fallback = <>
    <nav className="filter-strip" aria-label={copy.label}>
      <a href="#event-list">{copy.all}</a>
      {kinds.map(kind => <a key={kind} href={`#event-kind-${kind}`}>{eventKinds[kind]}</a>)}
    </nav>
    <div id="event-list" className="mt-7">
      <h2 className="text-3xl">{copy.staticHeading}</h2>
      {kinds.map(kind => <section className="mt-6" key={kind} id={`event-kind-${kind}`}>
        <h3 className="mb-3 text-2xl">{eventKinds[kind]}</h3>
        <ol className="itinerary">{schedule.filter(event => event.kind === kind).map(event => <ItineraryRow key={event.id} event={event} id={`static-${event.id}`}/>)}</ol>
      </section>)}
    </div>
  </>;
  const entries = schedule.map(event => ({
    ...toEntry(event, false),
    schema: <JsonLd key={event.id} value={eventStructuredData(event)}/>,
  }));
  return <EventAgenda entries={entries} options={options} copy={copy} fallback={fallback} exportedAt={exportedAt}/>;
}
