export type Subject='Maths'|'Biology'|'Chemistry'|'Physics'|'Combined Science'|'English';
export type Tier='Foundation'|'Higher'|'Both';
export type Difficulty='easy'|'medium'|'hard'|'grade-7-9';
export type QuestionType='MCQ'|'short-answer'|'long-answer'|'calculation'|'graph'|'diagram'|'required-practical'|'explain'|'evaluate'|'multi-step';
export type DiagramType='coordinate-grid'|'trig-triangle'|'circle-theorem'|'bar-chart'|'histogram'|'volume-box'|'number-line'|'circuit'|'ray'|'cell'|'practical'|'forces'|'data-chart';
export type Question={id:string;subject:Subject;examBoard:'AQA'|'Edexcel'|'OCR'|'Generic GCSE';tier:Tier;paper:string;topic:string;subtopic:string;skill:string;difficulty:Difficulty;targetGrade:4|5|6|7|8|9;questionType:QuestionType;marks:number;estimatedTimeSeconds:number;calculatorAllowed:boolean;text:string;options?:string[];correctAnswer:string;workedSolution:string;markingScheme:string[];commonMistake:string;tags:string[];hasDiagram:boolean;diagram?:{type:DiagramType;title:string;data?:Record<string,string|number>}};
export type Mock={id:string;title:string;subject:string;tier:Tier;durationMinutes:number;totalMarks:number;questionCount:number;difficultyMix:Record<string,number>;topicWeightage:Record<string,number>;sections:{title:string;instructions:string;questionIds:string[]}[];instructions:string[];recommendedNextSteps:string[];description:string};
export type Attempt={mockId:string;studentName:string;answers:Record<string,string>;timeSpentSeconds:Record<string,number>};
