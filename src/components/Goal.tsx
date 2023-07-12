import React, { useState } from 'react'
import { LoaderButton } from './Loader'
import { Goal as GoalModel } from '../models'
import { addNewGoal, deleteGoal, getGoals } from '../api'

import './Goal.css'

interface GoalComponentProps {
  goal: string
  handleOpenGoal: (goal: string, isTip: boolean) => void
  openGoal: string
  isTip: boolean
  setGoals: (value: React.SetStateAction<GoalModel[] | undefined>) => void
  id?: string
}

export function Goal({
  goal,
  handleOpenGoal,
  openGoal,
  isTip,
  setGoals,
  id,
}: GoalComponentProps) {
  async function handleMoveGoal(goal: string) {
    await addNewGoal([{ question: '', value: goal, qid: 0 }])
    const goals = await getGoals('beton@bu.edu')
    setGoals(goals)
  }

  async function handleDelete() {
    if (id) {
      setIsDeleting(true)
      await deleteGoal(id)
      const goals = await getGoals('beton@bu.edu')
      setGoals(goals)
      setIsDeleting(false)
    }
  }

  const [isDeleting, setIsDeleting] = useState(false)

  const isOpen = openGoal === goal
  return (
    <div className="goal" key={goal}>
      <div onClick={() => handleOpenGoal(goal, isTip)} className="goal-card">
        {isTip ? goal : <strong>{goal}</strong>}
      </div>
      <div className={`goal-actions ${isOpen ? 'open' : ''}`}>
        {isTip ? (
          <LoaderButton
            message=""
            isLoading={false}
            handleSubmit={() => handleMoveGoal(goal)}
            buttonText="Add To My Goals"
          />
        ) : (
          <LoaderButton
            message="Deleting..."
            isLoading={isDeleting}
            handleSubmit={() => handleDelete()}
            buttonText="Delete"
          />
        )}
      </div>
    </div>
  )
}

export function GoalHeaderWithSubtext({
  header,
  subtext,
}: {
  header: string
  subtext: string
}) {
  return (
    <>
      <h2>{header}</h2>
      <p style={{ fontStyle: 'italic', marginTop: '0' }}>{subtext}</p>
    </>
  )
}

export function JustGoals({ goals }: { goals: GoalModel[] }) {
  return (
    <div className="goals">
      {goals.map((goal) => (
        <div className="just-goal" key={goal._id}>
          {goal.title}
        </div>
      ))}
    </div>
  )
}
