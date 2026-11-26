'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';

export function MobileContents({ children }: { children: ReactNode }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const path = usePathname();

  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [path]);

  return <details className="contents-nav site-nav md:hidden" ref={menu} onKeyDown={event => {
    if (event.key === 'Escape' && event.currentTarget.open) {
      event.currentTarget.open = false;
      event.currentTarget.querySelector('summary')?.focus();
    }
  }}>
    <summary>Contents</summary>
    <nav aria-label="Main">{children}</nav>
  </details>;
}
