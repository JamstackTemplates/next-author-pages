import { fullTitle, type Book } from '../content/books.ts';

export function xml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]!);
}

const motifs: Record<Book['jacket']['motif'], string> = {
  orchard: `
    <circle cx="176" cy="175" r="39" fill="#B77849" opacity=".56"/>
    <path d="M14 267Q69 238 115 254T229 243V298H14Z" fill="currentColor" opacity=".12"/>
    <path d="M14 275Q58 262 98 272T229 267M15 281q32 9 61 0t69 0t84-3M16 291q69 10 117 0t96 0M16 300q49 4 81-1m49 2 83-2" fill="none" stroke-width="1.3"/>
    <path d="M105 283c8-10 11-18 12-34l-6-29-8-20 5-2 13 18 6 13q11-15 25-22l6 3q-21 17-22 37l-1 19 11 15-15-5-16 8Z" fill="currentColor" stroke-width=".7"/>
    <path d="M124 240q-7-28-32-38t-38-31m43 36q-12-22-16-40m8 30q-20 2-41-13m11-9q-11-13-15-26m11 22-24-5m49 6-18-21m21 27 11-24m17 58 4-30 13-16m-15 28q-2-17-8-24m24 71q14-37 52-64m-22 17q8-22 0-30m9 21q15-1 32-17m-25 8 10-29m-32 46q-4-10-2-25m-2 28 31-5m-74 18q-34-1-52-18m27 15-12-19" fill="none" stroke-width="2"/>
    <path d="M28 158q27-22 55 7t32 8q32-17 65-20l28 4-15 13q-30 31-63 33l-13 8q-17-10-47-13t-42-40Z" fill="url(#DOT)" stroke="none" opacity=".68"/>
    <path d="M44 205c27 0 33 11 54 10M18 222c28-11 44-9 63-5m72 6c26-12 46-16 75-13M16 237l38-7m134 3 40-9" fill="none" opacity=".55"/>
    <g fill="#9E4235" stroke="none"><circle cx="72" cy="182" r="3.1"/><circle cx="101" cy="172" r="3.8"/><circle cx="160" cy="180" r="3.3"/><circle cx="186" cy="164" r="3.6"/><circle cx="57" cy="188" r="2.5"/></g>
    <path d="M95 282q15-10 25-6m15 1 20 8m-46 1-22 2m66-1 18-1" fill="none"/>
  `,
  lighthouse: `
    <path d="M16 281 47 266l26 9 37-14 30 12 37-18 53 23v34H16Z" fill="url(#DOT)" opacity=".8"/>
    <g opacity=".7" fill="none" stroke-width=".8">
      <circle cx="126" cy="182" r="43"/><circle cx="126" cy="182" r="62"/><circle cx="126" cy="182" r="81"/>
      <path d="M28 182h195M126 122v154m-80-45 161-96M54 141l150 88m-129 25 100-131m-1 128L73 125"/>
      <path d="m187 168 15 3-12 5m-137 27-12-4 14-5"/>
    </g>
    <path d="m109 273 9-79h17l11 79Z" fill="currentColor"/>
    <path d="m116 208 22-7 2 13-25 8Zm-4 27 29-9 2 12-32 10Zm-2 26 34-10 1 9-36 10Z" fill="#24364A" stroke="none"/>
    <path d="M113 196h27v-6h-27zm3-7v-17h20v17m-22-17 12-11 13 11m-13-11v-7m-1 21v12" fill="#24364A" stroke-width="1.9"/>
    <path d="M18 289l40-4 25 6 43-7 29 6 41-8 32 7m-209 14 47-5 37 3 25-3 41 3 59-4" fill="none"/>
  `,
  tenement: `
    <circle cx="173" cy="164" r="35" fill="url(#DOT)" stroke="none"/>
    <path d="M22 302V212l26-21h18l4-21 32-26 33 25v17l21-10 27 17h15l24 23v86Z" fill="#2C2533" stroke-width="1.8"/>
    <path d="M70 300V170h65v130M22 216h48m65-23h51v106m0-83h36m-194 74h187M83 300v-17h15v17m47 0v-17h14v17M90 147v-14h8v12m74 37v-18h8v23" fill="none"/>
    <g fill="none" stroke-width="1.25">
      <path d="M37 226h13v17H37zm15 29h12v17H52zm28-73h14v19H80zm31 0h14v19h-14zm-31 31h14v18H80zm31 0h14v18h-14zm-31 30h14v18H80zm31 0h14v18h-14zm35-39h12v18h-12zm22 0h12v18h-12zm-22 28h12v18h-12zm22 0h12v18h-12zm30-3h13v18h-13zm-30 32h12v17h-12z"/>
      <path d="M31 247h33m11-42h55m-55 32h55m-56 29h56m10-40h41m-41 29h41m10-3h27" opacity=".56"/>
    </g>
    <path d="M111 183h14v18h-14zm-31 61h14v17H80zm87-12h13v18h-13z" fill="currentColor"/>
    <path d="M118 183v18m-31 44v16m86-28v17" stroke="#3B2E3F"/>
    <path d="M16 302q45 3 94 0t119 1m-210 7 43-2 33 2 51-3 80 3" fill="none"/>
  `,
  tideline: `
    <path d="M16 208q67 9 104-23t109-22v39q-82-1-113 24t-100 32Z" fill="url(#DOT)" stroke="none" opacity=".78"/>
    <path d="M16 205q54 18 107-19t107-24M16 222q62 9 106-23t107-26M15 246q60-1 106-28t107-26M16 263q77-16 115-39t100-20M16 287q86-31 121-41t94-24M16 302q60-15 103-31t112-22" fill="none" stroke-width="1.4"/>
    <path d="M151 206q-18-13-29-2l-29 35 13-3-7 10q15-4 28-13 18-4 27-19l8-24 11-9 16 1-16-5q-7-5-14 2-12 12-8 27Z" fill="currentColor"/>
    <path d="M151 216q-16 11-35 12m31 1-4 31 6 4m-14-31-8 32-8 5m26-10-8 5" fill="none" stroke-width="1.45"/>
    <path d="m35 282 10-5m12-4 15-3m-33 25 20-4m97-12 16-4m8-3 9-1m-5 13 23-6m-15-37 9-1m-176-3 15 1m130-55 1 0" fill="none" stroke-width="1.5"/>
  `,
};

