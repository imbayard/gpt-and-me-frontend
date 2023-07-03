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
}
