import { business } from '../../content/business';
import { Icon } from '../../components/artwork';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { LetterCopy, LetterLayout, LetterWindow } from '../../components/letter';
import { PageHead } from '../../components/page-head';
import { pageMetadata } from '../../lib/metadata';
import { site } from '../../lib/site';

export const metadata = pageMetadata('/contact/', 'Contact', 'Write to Wren Calloway with a reader letter, event invitation or press, rights or interview enquiry.');

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const email = <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a>;
  return <>
    <PageHead>
      <PageHead.Slug>Section 6 · Correspondence</PageHead.Slug>
      <PageHead.Title>Write to Wren</PageHead.Title>
      <PageHead.Introduction>Reader letters, invitations to events and festivals, and enquiries about press, rights or interviews are welcome.</PageHead.Introduction>
    </PageHead>
    <LetterLayout>
      <LetterCopy>
        <h2 className="text-3xl">Useful to include</h2>
        <p className="mt-3 max-w-(--measure) text-muted">Put any relevant details in the message. The enquiry form asks for your name, email and message.</p>
        <ul className="my-5 space-y-2 border-y border-dotted border-line py-4 font-note text-sm">
          {business.enquiries.usefulToInclude.map(tip => <li className="flex items-start gap-2" key={tip}><span className="shrink-0 text-accent-ink"><Icon name="pencil"/></span>{tip}</li>)}
        </ul>
        <h2 className="mb-2 text-2xl">Email</h2>
        {email}
        <div className="mt-3 flex flex-wrap items-center gap-2"><CopyEmail email={business.email}/></div>
        <p className="mt-4 text-muted">Subject line tips: Press — …, Rights — …, Event — …</p>
        <p className="mt-2 max-w-(--measure) text-muted">School visits, invitations, interviews and signed-copy requests are enquiries. Wren or her agent will reply.</p>
      </LetterCopy>
      <LetterWindow label={hosted ? 'Enquiry form' : 'By email'}>
        {hosted
          ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email}/>
          : <>
            <h2 className="mb-3 text-3xl">Send a letter directly</h2>
            <p className="mb-2 text-muted">Email Wren with your letter or enquiry.</p>
            {email}
          </>}
      </LetterWindow>
    </LetterLayout>
  </>;
}
