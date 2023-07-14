import { Habit, LearnSomething } from '../models'

const mockTopics = [
  {
    seed: 'Examples',
    lesson:
      'Artificial intelligence is increasingly permeating various aspects of life, revolutionizing sectors like healthcare and finance by providing groundbreaking solutions. This advanced technology is aiding in disease diagnosis, predictive analysis, and risk management. Furthermore, the concept of remote work, propelled by recent global events, has altered traditional employment paradigms, promoting flexibility and work-life integration. On a grander scale, advancements in space technology are inspiring a new generation, fueling the aspiration for interstellar exploration and the pursuit of extraterrestrial life',
    num_topics: 0,
    num_topics_done: 0,
    done: true,
    topics: [],
  },
  {
    seed: 'Second Node',
    lesson:
      'Artificial intelligence is increasingly permeating various aspects of life, revolutionizing sectors like healthcare and finance by providing groundbreaking solutions. This advanced technology is aiding in disease diagnosis, predictive analysis, and risk management. Furthermore, the concept of remote work, propelled by recent global events, has altered traditional employment paradigms, promoting flexibility and work-life integration. On a grander scale, advancements in space technology are inspiring a new generation, fueling the aspiration for interstellar exploration and the pursuit of extraterrestrial life',
    num_topics: 0,
    num_topics_done: 0,
    done: false,
    topics: [],
  },
]

export const mock_learn_something: LearnSomething = {
  seed: 'Physics',
  lesson:
    'Artificial intelligence is increasingly permeating various aspects of life, tion for interstellar exploration and the pursuit of extraterrestrial life',
  num_topics: 3,
  num_topics_done: 2,
  done: false,
  topics: [
    {
      seed: 'First Law',
      lesson:
        'Artificial intelligence ropelled by recent global events, has altered traditional employment paradigms, promoting flexibility and work-life integration. On a grander scale, advancements in space technology are inspiring a new generation, fueling the aspiration',
      num_topics: 1,
      num_topics_done: 1,
      done: true,
      topics: mockTopics,
    },
    {
      seed: 'Second Law',
      lesson: 'F=ma',
      num_topics: 0,
      num_topics_done: 0,
      done: false,
      topics: [],
    },
    {
      seed: 'Third Law',
      lesson:
        'Artificial intelligence is increasingly permeating various aspects of life, revolutionizing sectors like healthcare and finance by providing groundbreaking solutions. This advanced technology is aiding in disease diagnosis, predictive analysis, and risk management. Furthermore, the concept of remote work, propelled by recent global events, has altered traditional employment paradigms, promoting flexibility and work-life integration. On a grander scale, advancements in space technology are inspiring a new generation, fueling the aspiration for interstellar exploration and the pursuit of extraterrestrial life',
      num_topics: 0,
      num_topics_done: 0,
      done: false,
      topics: mockTopics,
    },
  ],
}

export const mockHabits: Habit[] = [
  {
    title: 'Daily Exercise',
    milestones: [
      { title: 'Bench Reps @ 155', done: false },
      { title: '2-Mile Split < 8 min', done: false },
    ],
  },
  {
    title: 'Daily Meditation',
    milestones: [],
  },
]
