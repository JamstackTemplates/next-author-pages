import { AllEvents, schedule } from '../../components/event-itinerary';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { eventZone } from '../../lib/event-time';
import { pageMetadata } from '../../lib/metadata';
import { timeZoneLabel } from '../../lib/time-zone';

export const metadata = pageMetadata('/events/', 'Events', 'Find Wren Calloway’s readings, festival appearances, workshops and online conversations.');

export default function EventsPage() {
  const years = [...new Set(schedule.map(event => event.start.slice(0, 4)))];
  return <>
    <PageHead mark="transposition">
      <PageHead.Slug>Section 3 · Events{years.length ? ` · ${years[0]}${years.length > 1 ? `–${years.at(-1)!.slice(2)}` : ''}` : ''}</PageHead.Slug>
      <PageHead.Title>Events</PageHead.Title>
      <PageHead.Introduction>Readings, festivals, workshops and conversations. Times are shown in {timeZoneLabel(eventZone, 'en-GB')}.</PageHead.Introduction>
    </PageHead>
    <section className="wrap pb-12 md:pb-18">
      <AllEvents exportedAt={Date.now()} copy={{
        all: 'All', label: 'Filter by event kind', staticHeading: 'Events', upcoming: 'Upcoming',
        archive: 'Archive', earlier: 'Earlier events', empty: 'No upcoming events in this category.', emptyArchive: 'No earlier events in this category.',
      }}/>
      <p className="mt-8 max-w-(--measure) border-l border-line pl-4 text-muted">
        Tickets are sold by each venue. To invite Wren to your festival, library or school, see the <SiteLink href="/media-kit/" className="text-link">media kit</SiteLink> or <SiteLink href="/contact/" className="text-link">get in touch</SiteLink>.
      </p>
    </section>
  </>;
}
