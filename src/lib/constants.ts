import { Categories, LearnSomething } from '../models'

export const URLS = {
  JOURNAL: '/journal',
  LEARN: '/learn-something',
  WHO: '/who-am-i',
  SWOT: '/swot',
  GOALS: '/goal-mgr',
}

export const MAIN_TILE_NAMES = {
  JOURNAL: 'Journal',
  LEARN: 'Learn Something',
  WHO: 'My Summary',
  SWOT: 'SWOT Analysis',
  GOALS: 'Goal Manager',
}

export const CATEGORIES: Categories = {
  work: 'Work',
  workout: 'Workout',
  sanity: 'Sanity',
  food: 'Food',
  finance: 'Finance',
}

export const empty_learn_something: LearnSomething = {
  seed: '',
  _id: '',
  done: false,
  num_topics: 0,
  num_topics_done: 0,
  lesson: '',
  topics: [],
}
