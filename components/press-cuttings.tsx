'use client';

import type { ReactNode } from 'react';
import { FilterButtons, useHashFilter, type FilterOption } from './hash-filter';

export function PressCuttings({ groups, options, label }: {
  groups: readonly { id: string; count: number; content: ReactNode }[];
  options: readonly FilterOption[];
  label: string;
}) {
  const { active, ready, select } = useHashFilter('book', options);
  const showing = active ? groups.filter(group => group.id === active) : groups;
  const count = showing.reduce((sum, group) => sum + group.count, 0);
  return <>
    {ready && <FilterButtons label={label} options={options} active={active} onSelect={select}/>}
    {!ready && <nav className="filter-strip" aria-label={label}>
      {options.map(({ value, label }) => <a key={value} href={value ? `#cuttings-${value}` : '#cuttings'}>{label}</a>)}
    </nav>}
    {ready && <p className="mt-3 text-sm text-muted" role="status">{count} {count === 1 ? 'clipping' : 'clippings'}</p>}
    <div id="cuttings">{showing.map(group => group.content)}</div>
  </>;
}
