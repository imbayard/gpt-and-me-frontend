import React, { useState, useEffect } from 'react'

import './Journal.css'
import { getHabits, submitJournalEntry } from './api'
import { Habit } from './models'
import { JustHabits } from './components/Habit'
import { URLS } from './lib/constants'
import { LoaderButton } from './components/Loader'
import { BigText } from './components/BigText'

export default function Journal() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [journalEntry, setJournalEntry] = useState('')
  const [hasChanged, setHasChanged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | undefined>(undefined)

  useEffect(() => {
    async function loadPage() {
      const fetched_habits = await getHabits('beton@bu.edu')
      setHabits(fetched_habits)
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
      {habits && habits.length > 0 ? (
        <div className="habit-container">
          <h3>
            Your Daily Habits (<a href={URLS.GOALS}>Edit</a>)
          </h3>
          <JustHabits habits={habits} />
        </div>
      ) : (
        <p>
          You don't have any habits.{' '}
          <a href={URLS.GOALS}>Set habits in the Habit Manager</a>
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
