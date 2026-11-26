import { Divider } from '../components/artwork';
import { BookShelf, publicationDate } from '../components/book-display';
import { BookText } from '../components/book-text';
import { Clippings } from '../components/clippings';
import { AuthorSplit, EditorialSection, GalleyColumn, GalleyMargin, GalleySection, ItinerarySheet, MarginLink } from '../components/editorial';
import { UpcomingEvents } from '../components/event-itinerary';
import { Galley } from '../components/galley';
import { Hero } from '../components/hero';
import { JsonLd } from '../components/json-ld';
import { SectionTitle } from '../components/page-head';
import { bookPath, booksByDate, leadBookId } from '../content/books';
import { bios } from '../content/press';
import { featuredReviews } from '../content/reviews';
import { pageMetadata } from '../lib/metadata';
import { personStructuredData } from '../lib/structured-data';

export const metadata = pageMetadata('/');

export default function HomePage() {
  const book = booksByDate.find(book => book.id === leadBookId)!;
  const extract = `${bookPath(book.id)}#extract`;
  return <>
    <Hero>
      <Hero.DateLine>{book.status === 'forthcoming' ? 'New novel' : 'Now in print'} · <time dateTime={book.publicationDate}>{publicationDate(book)}</time></Hero.DateLine>
      <Hero.Heading><em>{book.title}</em></Hero.Heading>
      <Hero.Lead>A storm takes the sea wall, an orchard survives, and a mother and daughter have one winter to graft what is left.</Hero.Lead>
      <Hero.Actions>
        {book.extract && <Hero.Primary href={extract}>Read the opening pages</Hero.Primary>}
        <Hero.Secondary href="/events/">See upcoming events</Hero.Secondary>
      </Hero.Actions>
    </Hero>

    {book.extract && <GalleySection>
      <GalleyMargin>
        <SectionTitle mark="paragraph">From the galley</SectionTitle>
        <p className="eyebrow mt-3 md:ml-14">Chapter one</p>
      </GalleyMargin>
      <GalleyColumn>
        <Galley book={book}><MarginLink href={extract}>Continue reading →</MarginLink></Galley>
      </GalleyColumn>
    </GalleySection>}

    <EditorialSection>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-5 gap-y-2">
        <SectionTitle mark="stet">Press cuttings</SectionTitle>
        <MarginLink href="/praise/">Read the praise</MarginLink>
      </div>
      <Divider/>
      <div className="md:mt-8"><Clippings reviews={featuredReviews} pinned showBook/></div>
    </EditorialSection>

    <section>
      <BookShelf books={booksByDate}>
        <div className="flex flex-wrap items-end justify-between gap-x-5 gap-y-2">
          <SectionTitle mark="close">The books</SectionTitle>
          <MarginLink href="/books/">Browse the bibliography</MarginLink>
        </div>
      </BookShelf>
    </section>

    <ItinerarySheet>
      <UpcomingEvents heading="Next on the road" staticHeading="Events" empty="No upcoming appearances are listed.">
        <MarginLink href="/events/">See all events →</MarginLink>
      </UpcomingEvents>
    </ItinerarySheet>

    <div className="wrap"><Divider/></div>
    <AuthorSplit>
      <SectionTitle mark="spelling">About Wren</SectionTitle>
      <p className="drop-cap mt-5 max-w-(--measure) md:max-w-none md:columns-2 md:gap-8 md:[column-rule:1px_solid_var(--rule)]">
        <BookText>{bios.medium}</BookText>
      </p>
      <div className="mt-2"><MarginLink href="/media-kit/">Press and programmers: the media kit</MarginLink></div>
    </AuthorSplit>
    <JsonLd value={personStructuredData()}/>
  </>;
}
