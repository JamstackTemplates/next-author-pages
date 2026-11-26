import { business } from './business.ts';

export const bookKinds = { novel: 'Novel', stories: 'Stories', essays: 'Essays' } as const;
export const formatNames = { hardback: 'Hardback', paperback: 'Paperback', ebook: 'Ebook', audiobook: 'Audiobook' } as const;
export type BookFormat = keyof typeof formatNames;

export interface Book {
  /** Stable URL slug, also used by reviews, events and media-kit downloads. */
  id: string;
  title: string;
  subtitle?: string;
  kind: keyof typeof bookKinds;
  status: 'forthcoming' | 'published';
  /** Calendar date in YYYY-MM-DD form. */
  publicationDate: string;
  publisher: string;
  pages: number;
  logline: string;
  /** Paragraphs in reading order. */
  description: string[];
  /** Price in pounds, with penny precision. Availability is per edition. */
  formats: { format: BookFormat; priceGBP: number; available: boolean }[];
  awards: string[];
  jacket: { motif: 'orchard' | 'lighthouse' | 'tenement' | 'tideline'; ground: string; ink: string };
  /** Opening passages in reading order; the first twelve lines form the home proof. */
  extract?: string[];
  /** Optional external bookshop links. */
  retailers?: { label: string; url: string }[];
}

export const leadBookId = 'the-salt-orchard';

export const books: readonly Book[] = [
  {
    id: 'the-salt-orchard', title: 'The Salt Orchard', kind: 'novel', status: 'forthcoming',
    publicationDate: '2027-03-04', publisher: business.publisher, pages: 352,
    logline: 'A storm takes the sea wall at Elie, an orchard survives, and a mother and daughter have one winter to graft what is left.',
    description: [
      'When the sea wall gives way at Elie, Morag Lennie wades through the orchard her father planted and finds the highest rows still standing. She knows how to save the wood if the salt has not yet taken it. What she needs is a dry shed, a sharp knife and someone to hold the branches steady.',
      'Her daughter Iona comes back from Edinburgh for the weekend and stays into spring. As they gather scions and parcel them out among neighbours, they discover how differently they remember the man who taught them to graft. The Salt Orchard follows one winter of work on a coast where the old measures of what can be saved no longer hold.',
    ],
    formats: [
      { format: 'hardback', priceGBP: 18.99, available: true },
      { format: 'ebook', priceGBP: 9.99, available: true },
      { format: 'audiobook', priceGBP: 22, available: false },
    ],
    awards: [],
    jacket: { motif: 'orchard', ground: '#D9C9A3', ink: '#2F3A2E' },
    extract: [
      'At first light Morag took the lower path into the orchard.',
      'The sea had gone out through the hole it had made,',
      'but it had left enough water to cover her boots.',
      'She walked by the tops of the stakes. The sixth was missing.',
      'In the place where it should have been, a twist of red wool',
      'hung from a branch. Iona used to tie the wool there',
      'to tell the russets from the other trees in winter.',
      'Morag touched it with one finger. It was stiff with salt.',
      'Above her, the starlings had found a dry length of wire.',
      'There were seventeen of them. She counted twice.',
      'Counting was something to do before she had to decide',
      'which of the trees she would come back for with a knife.',
      'At the end of the row the water was higher. The grass had lain down all one way, like hair combed for a photograph. A crate she had left under the bench was lodged against the fence. It had travelled the whole length of the orchard and managed, somehow, to keep the stone she used to weigh it down.',
      'She went to pick the stone out and put her hand into water so cold that for a moment she could not tell whether she had hold of it. When she did bring it up, it was cleaner than she had ever seen it. There was a white seam running through the middle. She put it in the pocket of her coat.',
      'Her father had shown her how to take wood from a hurt tree. You took the last summer’s growth, above the place where the bark changed colour. She could see him turning a twig between his fingers, putting off the cut until she saw for herself where it ought to go. There was a blackbird in the hedge that morning too, though that might have been another morning.',
      'By the gate she turned and looked back. A pale line on the trunks showed how high the water had been in the night. She had expected some mark of violence, a gouge or a wound she could dress. It was as even as a line her daughter might have drawn with a ruler.',
    ],
  },
  {
    id: 'on-tidelines', title: 'On Tidelines', subtitle: 'Essays from the Forth', kind: 'essays', status: 'published',
    publicationDate: '2024-05-16', publisher: business.publisher, pages: 192,
    logline: 'Twelve essays walked along the Firth of Forth, on work, weather and the things a coast keeps.',
    description: [
      'Wren Calloway takes the bus to the edge of the Forth and follows the water on foot. A retired pilot shows her where ships used to wait. At low tide, a strandline holds pieces of coal, a child’s shoe and the remains of a fence whose field is now underwater.',
      'Across twelve walks she returns to the same questions. Who gets paid to stay out in bad weather? Who can afford to move inland? And what does it mean to keep a record of a place that changes while you are writing it?',
    ],
    formats: [
      { format: 'hardback', priceGBP: 14.99, available: true }, { format: 'paperback', priceGBP: 10.99, available: true },
      { format: 'ebook', priceGBP: 6.99, available: true },
    ],
    awards: [],
    jacket: { motif: 'tideline', ground: '#BFD3CF', ink: '#1E3B3A' },
  },
  {
    id: 'the-lighthouse-almanac', title: 'The Lighthouse Almanac', kind: 'novel', status: 'published',
    publicationDate: '2022-02-03', publisher: business.publisher, pages: 304,
    logline: "A keeper's daughter inherits his weather almanac, and with it a forty-year argument with the sea.",
    description: [
      'After her father dies, surveyor Nell Strang opens a box of his weather books. The lighthouse was automated years ago, but he went on taking readings from the same window. For forty years he recorded the wind, the visibility and, on one particular night every December, the initials of someone she does not remember.',
      'Nell brings the books back to the island and reads them through a winter of ferry cancellations. As dates take on meanings her father never wrote down, she has to decide which entries belong in the public archive and which she intends to keep.',
    ],
    formats: [
      { format: 'hardback', priceGBP: 16.99, available: false }, { format: 'paperback', priceGBP: 9.99, available: true },
      { format: 'ebook', priceGBP: 5.99, available: true }, { format: 'audiobook', priceGBP: 19.99, available: true },
    ],
    awards: ['Shortlisted, Firth Prize for Fiction 2022', 'Northlight Book of the Year 2022'],
    jacket: { motif: 'lighthouse', ground: '#24364A', ink: '#F0E6CF' },
  },
  {
    id: 'small-hours-in-leith', title: 'Small Hours in Leith', kind: 'stories', status: 'published',
    publicationDate: '2019-09-12', publisher: business.publisher, pages: 224,
    logline: 'Eleven stories set between closing time and the first bus.',
    description: [
      'A night cleaner takes the long way home to see whether the light in her old flat is still on. A baker and his apprentice stop speaking just as their shift begins. In a taxi office, a woman leaves a message for a driver who has been dead for a week.',
      'Eleven stories follow the workers, neighbours and strangers who keep Leith going between closing time and the first bus. What they lend one another is often very little: a locker key, a dry pair of socks, ten minutes under a shop awning.',
    ],
    formats: [{ format: 'paperback', priceGBP: 8.99, available: true }, { format: 'ebook', priceGBP: 4.99, available: true }],
    awards: ['Winner, Saltire Shore Debut Award 2020'],
    jacket: { motif: 'tenement', ground: '#3B2E3F', ink: '#F2C76B' },
  },
];

export const booksByDate = [...books].sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));
export const bookPath = (id: string) => `/books/${id}/`;
export const fullTitle = (book: Book) => book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;
