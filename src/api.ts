import axios from 'axios';
import { Categories, LearnSomething, PracticeFilter } from './models';

const host = 'http://localhost:3028'

const URLS = {
  post_post: `/post-post`,
  post_goals: `/post-goals`,
  get_goals: '/goals',
  pick_practice: '/pick-practice',
  learn_something: '/learn-something',
  child_learn_something: '/child-ls',
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

export async function learnSomethingNew(seed: string): Promise<LearnSomething> {
  const response = await makePost(URLS.learn_something, {seed})
  return response.data as LearnSomething
}

export async function getLearnSomethings(): Promise<LearnSomething[]> {
  const response = await getRequest(`${host}${URLS.learn_something}`)
  return response.data as LearnSomething[]
}

export async function generateChildLearnSOmething(seed: string, id: string): Promise<boolean> {
  return await makePost(URLS.child_learn_something, {seed, id}) as boolean
}

export async function deleteRootLearnSomething(id: string): Promise<boolean> {
  return await deleteRequest(URLS.learn_something, {id})
}
 
async function deleteRequest(url: string, body: any) {
  console.log(`Making request: ${JSON.stringify(body)}`)
  return await axios.delete(`${host}${url}`, {data: body})
  .then(function (response) {
    console.log(response);
    return response.data
  })
  .catch(function (error) {
    console.log(error);
    return error
  });
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