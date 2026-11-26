# Wren Calloway

A static author website and Jamstacks gallery template. The author, books, reviews and events are
fictional. The site runs from its own checkout and exports to `out/`.

## Preview

Use Node 24 or later and npm.

```sh
npm ci
npm run dev
```

For a preview of the static export, run `npm run check` and then `npm start`. Open the local URL
printed by the server. `npm run check` runs the content and configuration tests, type checks and
production build. The build uses Webpack so it can run in environments that restrict Turbopack’s
local worker ports.

| Page | Route |
| --- | --- |
| Home | `/` |
| Books and bibliography | `/books/` |
| Individual books | `/books/<book-id>/` |
| Upcoming events and archive | `/events/` |
| Praise and prizes | `/praise/` |
| Media kit and downloads | `/media-kit/` |
| Contact | `/contact/` |
| Missing page | `/404.html` |

## Edit the website

| File | What to edit |
| --- | --- |
| `app/page.tsx` | Home headline composition, hero lead and actions, and section labels |
| `app/books/page.tsx` and `app/books/[id]/page.tsx` | Bibliography and book-page headings, links and status wording |
| `app/events/page.tsx` and `app/praise/page.tsx` | Introductions, filter labels and empty states |
| `app/media-kit/page.tsx` and `app/contact/page.tsx` | Section labels, contact instructions and subject suggestions |
| `content/business.ts` | Public author name, location, publisher, email and enquiry checklist |
| `content/books.ts` | Book IDs, publication dates and statuses, prices, extracts, jackets and retailers |
| `content/events.ts` | Local start and end times, event kind, venue, town, access and ticket notes |
| `content/reviews.ts` | Clipping text, attribution, book references, dates and featured flags |
| `content/press.ts` | Biographies, agent, fast facts, interview topics and downloads |
| `components/site-header.tsx` and `components/site-footer.tsx` | Shared navigation and colophon |
| `app/tailwind.input.css`, `components/artwork.tsx`, `lib/artwork.ts` | Proof-paper theme, ornaments and original SVG illustrations |
| `site.config.json` | Provisioned public name, metadata description, domain, time zone and Jamstacks settings |
| `app/sitemap.ts`, `lib/metadata.ts`, `lib/structured-data.ts` | Public route list, social metadata and content-derived schema |

Page-specific text lives in the route files, for example the text inside `<Hero.Lead>` in
`app/page.tsx`. Change names and descriptions in both `content/business.ts` and `site.config.json`.
When personalising the gallery sample, replace `app/icon.svg` and `public/og.png` to match.

### Add an event or review

- In `content/events.ts`, copy an event and give it a new lowercase hyphenated `id`. Set `start`
  and `end` in local `YYYY-MM-DDTHH:MM` format using the configured zone, initially
  `Europe/London`. Both times must be on the same date, with the end after the start. Use a wall
  time that occurs once on clock-change days. Use a matching `bookId` when the event features a book.
  The browser moves an event to the Archive at its end minute, refreshes each minute, and shows
  the next three events on Home and all upcoming appearances for each book.
- In `content/reviews.ts`, supply a new `id`, the book’s ID, quote, source, kind and
  `YYYY-MM-DD` date. Set `featured: true` to let the clipping appear on Home and in the Media kit.
  Those sections use the three newest featured clippings. Praise and the book page show all
  matching clippings.
- Run `npm run check`. For a new launch event and clipping, check Events, Praise, the book page
  and Home. Book-related events link back to their jackets and book pages.

### Publish a book or update an edition

On release day, change the book’s `status` from `forthcoming` to `published`. The book stamp,
the featured book’s hero date line and the available editions’ schema offers update on rebuild.
Manage every edition’s `available` flag and GBP price in its `formats` entry. Add optional
`retailers` entries with a `label` and an HTTP(S) `url`, or use the local-bookshop guidance.
The build validates IDs, dates, prices, availability and references with item-specific failures.

### Home photograph

The opening screen uses a matched pair of still-life photographs: `public/hero-light.webp` (morning
light on paper) and `public/hero-dark.webp` (the same table at night). The theme toggle chooses one,
and only that file downloads. Keep both images 16:9 with the objects in the left 60% and clear table
space on the right, where the headline sits on wide screens. When the featured book changes, replace
both files together so the jacket in the photograph matches. The images are decorative; the hero copy
in `app/page.tsx` carries the title, date and actions.

### Artwork and media downloads

`npm run dev` and `npm run build` regenerate the four jacket SVGs, portrait SVG and
`bios.txt` under `public/media-kit/`. Change jackets in `content/books.ts`, SVG drawings in
`lib/artwork.ts` and bios in `content/press.ts`. The public files are generated from these sources.
The site self-hosts Brygada 1918 and Petrona under the SIL Open Font License and Special Elite under
the Apache License 2.0. The font notices are in `public/font-licenses/`.

## Public configuration and Contact

The provisioner owns the structure of `site.config.json`. Its fields are `name`, `description`,
`domain`, optional `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl` and optional
`provisioningId`. Put author content in `content/`.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Public website ID. Empty uses the file default. |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | Embed CDN asset base |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname override |
| `SITE_TIME_ZONE` | IANA time zone override |
| `PAGES_BASE_PATH` | Project path such as `/preview` |
| `PAGES_BASE_URL` | Actual Pages origin and path for canonicals |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost CDN opt-in for local testing |

Contact always lists the public email. A configured site ID adds one hosted form and bootstrap
on Contact. The hosted runtime provides the name, email and message fields and handles submission.
Without a site ID, Contact displays the email alternative. Contact uses full-document links in
both directions. A check of the host or bootstrap covers integration only. Delivery requires a
separate test against a site with configured recipients.

To verify a project-path export, build with an example path and preview under that same path.

```sh
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

## GitHub Pages and gallery

Set the repository’s Pages source to GitHub Actions. The inherited Pages workflow tests and builds
each pull request and publishes configured main/manual runs. It retains the `provisioning_id`
dispatch input and correlated run name.

Set the custom domain in Settings → Pages or via the workflow’s optional `PAGES_ADMIN_TOKEN`
secret. The workflow uses the `SITE_DOMAIN` repository variable, then the domain in
`site.config.json`, then the gallery repository name. Configure DNS separately. The gallery demo
CNAME targets `jamstacktemplates.github.io`. Enable HTTPS when GitHub has issued the certificate.

The gallery metadata and captures in `jamstacks/` are removable. They are independent of the
customer build, tests and deployment. To refresh the captures, run a normal production build, then
use the Jamstacks portal’s `tools/template-screenshots/capture.mjs` as described in
[jamstacks/README.md](jamstacks/README.md). Run `node --test jamstacks/config.test.mjs` separately.
After reviewing the site, the owner can remove `plan/` and `.claude/skills/`.
