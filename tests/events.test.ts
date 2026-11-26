import assert from 'node:assert/strict';
import { test } from 'node:test';
import { events } from '../content/events.ts';
import { eventDate, scheduleEvent, scheduleEvents, splitSchedule } from '../lib/event-time.ts';

const london = 'Europe/London';
const before = events.find(event => event.id === 'fife-coast-workshop')!;
const after = events.find(event => event.id === 'online-book-club')!;

test('London schedules cross the GMT/BST boundary without changing advertised times', () => {
  const [workshop, online] = scheduleEvents([after, before], london);
  assert.equal(workshop.from.iso, '2027-03-27T10:00:00+00:00');
  assert.equal(online.from.iso, '2027-03-30T19:30:00+01:00');
  assert.deepEqual(eventDate(workshop, london),
    { date: 'Sat 27 March 2027', day: '27', month: 'Mar', time: '10.00am–1.00pm' });
  assert.deepEqual(eventDate(online, london),
    { date: 'Tue 30 March 2027', day: '30', month: 'Mar', time: '7.30–8.30pm' });
});

test('an event goes to the archive at its exact end, even from a Perth clock', () => {
  const schedule = scheduleEvents([after, before], london);
  assert.deepEqual(splitSchedule(schedule, Date.parse('2027-03-31T03:29:59+08:00')).upcoming.map(event => event.id), [after.id]);
  const boundary = splitSchedule(schedule, Date.parse('2027-03-31T03:30:00+08:00'));
  assert.deepEqual(boundary.upcoming, []);
  assert.deepEqual(boundary.earlier.map(event => event.id), [before.id, after.id]);
});

test('invalid, overnight, and ambiguous London times name the event to edit', () => {
  assert.throws(() => scheduleEvent({ ...before, end: '2027-03-28T01:00' }, london), /fife-coast-workshop.*same calendar day/);
  assert.throws(() => scheduleEvent({ ...before, end: before.start }, london), /fife-coast-workshop.*end must follow start/);
  assert.throws(() => scheduleEvent({ ...before, start: '2027-03-28T01:15', end: '2027-03-28T03:00' }, london), /fife-coast-workshop.*clocks change/);
  assert.throws(() => scheduleEvent({ ...before, start: '2027-10-31T01:15', end: '2027-10-31T03:00' }, london), /fife-coast-workshop.*clocks change/);
});
