import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './LearnSomething.css'
import Loader from './components/Loader'
import { mock_learn_something } from './lib/mock_data'
import {
  deleteRootLearnSomething,
  getLearnSomethings,
  learnSomethingNew,
} from './api'
import { URLS } from './lib/constants'

export default function LearnSomethingComponent({ email }: { email: string }) {
  const [isLearnSomethingNewOpen, setIsLearnSomethingNewOpen] = useState(false)
  const [newTopic, setNewTopic] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [learnSomethingArray, setLearnSomethingArray] = useState([
    mock_learn_something,
  ])
  const history = useNavigate()

  useEffect(() => {
    async function fetchLearnSomethings() {
      const learnSomethings = await getLearnSomethings(email)
      setLearnSomethingArray(learnSomethings)
    }

    fetchLearnSomethings()
  }, [])

  useEffect(() => {
    console.log(learnSomethingArray)
  }, [learnSomethingArray])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTopic(e.target.value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsLoading(true)
    const response = await learnSomethingNew(newTopic, email)
    console.log('Response Received', response)
    const all = await getLearnSomethings(email)
    setLearnSomethingArray(all)
    setIsLoading(false)
    setIsLearnSomethingNewOpen(false)
  }

  async function handleDelete(rootId: string) {
    await deleteRootLearnSomething(rootId)
    const all = await getLearnSomethings(email)
    setLearnSomethingArray(all)
    console.log(`deleted: ${rootId}`)
  }
  return (
    <div className="learn-something">
      <h1 className="learn-something-header">Your Subjects To Learn</h1>
      {learnSomethingArray ? (
        learnSomethingArray.map((learn_something) => {
          return (
            <div key={learn_something._id} className="learn-something-li">
              <div
                className="open-button"
                onClick={() => {
                  history(`${URLS.LEARN}/${learn_something._id}`)
                }}
              >
                <p>{learn_something.seed}</p>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation() // This prevents the event from bubbling up to the parent
                    handleDelete(learn_something._id || '')
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })
      ) : (
        <h3 style={{ color: '#454545' }}>
          You don't have any subjects yet. Click "Learn Something New".
        </h3>
      )}
      <button
        className="learn-something-new"
        onClick={() => setIsLearnSomethingNewOpen(!isLearnSomethingNewOpen)}
      >
        Learn Something New
      </button>
      <div className={`learn-drawer ${isLearnSomethingNewOpen ? 'open' : ''}`}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            <p>What Do You Want To Learn?</p>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="new_topic"
              placeholder='Enter Topic (eg: "Buddhism" or "How to win Blackjack")'
              value={newTopic || ''}
            />
          </label>
          {isLoading ? (
            <Loader message={'Getting Feedback...'} />
          ) : (
            <button className="learn-drawer-button" type="submit">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