function jacketLines(title: string) {
  const lines: string[] = [];
  for (const word of title.split(/\s+/)) {
    const previous = lines.at(-1);
    if (previous && `${previous} ${word}`.length <= 11) lines[lines.length - 1] += ` ${word}`;
    else lines.push(word);
  }
  return lines;
}

export function jacketSvg(book: Book, author: string, id: string) {
  const { ground, ink, motif } = book.jacket;
  const titles = jacketLines(book.title);
  const fontSize = Math.min(37, 240 / Math.max(1, ...titles.map(line => line.length)) * 1.65, 112 / titles.length);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 350" role="img" aria-label="${xml(fullTitle(book))} jacket" style="display:block;width:100%;height:auto">
    <defs><pattern id="${id}-dots" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".75" fill="${xml(ink)}"/></pattern>
    <linearGradient id="${id}-sheen"><stop stop-color="#000" stop-opacity=".25"/><stop offset=".055" stop-color="#FFF" stop-opacity=".2"/><stop offset=".125" stop-color="#FFF" stop-opacity="0"/><stop offset=".88" stop-color="#FFF" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".13"/></linearGradient></defs>
    <rect width="250" height="350" rx="2" fill="${xml(ground)}"/>
    <path d="M10 0v350" stroke="${xml(ink)}" opacity=".5"/>
    <path d="M20 33V18h15m180 0h15v15M20 316v15h15m180 0h15v-15" fill="none" stroke="${xml(ink)}" opacity=".6"/>
    <g style="color:${xml(ink)}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${motifs[motif].replaceAll('#DOT', `#${id}-dots`)}</g>
    <g fill="${xml(ink)}" text-anchor="middle" font-family="Brygada 1918 Variable, Georgia, serif">
      <text x="126" y="41" font-family="Special Elite, monospace" font-size="10.5" letter-spacing="2">${xml(author.toUpperCase())}</text>
      <text font-style="italic" font-size="${fontSize}" letter-spacing="-.5">${titles.map((line, index) => `<tspan x="126" y="${76 + index * fontSize * .94}">${xml(line)}</tspan>`).join('')}</text>
      ${book.subtitle ? `<text x="126" y="137" font-style="italic" font-size="12">${xml(book.subtitle)}</text>` : ''}
      <text x="126" y="326" font-family="Special Elite, monospace" font-size="8.5" letter-spacing="1.35">${xml(book.publisher.toUpperCase().replace(/ PRESS$/, ''))}</text>
    </g>
    <rect width="250" height="350" rx="2" fill="url(#${id}-sheen)" pointer-events="none"/>
  </svg>`;
}

export function portraitSvg(id: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img" aria-label="Line portrait of Wren Calloway writing at a rain-streaked window" style="display:block;width:100%;height:auto">
  <defs><pattern id="${id}-dots" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#39493D"/></pattern></defs>
  <path fill="#E3DDD0" d="M0 0h400v300H0z"/>
  <g fill="none" stroke="#39443C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path fill="#CCD6C8" d="M36 24h296v162H36z"/><path d="M28 17h312v178H28zM49 25v161m140-162v162m129-162v162M37 106h294m-294 6h294"/>
    <path stroke="#758C83" d="m69 37-7 17m28-3-7 23m27-32-6 18m32-6-10 24m40-46-5 13m-9 21-5 19m62-44-5 18m29-20-9 23m29-11-7 19m34-18-10 25m36-33-8 24M62 123l-5 13m42-17-11 26m30 10-6 13m34-43-8 19m86 15-5 15m43-52-7 19m34-16-9 25m32-30-7 18"/>
    <path d="M48 163q40-22 71-11t75-6q50-21 123 6M48 171q75-13 107-3t72-3q45-13 90-6" opacity=".6"/>
    <path fill="#DED1B7" d="m39 211 293-23 47 32-13 13-323 17-21-21z"/><path d="m28 229 347-9m-8 13-8 60m-313-43 1 43m107-73 190-10m-313 26 56-2"/>
    <path fill="#EEE5D0" d="m219 202 44-9 31 12-39 13z"/><path d="m229 203 28 10m-19-12 27 9m-17-11 25 9m-17-11 25 9m-35 5 41-11"/>
    <path fill="#B0876E" d="M285 185v17c0 6 19 4 20 0l1-17z"/><ellipse cx="296" cy="185" rx="10" ry="3" fill="#393D35"/><path d="M305 188q13-4 11 4-2 8-11 6"/>
    <path fill="#A1896D" d="M100 299q-4-35 19-66l23-39 36-9q30 9 38 30l24-7 9 9q-20 19-43 19l-11-5q-3 27 15 68Z"/>
    <path fill="url(#${id}-dots)" d="M102 299q-4-32 19-66l22-38 21-6 17 10q-22 26-24 53t8 47z" opacity=".72"/>
    <path d="M138 216q-13 26-16 48m27-48q-10 25-12 42m18-34q-7 19-7 33m40-32 7 6m11 5-6-14m20-6 7 14m-1-17 8 13m-111 46q34-6 69-3m-73 9q36-7 78-4m-81 11q35-7 85-3"/>
    <path fill="#D3A884" d="M161 188q14-10 13-23l-3-24 28-14q13 2 20 19l7 13-7 5q0 13-13 16l-13-2-4 17-11 8Z"/>
    <path fill="#514A40" d="M151 175q-16-20-9-38 8-21 35-22 25-2 36 14-10 0-14 10-8 26-23 39l-16 8z"/>
    <path fill="#514A40" d="M150 141q-22-11-29 4-9 21 14 23l13-10z"/>
    <path stroke="#CEBBA3" d="M150 150q7-23 35-27m-31 38q12-25 39-33m-29 45q17-22 29-33m-68 9q11-10 21 1"/>
    <path fill="#D3A884" d="M237 208q11-8 16-6l15 7q-1 5-11 2l-6 7-7 2z"/><path stroke="#A13C30" stroke-width="2.3" d="m249 211 20-17"/>
    <path fill="#867B63" d="m59 294-5-45q0-10 13-11l50-2q13 1 12 12l-6 46z"/><path d="m67 290-6-38q0-8 9-8l46-1q6 1 5 7l-5 40"/>
    <path d="M10 12h17M10 12v17m380-17h-17m17 0v17M10 289h17m-17 0v-17m380 17h-17m17 0v-17"/>
  </g></svg>`;
}
