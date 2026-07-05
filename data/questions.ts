import { Question } from './types';
const mathsTopics=['Number','Fractions, decimals, percentages','Ratio and proportion','Algebra','Expanding/factorising','Linear equations','Simultaneous equations','Quadratics','Sequences','Graphs','Angles','Circle theorems','Pythagoras','Trigonometry','Area and volume','Transformations','Vectors','Probability','Statistics'];
const scienceTopics={Biology:['Cell biology','Organisation','Infection and response','Bioenergetics','Homeostasis','Inheritance','Ecology'],Chemistry:['Atomic structure','Bonding','Quantitative chemistry','Chemical changes','Energy changes','Rates','Organic chemistry','Chemical analysis','Atmosphere','Resources'],Physics:['Energy','Electricity','Particle model','Atomic structure','Forces','Waves','Magnetism','Space']};
const qtypes=['MCQ','short-answer','calculation','graph','diagram','explain','multi-step'] as const;
const diagrams=['coordinate-grid','trig-triangle','circle-theorem','bar-chart','histogram','volume-box','number-line'] as const;
export const questions:Question[]=[];
for(let i=1;i<=70;i++){const topic=mathsTopics[(i-1)%mathsTopics.length]; const hard=i%10===0; const calc=i%3!==0; const marks= hard?5:(i%4)+2; const grade=(hard?8:i%3===0?6:i%2===0?5:4) as 4|5|6|8; const type=qtypes[i%qtypes.length]; const hasDiagram=['graph','diagram'].includes(type)||['Graphs','Trigonometry','Circle theorems','Statistics','Area and volume'].includes(topic); questions.push({id:`M${String(i).padStart(3,'0')}`,subject:'Maths',examBoard:i%2?'AQA':'Edexcel',tier:grade>=6?'Higher':i%5===0?'Both':'Foundation',paper:calc?'Paper 2':'Paper 1',topic,subtopic:`${topic} exam method`,skill: hard?'multi-step reasoning and checking':'accurate GCSE method',difficulty:hard?'grade-7-9':grade>=6?'hard':grade===5?'medium':'easy',targetGrade:grade,questionType:type,marks,estimatedTimeSeconds:marks*75,calculatorAllowed:calc,text:`${topic}: A GCSE student is solving a ${hard?'stretch multi-step':'core'} problem. Use the information given to find the missing value, show the method clearly, and give a reasonableness check. Values: ${i+8}, ${i*2+3}, and ${i%7+4}.`,options:type==='MCQ'?['A: 12','B: 18','C: 24','D: 30']:undefined,correctAnswer:type==='MCQ'?'B: 18':`A fully simplified answer with correct units for ${topic}.`,workedSolution:`Identify the relevant ${topic} rule, substitute the values, complete each arithmetic step, then check the answer against the context. Award method marks even if the final arithmetic slips.`,markingScheme:[`Selects an appropriate ${topic} method`, 'Substitutes or represents values correctly', 'Completes calculation/algebra accurately', 'Gives final answer with units or notation where needed'],commonMistake:`Students often rush the ${topic} setup and lose a method mark before doing the calculation.`,tags:['GCSE','mock','worked-solution',calc?'calculator':'non-calculator'],hasDiagram,diagram:hasDiagram?{type:diagrams[i%diagrams.length],title:`${topic} diagram`}:undefined});}
let n=1; (Object.entries(scienceTopics) as [Question['subject'],string[]][]).forEach(([subject,topics])=>topics.forEach((topic,idx)=>{for(let k=0;k<(subject==='Biology'?3: subject==='Chemistry'?2:2);k++){const i=n++; const practical=i%6===0; const calc=subject!=='Biology'&&i%3===0; const type= practical?'required-practical':calc?'calculation':i%5===0?'graph':i%4===0?'diagram':i%3===0?'explain':'short-answer'; const marks= practical?6:calc?4:(i%3)+2; const grade=(i%9===0?8:i%4===0?6:i%2===0?5:4) as 4|5|6|8; const hasDiagram=['graph','diagram','required-practical'].includes(type); questions.push({id:`S${String(i).padStart(3,'0')}`,subject,examBoard:'AQA',tier:grade>=6?'Higher':'Both',paper:subject,topic,subtopic:`${topic} application`,skill:practical?'required practical method and variables':calc?'equation selection and unit conversion':'scientific recall with application',difficulty:grade>=8?'grade-7-9':grade>=6?'hard':grade===5?'medium':'easy',targetGrade:grade,questionType:type,marks,estimatedTimeSeconds:marks*80,calculatorAllowed:calc,text:`${subject} - ${topic}: Answer this GCSE exam-style question using precise scientific vocabulary. ${practical?'Describe a valid practical method, variables, safety and how results would be processed.':calc?'Use the relevant equation and show substitutions with units.':'Apply the idea to a new context and explain the evidence.'}`,options:undefined,correctAnswer:`A response covering the key ${topic} points with correct terminology.`,workedSolution:`State the principle for ${topic}, link it to the evidence in the question, and sequence the explanation so each mark point is clear.`,markingScheme:[`Correct scientific point about ${topic}`,'Uses evidence/data from the question','Develops explanation or calculation logically','Includes units, controls or safety where relevant'],commonMistake:`Vague wording such as “it changes” without naming the variable or particle/process.`,tags:['GCSE',subject,'science',practical?'required-practical':'topic'],hasDiagram,diagram:hasDiagram?{type:practical?'practical':type==='graph'?'data-chart':subject==='Physics'?'circuit':'cell',title:`${topic} support diagram`}:undefined});}}));

