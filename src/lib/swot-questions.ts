import { Question, SWOTObj, SWOTType } from '../models'

const questionConfig: Record<SWOTType, string[]> = {
  strengths: [
    'What are my top 3 core skills / areas of expertise',
    'What separates me from others?',
    'What are my top 3 achievements?',
    'What am I often complimented on?',
  ],
  weaknesses: [
    "What are 3 skills I'm greatly lacking in?",
    'What separates me from others?',
    'What are 3 tasks or activities I struggle with consistently?',
    'What negative feedback have I received?',
  ],
  opportunities: [
    'What new experiences, skills, or knowledge am I pursuing?',
    'What trends align with my skills?',
    'What are some events/communities I can join to broaden my network?',
    'What partnerships can I leverage?',
  ],
  threats: [
    'What habits or behaviors prevent me from reaching my full potential?',
    'What trends/market uncertainties are leaving me vulnerable?',
    'What environmental factors are limiting my progress?',
    'What partnerships do I need to adjust?',
  ],
}

function mapQstoQuestion(type: string, qs: string[]): Question[] {
  return qs.map((q, i) => ({
    type,
    question: q,
    qid: i,
    value: '',
  }))
}

const questions: SWOTObj<Question[]> = Object.entries(questionConfig).reduce(
  (acc, [type, qs]) => ({
    ...acc,
    [type]: mapQstoQuestion(type, qs),
  }),
  {} as SWOTObj<Question[]>
)

export default questions
