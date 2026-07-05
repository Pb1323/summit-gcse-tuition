'use client';

import { useMemo, useState } from 'react';
import { questions } from '@/data/questions';
import { QuestionRenderer } from './QuestionRenderer';

export function AdminQuestionBank() {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [tier, setTier] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [topic, setTopic] = useState('');
  const [examBoard, setExamBoard] = useState('');
  const [diagram, setDiagram] = useState('');
  const [limit, setLimit] = useState(60);
  const [preview, setPreview] = useState(questions[0]);

  const list = useMemo(() => {
    return questions.filter((q) => {
      const searchable = [q.id, q.text, q.topic, q.subtopic, q.skill, ...q.tags].join(' ').toLowerCase();
      return (!search || searchable.includes(search.toLowerCase()))
        && (!subject || q.subject === subject)
        && (!tier || q.tier === tier)
        && (!difficulty || q.difficulty === difficulty)
        && (!type || q.questionType === type)
        && (!topic || q.topic === topic)
        && (!examBoard || q.examBoard === examBoard)
        && (!diagram || (diagram === 'yes' ? q.hasDiagram : !q.hasDiagram));
    });
  }, [search, subject, tier, difficulty, type, topic, examBoard, diagram]);

  const qualityWarnings = [
    preview.questionType === 'MCQ' && !preview.options?.length ? 'MCQ has no options' : '',
    preview.markingScheme.length < 3 ? 'Short marking scheme' : '',
    preview.hasDiagram && !preview.diagram ? 'Diagram metadata missing' : '',
  ].filter(Boolean);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div>
        <div className="card mb-4 grid gap-3 p-4 md:grid-cols-3">
          <input className="input" placeholder="Search ID, text, topic, skill or tag" onChange={(e) => setSearch(e.target.value)} />
          <Filter label="Subject" value={subject} setValue={setSubject} values={unique('subject')} />
          <Filter label="Tier" value={tier} setValue={setTier} values={unique('tier')} />
          <Filter label="Difficulty" value={difficulty} setValue={setDifficulty} values={unique('difficulty')} />
          <Filter label="Type" value={type} setValue={setType} values={unique('questionType')} />
          <Filter label="Topic" value={topic} setValue={setTopic} values={unique('topic')} />
          <Filter label="Exam board" value={examBoard} setValue={setExamBoard} values={unique('examBoard')} />
          <select className="input" value={diagram} onChange={(e) => setDiagram(e.target.value)}>
            <option value="">Diagram yes/no</option><option value="yes">yes</option><option value="no">no</option>
          </select>
        </div>
        <p className="mb-3 text-sm font-bold text-slate-600">Showing {Math.min(limit, list.length)} of {list.length} matching questions.</p>
        <div className="space-y-3">
          {list.slice(0, limit).map((q) => (
            <button key={q.id} onClick={() => setPreview(q)} className="card w-full p-4 text-left">
              <b>{q.id}</b> {q.subject} • {q.topic} • {q.marks} marks • Grade {q.targetGrade}
              <span className="mt-2 block text-xs text-slate-500">{q.tags.join(' · ')}</span>
            </button>
          ))}
        </div>
        {limit < list.length && <button className="btn btn-secondary mt-5" onClick={() => setLimit((n) => n + 60)}>Load more</button>}
      </div>
      <aside className="card h-fit p-5">
        <QuestionRenderer q={preview} />
        <div className="my-4 flex flex-wrap gap-2">{qualityWarnings.map((warning) => <span className="badge bg-amber-100 text-amber-800" key={warning}>{warning}</span>)}</div>
        <h4 className="mt-4 font-black">Marking scheme</h4>
        <ul className="list-disc pl-5">{preview.markingScheme.map((m) => <li key={m}>{m}</li>)}</ul>
        <p className="mt-3 text-danger"><b>Common mistake:</b> {preview.commonMistake}</p>
        <button className="btn btn-secondary mt-4" onClick={() => navigator.clipboard?.writeText(preview.id)}>Copy question ID</button>
      </aside>
    </div>
  );
}

function unique(key: keyof typeof questions[number]) {
  return Array.from(new Set(questions.map((q) => String(q[key])))).sort();
}

function Filter({ label, value, setValue, values }: { label: string; value: string; setValue: (value: string) => void; values: string[] }) {
  return (
    <select className="input" value={value} onChange={(e) => setValue(e.target.value)}>
      <option value="">{label}</option>
      {values.map((item) => <option key={item}>{item}</option>)}
    </select>
  );
}
