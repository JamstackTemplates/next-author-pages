export const eventKinds = { reading: 'Readings', festival: 'Festivals', workshop: 'Workshops', online: 'Online' } as const;

export interface AuthorEvent {
  /** Stable slug for links to this event. */
  id: string;
  title: string;
  kind: keyof typeof eventKinds;
  /** Local YYYY-MM-DDTHH:MM in the site's time zone, no offset. Both on the same calendar day. */
  start: string;
  end: string;
  venue: string;
  town: string;
  online: boolean;
  /** Optional ID from books.ts. */
  bookId?: string;
  /** Plain ticket guidance, without on-site transactions. */
  tickets: string;
  access?: string;
}

export const events: readonly AuthorEvent[] = [
  { id: 'riverside-weekend-2026', title: 'Weather Writing', kind: 'festival', start: '2026-10-03T14:00', end: '2026-10-03T15:00', venue: 'Wigtown Riverside Book Weekend', town: 'Wigtown', online: false, bookId: 'on-tidelines', tickets: 'Tickets from the festival.' },
  { id: 'stockbridge-library-2026', title: 'Reading and Q&A', kind: 'reading', start: '2026-11-12T18:30', end: '2026-11-12T19:30', venue: 'Stockbridge Library', town: 'Edinburgh', online: false, bookId: 'the-lighthouse-almanac', tickets: 'Free, no booking.' },
  { id: 'lantern-row-launch', title: 'Launch of The Salt Orchard', kind: 'reading', start: '2027-03-04T19:00', end: '2027-03-04T20:30', venue: 'Cairn & Quill Bookshop', town: 'Edinburgh', online: false, bookId: 'the-salt-orchard', tickets: 'Tickets from the venue.', access: 'Ask the bookshop about step-free access.' },
  { id: 'fife-coast-workshop', title: 'Writing Place: a coastal workshop', kind: 'workshop', start: '2027-03-27T10:00', end: '2027-03-27T13:00', venue: 'Elie Village Hall', town: 'Elie', online: false, tickets: 'Places via the venue.', access: 'Bring a notebook and something to write with.' },
  { id: 'online-book-club', title: 'Online book-club conversation', kind: 'online', start: '2027-03-30T19:30', end: '2027-03-30T20:30', venue: 'Online book club', town: '', online: true, bookId: 'the-salt-orchard', tickets: 'Link sent by the organiser.' },
  { id: 'clyde-words-glasgow', title: 'In conversation', kind: 'festival', start: '2027-04-17T16:00', end: '2027-04-17T17:00', venue: 'Clyde Words Festival', town: 'Glasgow', online: false, bookId: 'the-salt-orchard', tickets: 'Tickets from the festival.' },
  { id: 'tweedside-melrose', title: 'Orchards and Floods panel', kind: 'festival', start: '2027-06-19T11:30', end: '2027-06-19T12:30', venue: 'Tweedside Book Festival', town: 'Melrose', online: false, bookId: 'the-salt-orchard', tickets: 'Tickets from the festival.' },
];
