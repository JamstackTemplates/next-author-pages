import type { ReactNode } from 'react';
import { ProofMark, type MarkKind } from './artwork';
import { Tidelines } from './decor';

interface Children { children: ReactNode }

function Head({ children, mark = 'caret' }: Children & { mark?: MarkKind }) {
  return <header className="page-head relative isolate overflow-hidden">
    <Tidelines className="page-head-tides"/>
    <div className="wrap grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 pt-11 pb-8 sm:grid-cols-[3.6rem_minmax(0,1fr)] sm:gap-x-5 sm:pt-16 sm:pb-12">
      <div className="border-r border-line pr-2 pt-8 sm:pr-3"><ProofMark kind={mark}/></div>
      <div>{children}</div>
    </div>
  </header>;
}

function Slug({ children }: Children) {
  return <p className="eyebrow mb-3">{children}</p>;
}

function Title({ children }: Children) {
  return <h1 className="text-[clamp(3rem,8vw,7rem)] tracking-[-.07em]">{children}</h1>;
}

function Introduction({ children }: Children) {
  return <p className="mt-4 max-w-(--measure) text-lg text-muted">{children}</p>;
}

export const PageHead = Object.assign(Head, { Slug, Title, Introduction });

export function SectionTitle({ children, id, mark = 'caret' }: Children & { id?: string; mark?: MarkKind }) {
  return <h2 id={id} className="margin-heading text-[clamp(2.15rem,4.1vw,4rem)] tracking-[-.052em]">
    <ProofMark kind={mark}/><span>{children}</span>
  </h2>;
}
