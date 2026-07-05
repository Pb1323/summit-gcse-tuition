'use client';

import { useEffect, useState } from 'react';

type TimerProps = {
  minutes: number;
  storageKey?: string;
  reviewHref?: string;
};

export function Timer({ minutes, storageKey, reviewHref }: TimerProps) {
  const [seconds, setSeconds] = useState(minutes * 60);

  useEffect(() => {
    const key = storageKey ?? `timer-${minutes}`;
    const existingEnd = Number(localStorage.getItem(key));
    const endTime = existingEnd > Date.now() ? existingEnd : Date.now() + minutes * 60 * 1000;
    localStorage.setItem(key, String(endTime));

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setSeconds(remaining);
      if (remaining === 0 && reviewHref) {
        localStorage.removeItem(key);
        window.location.href = reviewHref;
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [minutes, reviewHref, storageKey]);

  const lowTime = seconds <= 300;
  return (
    <div className={`rounded-full px-4 py-2 font-black text-white ${lowTime ? 'bg-danger' : 'bg-navy'}`}>
      {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
    </div>
  );
}
