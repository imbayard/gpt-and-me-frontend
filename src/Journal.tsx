import React, { useState, useEffect } from 'react'

import './Journal.css'
import { getGoals, submitJournalEntry } from './api'
import { Goal } from './models'
import { JustGoals } from './components/Goal'
import { URLS } from './lib/constants'
import { LoaderButton } from './components/Loader'
import { BigText } from './components/BigText'

export default function Journal() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [journalEntry, setJournalEntry] = useState('')
  const [hasChanged, setHasChanged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | undefined>(undefined)

  useEffect(() => {
    async function loadPage() {
      const fetched_goals = await getGoals('beton@bu.edu')
      setGoals(fetched_goals)
    }
    loadPage()
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setHasChanged(true)
    setJournalEntry(e.target.value)
  }

  async function handleSubmit() {
    setIsLoading(true)
    const response = await submitJournalEntry(journalEntry, 'beton@bu.edu')
    setFeedback(response)
    setIsLoading(false)
    setHasChanged(false)
  }

  return (
    <div className="journal-container">
      {goals.length > 0 ? (
        <div className="goal-container">
          <h3>
            Your Daily Goals (<a href={URLS.GOALS}>Edit</a>)
          </h3>
          <JustGoals goals={goals} />
        </div>
      ) : (
        <p>
          You don't have any goals.{' '}
          <a href={URLS.GOALS}>Set goals in the Goal Manager</a>
        </p>
      )}
      <div className="input-wrapper">
        <label htmlFor="textarea-entry">Day Summary</label>
        <textarea
          id="textarea-entry"
          rows={5}
          cols={100}
          placeholder="How'd your day go? Think about: work, workouts, fun, food, finance, etc."
          value={journalEntry}
          onChange={(e) => handleChange(e)}
        ></textarea>
        {hasChanged && (
          <LoaderButton
            message="Getting Feedback..."
            buttonText="Submit Journal Entry"
            isLoading={isLoading}
            handleSubmit={() => handleSubmit()}
          />
        )}
        {feedback && <BigText header="Feedback" body={feedback} />}
      </div>
    </div>
  )
}
