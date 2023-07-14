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
  habit: string
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

export type SWOTType = 'strengths' | 'weaknesses' | 'opportunities' | 'threats'

export interface SWOTObj<T> {
  email?: string
  strengths?: T
  weaknesses?: T
  opportunities?: T
  threats?: T
}

export interface Milestone {
  title: string
  target_date?: typeof Date
  reason?: string
  done?: boolean
}

export interface Habit extends Milestone {
  _id?: string
  milestones: Milestone[]
}
