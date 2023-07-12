import axios from 'axios'
import {
  Categories,
  Goal,
  LearnSomething,
  PracticeFilter,
  Question,
  SWOTObj,
  SWOTType,
  WhoAmI,
} from './models'

const host = 'http://localhost:3028'

const URLS = {
  post_post: `/post-post`,
  pick_practice: '/pick-practice',
  learn_something: '/learn-something',
  child_learn_something: '/child-ls',
  who_am_i: '/who-am-i',
  who_am_i_fetch: '/who-am-i/fetch',
  user_sumamry: '/user-summary',
  user_summary_poem: '/user-summary/poem',
  swot_analysis: '/swot/analysis',
  swot_fetch: '/swot/fetch',
  goal_tip_generate: '/goal-tip/generate',
  goal_tip_fetch: '/goal-tip/fetch',
  goal: '/goal',
  fetch_goals: '/goal/fetch',
}

export async function postPost(form: Categories) {
  return await makePost(URLS.post_post, form)
}

export async function pickPractice(practice_filter: PracticeFilter) {
  return await makePost(URLS.pick_practice, practice_filter)
}

export async function learnSomethingNew(seed: string): Promise<LearnSomething> {
  const response = await makePost(URLS.learn_something, { seed })
  return response.data as LearnSomething
}

export async function getLearnSomethings(): Promise<LearnSomething[]> {
  const response = await getRequest(`${host}${URLS.learn_something}`)
  return response.data as LearnSomething[]
}

export async function generateChildLearnSOmething(
  seed: string,
  id: string
): Promise<boolean> {
  return (await makePost(URLS.child_learn_something, { seed, id })) as boolean
}

export async function deleteRootLearnSomething(id: string): Promise<boolean> {
  return await deleteRequest(URLS.learn_something, { id })
}

export async function submitWhoAmI(who_am_i: WhoAmI) {
  const response = await makePost(URLS.who_am_i, who_am_i)
  return response.data
}

export async function getWhoAmI(email: string) {
  const response = await makePost(URLS.who_am_i_fetch, { email })
  return response.data
}

export async function getUserSummary(email: string) {
  const response = await makePost(URLS.user_sumamry, { email })
  return response.data
}

export async function getUserSummaryPoem(email: string) {
  try {
    const response = await makePost(URLS.user_summary_poem, { email })
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export async function performSWOTAnalysis(
  type: SWOTType,
  questions: Question[]
): Promise<boolean> {
  const response = await makePost(URLS.swot_analysis, { type, questions })
  if (response.data && response.data[type]) {
    if (response.data[type] === 'Updated successfully') {
      return true
    }
  }
  return false
}

export async function getSWOTAnalysisAndQuestions(email: string) {
  const response = await makePost(URLS.swot_fetch, { email })
  return response.data as {
    analysis: SWOTObj<string>
    inputs: SWOTObj<Question[]>
  }
}

export async function generateGoalTip(email: string) {
  const response = await makePost(URLS.goal_tip_generate, { email })
  return response.data as {
    goal_tip: string
    id: string
  }
}

export async function getGoalTip(email: string) {
  const response = await makePost(URLS.goal_tip_fetch, { email })
  return response?.data?.tip || ('' as string)
}

export async function addNewGoal(goals: Question[]) {
  const goal_name = goals[0].value
  const response = await makePost(URLS.goal, { goal: { title: goal_name } })
  return response?.data
}

export async function getGoals(email: string) {
  const response = await makePost(URLS.fetch_goals, { email })
  return response?.data as Goal[]
}

export async function deleteGoal(id: string) {
  return await deleteRequest(URLS.goal, { id })
}

async function deleteRequest(url: string, body: any) {
  console.log(`Making request: ${JSON.stringify(body)}`)
  return await axios
    .delete(`${host}${url}`, { data: body })
    .then(function (response) {
      console.log(response)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      return error
    })
}

async function makePost(url: string, post_body: any) {
  console.log(`Making request: ${JSON.stringify(post_body)}`)
  return await axios
    .post(`${host}${url}`, post_body)
    .then(function (response) {
      console.log(response)
      return response
    })
    .catch(function (error) {
      console.log(error)
      return error
    })
}

async function getRequest(url: string) {
  return await axios
    .get(url)
    .then(function (response) {
      console.log(response)
      return response
    })
    .catch(function (error) {
      console.log(error)
      return error
    })
}
