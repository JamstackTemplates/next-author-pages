import { PageHead, SectionTitle } from '../../components/page-head';
import { PraiseLayout } from '../../components/praise-display';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/praise/', 'Praise', 'Press cuttings, endorsements, awards and shortlists for Wren Calloway’s books.');

export default function PraisePage() {
  return <>
    <PageHead mark="stet">
      <PageHead.Slug>Section 4 · Press cuttings</PageHead.Slug>
      <PageHead.Title>Praise</PageHead.Title>
      <PageHead.Introduction>Reviews, endorsements and notes from prize judges, filed by book.</PageHead.Introduction>
    </PageHead>
    <PraiseLayout all="All" filterLabel="Filter by book" empty="No clippings have been filed for this book.">
      <SectionTitle mark="spelling">Prizes</SectionTitle>
    </PraiseLayout>
  </>;
}
