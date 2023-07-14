import axios from 'axios'
import {
  Habit,
  LearnSomething,
  Question,
  SWOTObj,
  SWOTType,
  WhoAmI,
} from './models'

const host = 'http://localhost:3028'

const URLS = {
  learn_something: '/learn-something',
  child_learn_something: '/child-ls',
  who_am_i: '/who-am-i',
  who_am_i_fetch: '/who-am-i/fetch',
  user_sumamry: '/user-summary',
  user_summary_poem: '/user-summary/poem',
  swot_analysis: '/swot/analysis',
  swot_fetch: '/swot/fetch',
  habit_tip_generate: '/habit-tip/generate',
  habit_tip_fetch: '/habit-tip/fetch',
  habit: '/habit',
  fetch_habits: '/habit/fetch',
  journal: '/journal',
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

export async function generateHabitTip(email: string) {
  const response = await makePost(URLS.habit_tip_generate, { email })
  return response.data as {
    habit_tip: string
    id: string
  }
}

export async function getHabitTip(email: string) {
  const response = await makePost(URLS.habit_tip_fetch, { email })
  return response?.data?.tip || ('' as string)
}

export async function addNewHabit(habits: Question[]) {
  const habit_name = habits[0].value
  const response = await makePost(URLS.habit, { habit: { title: habit_name } })
  return response?.data
}

export async function getHabits(email: string) {
  const response = await makePost(URLS.fetch_habits, { email })
  return response?.data as Habit[]
}

export async function deleteHabit(id: string) {
  return await deleteRequest(URLS.habit, { id })
}

export async function submitJournalEntry(entry: string, email: string) {
  const response = await makePost(URLS.journal, { entry, email })
  return response.data as string
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
