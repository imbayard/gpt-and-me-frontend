export interface Categories {
  work: string,
  workout: string,
  sanity: string,
  food: string,
  finance: string
}

export interface LearnSomething {
  seed: string,
  lesson: string,
  topics: LearnSomething[]
  num_topics: number
  num_topics_done: number
  done: boolean
}