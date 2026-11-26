'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { splitSchedule, type ScheduledEvent } from '../lib/event-time';
import { FilterButtons, useHashFilter, type FilterOption } from './hash-filter';
import { SectionTitle } from './page-head';

export type EventEntry = Pick<ScheduledEvent, 'id' | 'kind' | 'to'> & { row: ReactNode };
type AgendaEntry = EventEntry & { schema: ReactNode };

function useEventClock() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    // Align to the minute boundary used by the event data.
    let interval: ReturnType<typeof setInterval>;
    const timer = setTimeout(() => {
      update();
      interval = setInterval(update, 60_000);
    }, 60_000 - Date.now() % 60_000);
    document.addEventListener('visibilitychange', update);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  return now;
}

function Rows({ entries }: { entries: readonly EventEntry[] }) {
  return <ol className="itinerary">{entries.map(entry => entry.row)}</ol>;
}

export function EventPreview({ entries, heading, staticHeading, empty, limit, children }: {
  entries: readonly EventEntry[]; heading: string; staticHeading: string; empty: string; limit?: number; children?: ReactNode;
}) {
  const now = useEventClock();
  const listed = now === null ? entries.slice(0, 3) : splitSchedule(entries, now).upcoming.slice(0, limit);
  return <>
    <SectionTitle mark="transposition">{now === null ? staticHeading : heading}</SectionTitle>
    <div className="mt-6">{listed.length ? <Rows entries={listed}/> : <p className="text-muted">{empty}</p>}</div>
    {children && <div className="mt-4">{children}</div>}
  </>;
}

export function EventAgenda({ entries, options, fallback, copy, exportedAt }: {
  entries: readonly AgendaEntry[]; exportedAt: number; options: readonly FilterOption[]; fallback: ReactNode;
  copy: { label: string; staticHeading: string; upcoming: string; archive: string; earlier: string; empty: string; emptyArchive: string };
}) {
  const { active, ready, select } = useHashFilter('kind', options);
  const now = useEventClock();
  const [initialFragment, setInitialFragment] = useState('');
  useEffect(() => {
    setInitialFragment(window.location.hash.slice(1));
  }, []);
  const filtered = active ? entries.filter(entry => entry.kind === active) : entries;
  const { upcoming, earlier } = now === null ? { upcoming: filtered, earlier: [] } : splitSchedule(filtered, now);
  const { upcoming: structuredEvents } = splitSchedule(entries, now ?? exportedAt);
  return <>
    {ready && <FilterButtons label={copy.label} options={options} active={active} onSelect={select}/>}
    <noscript><style>{'.agenda-static { display:none }'}</style>{fallback}</noscript>
    <div className="agenda-static">
      {ready && <p className="mt-3 text-sm text-muted" role="status">{filtered.length} {filtered.length === 1 ? 'event' : 'events'}</p>}
      <h2 className="mt-6 mb-4 text-3xl">{now === null ? copy.staticHeading : copy.upcoming}</h2>
      {upcoming.length ? <Rows entries={upcoming}/> : <p className="mb-6 border-b border-line pb-5 text-muted">{copy.empty}</p>}
      {now !== null && <details className="archive mt-10 px-2 py-3 text-muted sm:px-4" open={earlier.some(entry => entry.id === initialFragment) || undefined}>
        <summary className="min-h-9 pt-1 font-note text-sm text-ink">{copy.archive}</summary>
        <h3 className="mt-4 mb-3 text-2xl">{copy.earlier}</h3>
        {earlier.length ? <Rows entries={earlier}/> : <p className="mb-4">{copy.emptyArchive}</p>}
      </details>}
    </div>
    {structuredEvents.map(entry => entry.schema)}
  </>;
}
