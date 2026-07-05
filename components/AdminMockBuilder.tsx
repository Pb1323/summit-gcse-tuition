'use client';

import { useMemo, useState } from 'react';
import { questions } from '@/data/questions';
import { generateMockFromFilters, validateMock } from '@/lib/mockGeneration';

export function AdminMockBuilder() {
  const [subject, setSubject] = useState('Maths');
  const [tier, setTier] = useState('Both');
  const [count, setCount] = useState(20);
  const [duration, setDuration] = useState(60);
  const [minGrade, setMinGrade] = useState(4);
  const [maxGrade, setMaxGrade] = useState(9);
  const [selectedTopic, setSelectedTopic] = useState('');

  const topics = useMemo(() => Array.from(new Set(questions.filter((q) => !subject || q.subject === subject).map((q) => q.topic))).sort(), [subject]);
  const selected = generateMockFromFilters({ subject, tier, questionCount: count, durationMinutes: duration, minGrade, maxGrade, topics: selectedTopic ? [selectedTopic] : [] });
  const warnings = validateMock(selected, { questionCount: count, durationMinutes: duration });
  const totalMarks = selected.reduce((sum, q) => sum + q.marks, 0);
  const estimatedMinutes = Math.round(selected.reduce((sum, q) => sum + q.estimatedTimeSeconds, 0) / 60);
  const difficultyMix = mix(selected.map((q) => q.difficulty));
  const typeMix = mix(selected.map((q) => q.questionType));

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="card h-fit space-y-4 p-5">
        <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>{unique('subject').map((x) => <option key={x}>{x}</option>)}</select>
        <select className="input" value={tier} onChange={(e) => setTier(e.target.value)}>{['Both', 'Foundation', 'Higher'].map((x) => <option key={x}>{x}</option>)}</select>
        <select className="input" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}><option value="">All topics</option>{topics.map((x) => <option key={x}>{x}</option>)}</select>
        <label className="block text-sm font-bold">Question count<input className="input mt-1" type="number" value={count} onChange={(e) => setCount(+e.target.value)} /></label>
        <label className="block text-sm font-bold">Duration minutes<input className="input mt-1" type="number" value={duration} onChange={(e) => setDuration(+e.target.value)} /></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-bold">Min grade<input className="input mt-1" type="number" min="1" max="9" value={minGrade} onChange={(e) => setMinGrade(+e.target.value)} /></label>
          <label className="block text-sm font-bold">Max grade<input className="input mt-1" type="number" min="1" max="9" value={maxGrade} onChange={(e) => setMaxGrade(+e.target.value)} /></label>
        </div>
        <div>{warnings.map((w) => <p key={w} className="mb-2 rounded-xl bg-amber-50 p-3 text-amber-800">⚠ {w}</p>)}</div>
      </div>
      <div>
        <div className="mb-5 grid gap-3 md:grid-cols-4">
          <Metric label="Selected" value={selected.length} /><Metric label="Marks" value={totalMarks} /><Metric label="Est. minutes" value={estimatedMinutes} /><Metric label="Topics" value={new Set(selected.map((q) => q.topic)).size} />
        </div>
        <div className="card mb-5 p-5"><b>Difficulty:</b> {Object.entries(difficultyMix).map(([k, v]) => `${k} ${v}`).join(' · ')}<br /><b>Types:</b> {Object.entries(typeMix).map(([k, v]) => `${k} ${v}`).join(' · ')}</div>
        <div className="grid gap-3">{selected.map((q) => <div key={q.id} className="card p-4"><b>{q.id}</b> {q.subject} • {q.topic} • {q.difficulty} • {q.marks} marks • {q.questionType}</div>)}</div>
      </div>
    </div>
  );
}

function unique(key: keyof typeof questions[number]) { return Array.from(new Set(questions.map((q) => String(q[key])))).sort(); }
function mix(values: string[]) { return values.reduce<Record<string, number>>((acc, value) => ({ ...acc, [value]: (acc[value] || 0) + 1 }), {}); }
function Metric({ label, value }: { label: string; value: string | number }) { return <div className="card p-4"><div className="text-2xl font-black text-royal">{value}</div><div className="text-sm text-slate-600">{label}</div></div>; }
