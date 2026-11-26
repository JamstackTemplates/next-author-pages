import type { ReactNode } from 'react';
import { Icon } from './artwork';

export function LetterLayout({ children }: { children: ReactNode }) {
  return <div className="wrap grid items-start gap-9 pb-12 md:grid-cols-12 md:gap-10 md:pb-18">{children}</div>;
}

export function LetterCopy({ children }: { children: ReactNode }) {
  return <section className="md:col-span-6">{children}</section>;
}

export function LetterWindow({ label, children }: { label: string; children: ReactNode }) {
  return <section aria-label={label} className="envelope-window min-h-52 p-6 sm:p-9 md:col-span-6">
    <p className="eyebrow mb-4 flex items-center gap-2"><Icon name="envelope"/>{label}</p>
    {children}
  </section>;
}
