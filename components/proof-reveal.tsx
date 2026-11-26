'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function ProofReveal({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('proof-in-view');
        observer.disconnect();
      }
    }, { threshold: .14 });
    element.classList.add('proof-prepared');
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
