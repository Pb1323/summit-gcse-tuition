'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import { questions } from '@/data/questions';
import { Mock } from '@/data/types';
import { QuestionNavigator } from './QuestionNavigator';
import { QuestionRenderer } from './QuestionRenderer';
import { Timer } from './Timer';

type SavedAttempt = { answers: Record<string, string>; flagged: string[] };

export function MockRoom({ mock }: { mock: Mock }) {
  const qs = useMemo(
    () => mock.sections.flatMap((section) => section.questionIds).map((id) => questions.find((q) => q.id === id)!).filter(Boolean),
    [mock],
  );
  const ids = qs.map((q) => q.id);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  useEffect(() => {
    const raw = localStorage.getItem(`gs-${mock.id}`);
    if (!raw) return;
    try {
      const parsed: SavedAttempt | Record<string, string> | null = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && 'answers' in parsed) {
        setAnswers(parsed.answers ?? {});
        setFlagged(new Set(parsed.flagged ?? []));
      } else if (parsed && typeof parsed === 'object') {
        setAnswers(parsed as Record<string, string>);
      }
    } catch {
      localStorage.removeItem(`gs-${mock.id}`);
    localStorage.removeItem(`gs-timer-${mock.id}`);
    }
  }, [mock.id]);

  useEffect(() => {
    const payload: SavedAttempt = { answers, flagged: Array.from(flagged) };
    localStorage.setItem(`gs-${mock.id}`, JSON.stringify(payload));
  }, [answers, flagged, mock.id]);

  const current = qs[index];
  if (!current) {
    return <main className="section"><div className="mx-auto max-w-4xl card p-8"><h1 className="text-3xl font-black">Mock unavailable</h1><p className="mt-2 text-slate-600">This mock has no valid questions yet. Please choose another mock or update the question IDs.</p></div></main>;
  }
  const answeredCount = ids.filter((id) => answers[id]?.trim()).length;
  const progress = Math.round((answeredCount / qs.length) * 100);
  const unanswered = qs.length - answeredCount;

  function toggleFlag() {
    setFlagged((previous) => {
      const next = new Set(previous);
      next.has(current.id) ? next.delete(current.id) : next.add(current.id);
      return next;
    });
  }

  function clearAttempt() {
    if (!confirm('Clear this saved attempt and restart the mock?')) return;
    setAnswers({});
    setFlagged(new Set());
    localStorage.removeItem(`gs-${mock.id}`);
    localStorage.removeItem(`gs-timer-${mock.id}`);
  }

  function confirmSubmit(event: MouseEvent<HTMLAnchorElement>) {
    if (!unanswered && !flagged.size) return;
    const ok = confirm(`Submit now? You have ${unanswered} unanswered and ${flagged.size} flagged question(s).`);
    if (!ok) event.preventDefault();
  }

  return (
    <main className="section">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">{mock.title}</h1>
            <p className="text-slate-600">Exam mode: topics hidden until review.</p>
          </div>
          <Timer minutes={mock.durationMinutes} storageKey={`gs-timer-${mock.id}`} reviewHref={`/mocks/${mock.id}/review`} />
        </div>

        <div className="mb-4 h-3 rounded-full bg-mist">
          <div className="h-3 rounded-full bg-royal transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="card h-fit p-4">
            <div className="mb-4 grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <span className="rounded-xl bg-mist p-2">{answeredCount} answered</span>
              <span className="rounded-xl bg-mist p-2">{unanswered} blank</span>
              <span className="rounded-xl bg-mist p-2">{flagged.size} flagged</span>
            </div>
            <QuestionNavigator ids={ids} current={index} answers={answers} flagged={flagged} onGo={setIndex} />
            <button className="btn btn-secondary mt-4 w-full" onClick={toggleFlag}>
              {flagged.has(current.id) ? 'Unflag question' : 'Flag for review'}
            </button>
            <button className="btn btn-secondary mt-2 w-full" onClick={() => setAnswers((a) => ({ ...a, [current.id]: '' }))}>
              Clear answer
            </button>
            <button className="btn btn-secondary mt-2 w-full" onClick={clearAttempt}>Retake / clear saved attempt</button>
          </aside>

          <section className="card p-6">
            <div className="mb-4 text-sm font-bold text-royal">Question {index + 1} of {qs.length}</div>
            <QuestionRenderer q={current} answer={answers[current.id]} examMode onAnswer={(answer) => setAnswers((a) => ({ ...a, [current.id]: answer }))} />
            <div className="mt-6 flex justify-between">
              <button className="btn btn-secondary" onClick={() => setIndex(Math.max(0, index - 1))}>Previous</button>
              {index < qs.length - 1 ? (
                <button className="btn btn-primary" onClick={() => setIndex(index + 1)}>Next</button>
              ) : (
                <Link className="btn btn-primary" href={`/mocks/${mock.id}/review`} onClick={confirmSubmit}>Submit mock</Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
