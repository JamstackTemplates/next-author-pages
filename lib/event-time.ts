import type { AuthorEvent } from '../content/events.ts';
import { site } from './site.ts';

export const eventZone = site.timeZone || 'Europe/London';

const offsetFormatters = new Map<string, Intl.DateTimeFormat>();

function offsetAt(date: Date, zone: string) {
  let formatter = offsetFormatters.get(zone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-GB', { timeZone: zone, timeZoneName: 'longOffset' });
    offsetFormatters.set(zone, formatter);
  }
  const name = formatter.formatToParts(date).find(part => part.type === 'timeZoneName')?.value;
  const match = /^GMT([+-])(\d{2}):(\d{2})$/.exec(name ?? '');
  return match ? (Number(match[2]) * 60 + Number(match[3])) * (match[1] === '-' ? -1 : 1) : 0;
}

export function isCalendarDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(+date) && date.toISOString().slice(0, 10) === value;
}

/** Convert a wall time in the venue zone, rejecting gaps and duplicated hours at clock changes. */
export function zonedTime(local: string, zone: string) {
  if (!isCalendarDate(local.slice(0, 10)) || !/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d$/.test(local)) {
    throw new Error(`invalid local time "${local}"; use YYYY-MM-DDTHH:MM`);
  }
  const utc = Date.parse(`${local}Z`);
  const day = 86_400_000;
  const offsets = new Set([utc - day, utc, utc + day].map(time => offsetAt(new Date(time), zone)));
  const matches = [...offsets].filter(offset => offsetAt(new Date(utc - offset * 60_000), zone) === offset);
  if (matches.length !== 1) throw new Error(`"${local}" is missing or ambiguous in ${zone} because the clocks change`);
  const offset = matches[0];
  const digits = (number: number) => String(number).padStart(2, '0');
  const suffix = `${offset < 0 ? '-' : '+'}${digits(Math.floor(Math.abs(offset) / 60))}:${digits(Math.abs(offset) % 60)}`;
  return { instant: utc - offset * 60_000, iso: `${local}:00${suffix}` };
}

export function scheduleEvent(event: AuthorEvent, zone = eventZone) {
  try {
    if (event.start.slice(0, 10) !== event.end.slice(0, 10) || event.start >= event.end) {
      throw new Error('end must follow start on the same calendar day');
    }
    return { ...event, from: zonedTime(event.start, zone), to: zonedTime(event.end, zone) };
  } catch (error) {
    throw new Error(`event ${event.id}: ${(error as Error).message}`, { cause: error });
  }
}

export type ScheduledEvent = ReturnType<typeof scheduleEvent>;

export function scheduleEvents(events: readonly AuthorEvent[], zone = eventZone) {
  return events.map(event => scheduleEvent(event, zone)).sort((a, b) => a.from.instant - b.from.instant);
}

export function splitSchedule<T extends Pick<ScheduledEvent, 'to'>>(events: readonly T[], now: number) {
  return {
    upcoming: events.filter(event => event.to.instant > now),
    earlier: events.filter(event => event.to.instant <= now),
  };
}

export function eventDate(event: ScheduledEvent, zone = eventZone) {
  const start = new Date(event.from.instant);
  const end = new Date(event.to.instant);
  const full = new Intl.DateTimeFormat('en-GB', { timeZone: zone, weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }).format(start).replace(',', '');
  const stamp = new Intl.DateTimeFormat('en-GB', { timeZone: zone, day: '2-digit', month: 'short' }).format(start);
  const time = new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: 'numeric', minute: '2-digit', hour12: true });
  const format = (date: Date) => {
    const parts = time.formatToParts(date);
    const get = (type: string) => parts.find(part => part.type === type)?.value ?? '';
    return { clock: `${get('hour')}.${get('minute')}`, period: get('dayPeriod').toLowerCase() };
  };
  const a = format(start);
  const b = format(end);
  return { date: full, day: stamp.slice(0, 2), month: stamp.slice(3), time: `${a.clock}${a.period === b.period ? '' : a.period}–${b.clock}${b.period}` };
}
