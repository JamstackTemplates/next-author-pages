# Local verification

The production check passes with Webpack, including 31 Node tests, TypeScript and the static export.
The build generates all four book routes and all six media-kit downloads. The separate gallery
test checks the manifest and both capture hashes. The social image measures 1200 × 630.

Chromium checks covered all 11 page views at 1440px and 390px in light and dark, plus overflow at
360px. Interaction checks covered keyboard navigation, the extract anchor, hash filters and
history, live counts, the event archive, clipboard actions, downloads, theme persistence, print,
reduced motion and the JavaScript-free fallbacks. A Perth browser clock advanced past an event’s
London end minute and the event moved to the archive.

Both `/preview` variants passed checks for canonical URLs, sitemap, robots, social images,
downloads and full-document navigation to and from Contact. The configured build produced one
host and one bootstrap request on each Contact visit. The unconfigured build displayed the email
alternative. The browser used a local response for the bootstrap request.

An isolated copy of the site was rebuilt with a new event and featured review for *The Salt Orchard*.
The additions appeared on the relevant pages and the event appeared in JSON-LD. A status-only edit
updated the book stamp, Home date line and available edition offers. The isolated copies also built
without the gallery directory.

Verification was local. Live enquiry delivery and deployment were outside this run.
