'use client';

import { useEffect, useState, type ReactNode } from 'react';

export interface FilterOption {
  value: string;
  label: ReactNode;
}

export function useHashFilter(key: string, options: readonly FilterOption[]) {
  const [active, setActive] = useState('');
  const [ready, setReady] = useState(false);
  useEffect(() => {
    function readHash() {
      const value = new URLSearchParams(window.location.hash.slice(1)).get(key) ?? '';
      setActive(options.some(option => option.value === value) ? value : '');
      setReady(true);
    }
    readHash();
    window.addEventListener('hashchange', readHash);
    window.addEventListener('popstate', readHash);
    return () => {
      window.removeEventListener('hashchange', readHash);
      window.removeEventListener('popstate', readHash);
    };
  }, [key, options]);

  function select(value: string) {
    if (active === value) return;
    const url = new URL(window.location.href);
    url.hash = value ? new URLSearchParams({ [key]: value }).toString() : '';
    window.history.pushState(null, '', url);
    setActive(value);
  }

  return { active, ready, select };
}

export function FilterButtons({ label, options, active, onSelect }: {
  label: string; options: readonly FilterOption[]; active: string; onSelect: (value: string) => void;
}) {
  return <div className="filter-strip" role="group" aria-label={label}>
    {options.map(option => <button type="button" key={option.value} aria-pressed={active === option.value} onClick={() => onSelect(option.value)}>{option.label}</button>)}
  </div>;
}
