'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from './artwork';

/** Progressive enhancement: the original text stays selectable when copying is unavailable. */
export function CopyText({ text, label, accessibleLabel }: { text: string; label: string; accessibleLabel?: string }) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setSupported(typeof navigator !== 'undefined' && !!navigator.clipboard?.writeText);
    return () => clearTimeout(timer.current);
  }, []);

  if (!supported) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch {
      setState('failed');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 4000);
  }

  return (
    <>
      <button type="button" className="button button-quiet" onClick={copy} aria-label={accessibleLabel}>
        <Icon name="copy"/> {label}
      </button>
      <span className="copy-status text-[.9375rem] text-muted" role="status" aria-live="polite">
        {state === 'copied' ? 'Copied to clipboard.' : state === 'failed' ? 'Couldn’t copy — select the text instead.' : ''}
      </span>
    </>
  );
}

export function CopyEmail({ email }: { email: string }) {
  return <CopyText text={email} label="Copy address"/>;
}
