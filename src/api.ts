import axios from 'axios';
import { Categories, PracticeFilter, StudyPlan } from './models';

const host = 'http://localhost:3028'

const URLS = {
  post_post: `/post-post`,
  post_goals: `/post-goals`,
  get_goals: '/goals',
  pick_practice: '/pick-practice',
  sentiment: '/sentiment',
  textbook_chapters: '/textbook-chapters',
  chapter_topics: '/chapter-topics',
  topic_lesson: '/topic-lesson',
  update_study_plan: '/study-plan'
}

export async function postPost(form: Categories) {
  return await makePost(URLS.post_post, form)
}

export async function postGoals(form: Categories) {
  return await makePost(URLS.post_goals, form)
}

export async function getGoals() {
  return await getRequest(`${host}${URLS.get_goals}`)
}

export async function pickPractice(practice_filter: PracticeFilter) {
  return await makePost(URLS.pick_practice, practice_filter)
}

export async function getSentiment(post: Categories, goals: Categories) {
  const toSend = {
    work: {
      goal: goals.work,
      entry: post.work
    },
    workout: {
      goal: goals.workout,
      entry: post.workout
    },
    fun: {
      goal: goals.fun,
      entry: post.fun
    },
    food: {
      goal: goals.food,
      entry: post.food
    },
    finance: {
      goal: goals.finance,
      entry: post.finance
    }
  }
  return await makePost(URLS.sentiment, toSend)
}

export async function getTextbookChapters(goal: string, category: string): Promise<string[]> {
  const response = await makePost(URLS.textbook_chapters, {goal, category})
  return (response.data?.chapters || [])
}

export async function getChapterTopics(goal: string, chapter: string, studyPlan: StudyPlan, category: string): Promise<string[]> {
  const response = await makePost(URLS.chapter_topics, {
    goal,
    chapter,
    studyPlan,
    category
  })
  return (response.data?.topics || [])
}

export async function getTopicLesson(goal: string, chapter: string, studyPlan: StudyPlan, category: string, topic: string) {
  return await makePost(URLS.topic_lesson, {
    goal,
    chapter,
    studyPlan,
    category,
    topic
  })
}

export async function updateStudyPlan(studyPlan: StudyPlan, category: string) {
  return await makePost(URLS.update_study_plan, {studyPlan, category})
}

async function makePost(url: string, post_body: any) {
  console.log(`Making request: ${JSON.stringify(post_body)}`)
  return await axios.post(`${host}${url}`, post_body)
  .then(function (response) {
    console.log(response);
    return response
  })
  .catch(function (error) {
    console.log(error);
    return error
  });
}

async function getRequest(url: string) {
  return await axios.get(url)
  .then(function(response) {
    console.log(response)
    return response
  }).catch(function (error) {
    console.log(error);
    return error
  });
}