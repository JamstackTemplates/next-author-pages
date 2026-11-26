import { Bibliography, BookShelf } from '../../components/book-display';
import { PageHead, SectionTitle } from '../../components/page-head';
import { booksByDate } from '../../content/books';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/books/', 'Books', 'Browse Wren Calloway’s novels, stories and essays, with extracts and edition details.');

export default function BooksPage() {
  return <>
    <PageHead mark="close">
      <PageHead.Slug>Section 2 · Bibliography</PageHead.Slug>
      <PageHead.Title>Books</PageHead.Title>
      <PageHead.Introduction>Novels, stories and essays from the east coast of Scotland.</PageHead.Introduction>
    </PageHead>
    <BookShelf books={booksByDate} upright/>
    <Bibliography books={booksByDate}><SectionTitle mark="paragraph">Contents</SectionTitle></Bibliography>
  </>;
}
