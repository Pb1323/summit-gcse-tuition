import { questions } from '@/data/questions';
export const allTopics=Array.from(new Set(questions.map(q=>q.topic))).sort();
export const topicCounts=allTopics.map(topic=>({topic,count:questions.filter(q=>q.topic===topic).length}));
