export interface Categories {
  work: string
  workout: string
  sanity: string
  food: string
  finance: string
  summary?: string
}

export interface PracticeFilter {
  time: number
  goal: string
  category: string
}

export interface LearnSomething {
  _id?: string
  seed: string
  lesson: string
  topics: LearnSomething[]
  num_topics: number
  num_topics_done: number
  done: boolean
}

export interface WhoAmI {
  _id?: string
  questions: Question[]
  isComplete: boolean
  email: string
}

export interface Question {
  question: string
  qid: number
  value: string
  type?: string
}

export interface SWOTQuestions {
  strengths: Question[]
  weaknesses: Question[]
  opportunities: Question[]
  threats: Question[]
}

export type SWOTType = 'strengths' | 'weaknesses' | 'opportunities' | 'threats'

export interface SWOTTypeBoolean {
  strengths?: boolean
  weaknesses?: boolean
  opportunities?: boolean
  threats?: boolean
}

export interface SWOTTypeString {
  strengths?: string
  weaknesses?: string
  opportunities?: string
  threats?: string
}