const widerGcseTopics={
  English:['Language analysis','Creative writing','Transactional writing','Literature extract','Comparison'],
  Geography:['Natural hazards','Living world','Urban issues','Changing economic world','Resource management','Geographical skills'],
  Economics:['Markets','Demand and supply','Costs and revenue','Competition','Government intervention','Macroeconomic objectives'],
  German:['Reading comprehension','Translation into English','Translation into German','Photo card response','Role play','Writing accuracy'],
  'Design Technology':['Materials','Manufacturing processes','Design evaluation','Sustainability','Forces and stresses','Electronic systems']
} as const;
(Object.entries(widerGcseTopics) as [Question['subject'],readonly string[]][]).forEach(([subject,topics])=>{
  topics.forEach((topic,idx)=>{
    for(let k=1;k<=4;k++){
      const idPrefix=subject==='English'?'E':subject==='Geography'?'GEO':subject==='Economics'?'ECO':subject==='German'?'GER':'DT';
      const number=idx*4+k;
      const essay=['English','Geography','Economics'].includes(subject);
      const type:Question['questionType']=subject==='German'?(k%2?'short-answer':'long-answer'):essay?(k===4?'evaluate':'explain'):(k%3===0?'diagram':'short-answer');
      const marks=type==='evaluate'?9:type==='long-answer'?6:type==='diagram'?4:3;
      const grade=(k===4?8:k===3?6:k===2?5:4) as 4|5|6|8;
      questions.push({
        id:`${idPrefix}${String(number).padStart(3,'0')}`,
        subject,
        examBoard:'Generic GCSE',
        tier:'Both',
        paper:subject==='English'?'Language/Literature':subject==='Geography'?'Paper 1/2/3':subject==='Economics'?'Paper 1/2':subject==='German'?'Reading/Writing':'Principles',
        topic,
        subtopic:`${topic} exam response`,
        skill:type==='evaluate'?'balanced judgement with evidence':'accurate GCSE exam technique',
        difficulty:grade>=8?'grade-7-9':grade>=6?'hard':grade===5?'medium':'easy',
        targetGrade:grade,
        questionType:type,
        marks,
        estimatedTimeSeconds:marks*90,
        calculatorAllowed:false,
        text:`${subject} - ${topic}: Complete this original GCSE-style task. Use the source/context provided by your teacher, structure your response clearly, and include precise evidence or specialist vocabulary where relevant.`,
        correctAnswer:`A clear response addressing ${topic}, using relevant GCSE terminology and a justified final point.`,
        workedSolution:`Plan the answer, identify the command word, select two or three precise points, develop each point with evidence, then finish with a judgement or check against the question focus.`,
        markingScheme:[`Addresses the command word for ${topic}`,'Uses accurate subject terminology','Develops points with evidence or context','Organises the final answer clearly'],
        commonMistake:'Writing a general answer that does not return to the exact command word or evidence in the question.',
        tags:['GCSE',subject,'original-exam-style','not-copied-from-past-paper'],
        hasDiagram:type==='diagram',
        diagram:type==='diagram'?{type:subject==='Design Technology'?'forces':'data-chart',title:`${topic} visual prompt`}:undefined
      });
    }
  })
});
