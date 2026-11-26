import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import { books, leadBookId } from '../content/books.ts';
import { business } from '../content/business.ts';
import { events } from '../content/events.ts';
import { bioDownload, downloads } from '../content/press.ts';
import { reviews } from '../content/reviews.ts';
import { validateBooks, validateDownloads, validateEvents, validateReviews } from '../content/validate.ts';
import { jacketSvg, portraitSvg } from '../lib/artwork.ts';
import { resolveSiteConfig } from '../lib/config.mjs';
import { readFileSync } from 'node:fs';

const config = resolveSiteConfig(JSON.parse(readFileSync(new URL('../site.config.json', import.meta.url), 'utf8')), process.env);
const bookIds = validateBooks(books);
if (!bookIds.has(leadBookId)) throw new Error(`book ${leadBookId}: leadBookId must refer to an existing book`);
validateReviews(reviews, bookIds);
validateEvents(events, bookIds, config.timeZone || 'Europe/London');
validateDownloads(downloads, bookIds);

const publicRoot = new URL('../public/', import.meta.url);
const directory = new URL('media-kit/', publicRoot);
await mkdir(directory, { recursive: true });
const expected = new Set(downloads.map(download => download.file.split('/').at(-1)));
const previousBuildFiles = await readdir(directory, { withFileTypes: true });
for (const file of previousBuildFiles) {
  if (file.isFile() && /\.(svg|txt)$/.test(file.name) && !expected.has(file.name)) await unlink(new URL(file.name, directory));
}

await Promise.all(downloads.map(download => {
  const book = books.find(item => item.id === download.id);
  const content = book ? `${jacketSvg(book, business.name, book.id)}\n`
    : download.id === 'portrait' ? `${portraitSvg('portrait')}\n` : bioDownload;
  return writeFile(new URL(download.file, publicRoot), content);
}));
