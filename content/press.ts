import { booksByDate, fullTitle } from './books.ts';
import { business } from './business.ts';

export const bios = {
  short: 'Wren Calloway is a Scottish novelist and essayist based in Edinburgh. Her books include The Lighthouse Almanac, shortlisted for the Firth Prize for Fiction, and On Tidelines, a collection of essays walked along the Forth. Her fourth book, The Salt Orchard, follows a mother and daughter through a winter after a storm.',
  medium: 'Wren Calloway was born in Kirkcaldy in 1984 and lives in Edinburgh. She worked in an orchard and on the sub-editing desk of a regional newspaper before publishing Small Hours in Leith, which won the Saltire Shore Debut Award. Her novel The Lighthouse Almanac was shortlisted for the Firth Prize for Fiction and named Northlight Book of the Year. For On Tidelines, her collection of twelve essays, she walked the shores of the Firth of Forth, from the old coal harbours to the sand at the river mouth. Her fourth book, The Salt Orchard, follows a mother and daughter through the winter after a storm breaches the sea wall at Elie. She writes about work, weather and the things people keep.',
  long: 'Wren Calloway was born in Kirkcaldy in 1984 and lives in Edinburgh. Before turning to fiction she worked in an orchard and as a sub-editor at a regional newspaper, two jobs that taught her to pay attention to what can be done with a pair of hands and what has to wait until morning.\n\nHer first book, Small Hours in Leith, takes place during the hours between the last orders and the first bus. It won the Saltire Shore Debut Award. Her novel The Lighthouse Almanac, about a woman reading her father’s weather records, was shortlisted for the Firth Prize for Fiction and named Northlight Book of the Year. In On Tidelines she walked twelve stretches of the Firth of Forth, recording conversations and returning to the same places at different states of the tide.\n\nHer fourth book, The Salt Orchard, follows a mother and daughter through a winter spent trying to save an orchard after a storm takes the sea wall at Elie. Calloway’s fiction and essays share an interest in weather, ordinary work and the point at which a private record becomes part of a place’s history. She gives readings and leads workshops on writing from observation, including how to make sense of a well-kept notebook when the original occasion has long since passed.',
};

export const bioDownload = [
  business.name,
  ...Object.entries(bios).map(([length, bio]) => `${length.toUpperCase()} BIOGRAPHY\n\n${bio}`),
].join('\n\n') + '\n';

export const agent = 'Imogen Hartley, Harrow & Finch Literary';

export const facts = [
  { label: 'Born', value: 'Kirkcaldy, 1984' },
  { label: 'Lives', value: 'Edinburgh' },
  { label: 'Books', value: String(booksByDate.length) },
  { label: 'Previously', value: 'Orchard hand, then sub-editor at a regional paper' },
  { label: 'Represented by', value: agent },
];

export const topics = [
  'Coastal flooding and the places we stay',
  'Weather records and memory',
  'Writing work and class',
  'From sub-editing to fiction',
  'Short stories as a city’s night shift',
];

export interface PressDownload {
  /** Book ID, or the reserved portrait or bios IDs. */
  id: string;
  label: string;
  /** Build-generated path relative to public/. */
  file: string;
  format: 'SVG' | 'TXT';
  /** Useful file size or dimensions for the download listing. */
  note: string;
}

export const downloads: readonly PressDownload[] = [
  ...booksByDate.map(book => ({ id: book.id, label: fullTitle(book), file: `media-kit/${book.id}.svg`, format: 'SVG' as const, note: '250 × 350' })),
  { id: 'portrait', label: 'Author line portrait', file: 'media-kit/portrait.svg', format: 'SVG', note: '400 × 300' },
  { id: 'bios', label: 'All three biographies', file: 'media-kit/bios.txt', format: 'TXT', note: `${(new TextEncoder().encode(bioDownload).length / 1000).toFixed(1)} kB` },
];
