import { questions } from '@/data/questions';
import { Question } from '@/data/types';

export type Filters = {
  subject?: string;
  tier?: string;
  topics?: string[];
  minGrade?: number;
  maxGrade?: number;
  marks?: number;
  questionCount?: number;
  durationMinutes?: number;
};

export function generateMockFromFilters(filters: Filters) {
  const pool = questions.filter((q) => (
    (!filters.subject || q.subject === filters.subject || (filters.subject === 'Combined Science' && ['Biology', 'Chemistry', 'Physics', 'Combined Science'].includes(q.subject)))
    && (!filters.tier || filters.tier === 'Both' || q.tier === filters.tier || q.tier === 'Both')
    && (!filters.topics?.length || filters.topics.includes(q.topic))
    && (!filters.minGrade || q.targetGrade >= filters.minGrade)
    && (!filters.maxGrade || q.targetGrade <= filters.maxGrade)
  ));

  const buckets = new Map<string, Question[]>();
  pool.forEach((q) => {
    const key = `${q.topic}-${q.difficulty}`;
    buckets.set(key, [...(buckets.get(key) ?? []), q]);
  });

  const selected: Question[] = [];
  while (selected.length < (filters.questionCount || 20) && Array.from(buckets.values()).some(Boolean)) {
    for (const [key, bucket] of buckets) {
      const next = bucket.shift();
      if (next) selected.push(next);
      if (!bucket.length) buckets.delete(key);
      if (selected.length >= (filters.questionCount || 20)) break;
    }
  }
  return selected;
}

export function validateMock(selected: Question[], filters: Filters) {
  const warnings: string[] = [];
  if (selected.length < (filters.questionCount || 20)) warnings.push('Not enough questions match these filters. Broaden subject, tier, topic or grade range.');
  if (selected.filter((q) => q.difficulty === 'easy').length > selected.length * 0.6) warnings.push('Too many easy questions for a balanced GCSE mock. Add grade 6-9 items.');
  if (new Set(selected.map((q) => q.topic)).size < 4 && selected.length > 8) warnings.push('Topic imbalance: add more GCSE strands.');
  const seconds = selected.reduce((sum, q) => sum + q.estimatedTimeSeconds, 0);
  if (filters.durationMinutes && Math.abs(seconds / 60 - filters.durationMinutes) > 15) warnings.push('Estimated time mismatch against chosen duration. Adjust duration or question count.');
  const marks = selected.reduce((sum, q) => sum + q.marks, 0);
  if (filters.marks && Math.abs(marks - filters.marks) > 10) warnings.push('Marks mismatch against target total.');
  if (selected.some((q) => q.subject === 'Maths') && (!selected.some((q) => q.calculatorAllowed) || !selected.some((q) => !q.calculatorAllowed))) warnings.push('Not enough calculator/non-calculator balance.');
  if (selected.some((q) => ['Biology', 'Chemistry', 'Physics', 'Combined Science'].includes(q.subject)) && !selected.some((q) => ['graph', 'diagram', 'required-practical'].includes(q.questionType))) warnings.push('Science set needs more graph, diagram or practical questions.');
  return warnings;
}
