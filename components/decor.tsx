// Decorative background art from the world of The Salt Orchard: tidelines drawn like an Admiralty
// chart of the east coast, and a pencil-drawn apple bough. Everything here is aria-hidden and coloured
// with currentColor so the theme tokens set its tone in light, dark and print.

function tidePath(index: number) {
  const base = 26 + index * 34;
  const amp = 9 + (index % 3) * 5;
  const phase = index * 0.9;
  const points: string[] = [];
  for (let x = -20; x <= 620; x += 20) {
    const y = base + Math.sin(x / 88 + phase) * amp + Math.sin(x / 37 + phase * 2) * (amp / 3.5);
    points.push(`${x.toFixed(0)} ${y.toFixed(1)}`);
  }
  return `M${points.join('L')}`;
}

const soundings = [[78, 58, '7'], [214, 122, '12'], [402, 84, '9'], [512, 196, '16'], [148, 236, '21'], [346, 268, '24'], [560, 318, '30']] as const;

/** Chart-style depth contours with soundings; place inside a `relative` parent. */
export function Tidelines({ className = '' }: { className?: string }) {
  return <svg className={`tidelines ${className}`} viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
      {Array.from({ length: 11 }, (_, index) => <path key={index} d={tidePath(index)} strokeDasharray={index % 4 === 3 ? '2 5' : undefined} opacity={1 - index * 0.055}/>)}
    </g>
    <g className="tidelines-soundings" fill="currentColor">
      {soundings.map(([x, y, depth]) => <text key={`${x}-${y}`} x={x} y={y}>{depth}</text>)}
    </g>
    <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".8">
      <circle cx="520" cy="54" r="22"/><circle cx="520" cy="54" r="15" strokeDasharray="1.5 3"/>
      <path d="M520 24v60M490 54h60M520 30l4 24-4 24-4-24Z"/>
    </g>
  </svg>;
}

/** A line drawing of a russet-apple bough, in the manner of the jacket art. */
export function AppleBough({ className = '' }: { className?: string }) {
  return <svg className={`apple-bough ${className}`} viewBox="0 0 420 300" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path strokeWidth="3.2" d="M8 268C70 236 120 214 176 182s104-70 150-122c18-20 40-38 70-52"/>
      <path strokeWidth="2" d="M176 182c-12-30-10-58 8-86M232 146c22 6 48 2 70-14M128 210c-8 18-26 34-48 42M288 92c-4-22 4-44 20-58M326 60c20 4 38 14 52 30"/>
      <g strokeWidth="1.4">
        <path d="M184 96c-24-8-42 2-52 20 24 6 42-2 52-20Zm0 0-40 14"/>
        <path d="M184 96c4-22 22-34 44-34-4 22-22 34-44 34Zm0 0 34-28"/>
        <path d="M302 132c18 12 38 12 54 0-16-14-38-12-54 0Zm0 0h46"/>
        <path d="M80 252c-22 2-38 16-42 34 22-2 38-14 42-34Zm0 0-34 28"/>
        <path d="M308 34c-6-18 0-30 16-34 4 16-2 28-16 34Zm0 0 12-28"/>
        <path d="M378 90c18-6 34 0 40 14-18 4-32-2-40-14Zm0 0 34 12"/>
        <path d="M244 140c-2 24 10 40 30 46 2-22-10-38-30-46Zm0 0 26 40"/>
      </g>
    </g>
    <g className="apple-bough-fruit" stroke="currentColor" strokeWidth="1.4">
      <path d="M206 192c-14-4-26 6-24 22 2 18 18 26 30 20 12 6 28-4 28-22 0-16-14-24-26-20-3 1-5 1-8 0Z"/>
      <path d="M212 192c0-8 2-14 6-18" fill="none"/>
      <path d="M118 222c-11-3-21 5-19 18 2 14 14 20 24 16 10 5 22-3 22-18 0-13-11-19-21-16-2 1-4 1-6 0Z"/>
      <path d="M123 222c0-7 2-11 5-14" fill="none"/>
      <path d="M342 70c-10-3-19 4-17 16 1 13 13 19 22 15 9 4 20-3 20-16 0-12-10-18-19-15-2 1-4 1-6 0Z"/>
      <path d="M346 70c0-6 1-10 4-13" fill="none"/>
    </g>
  </svg>;
}
