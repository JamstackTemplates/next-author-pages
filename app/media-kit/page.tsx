import { business } from '../../content/business';
import { agent, bios, topics } from '../../content/press';
import { featuredReviews } from '../../content/reviews';
import { Divider, Icon } from '../../components/artwork';
import { Clippings } from '../../components/clippings';
import { JsonLd } from '../../components/json-ld';
import { PageHead, SectionTitle } from '../../components/page-head';
import { BioSheet, FastFacts, PressContacts, PressDownloads } from '../../components/press-folder';
import { SiteLink } from '../../components/site-link';
import { pageMetadata } from '../../lib/metadata';
import { personStructuredData } from '../../lib/structured-data';

export const metadata = pageMetadata('/media-kit/', 'Media kit', 'Biographies, book jackets, a line portrait and press contacts for Wren Calloway.');

export default function MediaKitPage() {
  return <>
    <PageHead mark="spelling">
      <PageHead.Slug>Section 5 · Press folder</PageHead.Slug>
      <PageHead.Title>Media kit</PageHead.Title>
      <PageHead.Introduction>Biographies, jacket artwork and contact details for press, booksellers and festival programmers.</PageHead.Introduction>
    </PageHead>

    <section className="wrap grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4 lg:sticky lg:top-8">
        <FastFacts><h2 className="text-3xl">Fast facts</h2></FastFacts>
      </div>
      <div className="lg:col-span-8">
        <SectionTitle mark="paragraph">Biographies</SectionTitle>
        <div className="mt-6 grid gap-6">
          <BioSheet heading="Short" text={bios.short}/>
          <BioSheet heading="Medium" text={bios.medium}/>
          <BioSheet heading="Long" text={bios.long}/>
        </div>
      </div>
    </section>

    <PressDownloads><SectionTitle mark="close">Downloads</SectionTitle></PressDownloads>

    <section className="wrap grid items-start gap-8 pb-10 md:grid-cols-12 md:gap-10 md:pb-14">
      <div className="md:col-span-5">
        <SectionTitle mark="transposition">Interview topics</SectionTitle>
        <ol className="mt-5 divide-y divide-line border-y border-line">
          {topics.map((topic, index) => <li key={topic} className="flex items-center gap-4 py-3">
            <span aria-hidden="true" className="w-12 shrink-0 font-display text-4xl tracking-tight text-accent-ink tabular-nums">{String(index + 1).padStart(2, '0')}</span>{topic}
          </li>)}
        </ol>
      </div>
      <div className="md:col-span-7">
        <SectionTitle mark="stet">Selected press quotes</SectionTitle>
        <div className="mt-6"><Clippings reviews={featuredReviews} showBook/></div>
      </div>
    </section>

    <PressContacts>
      <SectionTitle mark="caret">Press and event enquiries</SectionTitle>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <div><h3 className="mb-1 text-xl">Publicity</h3><p>{business.publisher}</p><a className="text-link" href={`mailto:${business.email}?subject=Press%20%E2%80%94%20`}>Use “Press — …”</a></div>
        <div><h3 className="mb-1 text-xl">Rights</h3><p>{agent}</p><a className="text-link" href={`mailto:${business.email}?subject=Rights%20%E2%80%94%20`}>Use “Rights — …”</a></div>
        <div><h3 className="mb-1 text-xl">Events</h3><p>Readings, panels and workshops</p><a className="text-link" href={`mailto:${business.email}?subject=Event%20%E2%80%94%20`}>Use “Event — …”</a></div>
      </div>
      <div className="my-5"><Divider/></div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a>
        <SiteLink href="/contact/" className="button"><Icon name="envelope"/>Send a press enquiry</SiteLink>
      </div>
    </PressContacts>
    <JsonLd value={personStructuredData()}/>
  </>;
}
