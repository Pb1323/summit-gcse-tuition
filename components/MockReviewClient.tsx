'use client';

import { useEffect, useMemo, useState } from 'react';
import { Mock } from '@/data/types';
import { questions } from '@/data/questions';
import { markQuestion } from '@/lib/mockScoring';
import { QuestionRenderer } from './QuestionRenderer';
import { ReviewSummary } from './ReviewSummary';

type SavedAttempt = { answers: Record<string, string>; flagged?: string[] };

export function MockReviewClient({ mock }: { mock: Mock }) {
  const ids = useMemo(() => mock.sections.flatMap((section) => section.questionIds), [mock]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(`gs-${mock.id}`);
    if (!raw) return;
    const parsed: SavedAttempt | Record<string, string> = JSON.parse(raw);
    if ('answers' in parsed) {
      setAnswers(parsed.answers);
      setFlagged(parsed.flagged ?? []);
    } else {
      setAnswers(parsed);
    }
  }, [mock.id]);

  const attempt = {
    mockId: mock.id,
    studentName: 'Saved attempt',
    answers,
    timeSpentSeconds: Object.fromEntries(ids.map((id) => [id, 90])),
  };

  return (
    <div>
      <ReviewSummary attempt={attempt} />
      <h2 className="mt-12 text-3xl font-black">Question-by-question review</h2>
      <div className="mt-6 space-y-6">
        {ids.map((id) => {
          const q = questions.find((item) => item.id === id)!;
          const score = markQuestion(q, answers[id]);
          return (
            <div className="card p-6" key={id}>
              <div className="mb-3 flex flex-wrap gap-2">
                {flagged.includes(id) && <span className="badge bg-amber-100 text-amber-800">Flagged</span>}
                <span className="badge">Awarded {score}/{q.marks}</span>
              </div>
              <QuestionRenderer q={q} answer={answers[id]} />
              <p className="mt-4 rounded-2xl bg-mist p-4"><b>Your answer:</b> {answers[id] || 'No answer submitted'}</p>
              <p className="mt-4"><b>Correct answer:</b> {q.correctAnswer}</p>
              <p><b>Worked solution:</b> {q.workedSolution}</p>
              <p className="text-danger"><b>Common mistake:</b> {q.commonMistake}</p>
              <label className="mt-4 block font-bold">Correction log: What mistake did I make?</label>
              <textarea className="input mt-2 min-h-24" placeholder="Write the correction in your own words..." />
            </div>
          );
        })}
      </div>
    </div>
  );
}
