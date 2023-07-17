import React, { useState } from 'react'
import { LoaderButton } from './Loader'
import { Habit as HabitModel } from '../models'
import { addNewHabit, deleteHabit, getHabits } from '../api'

import './Habit.css'

interface HabitComponentProps {
  habit: string
  handleOpenHabit: (habit: string, isTip: boolean) => void
  openHabit: string
  isTip: boolean
  setHabits: (value: React.SetStateAction<HabitModel[] | undefined>) => void
  email: string
  id?: string
}

export function Habit({
  habit,
  handleOpenHabit,
  openHabit,
  isTip,
  setHabits,
  email,
  id,
}: HabitComponentProps) {
  async function handleMoveHabit(habit: string) {
    await addNewHabit([{ question: '', value: habit, qid: 0 }])
    const habits = await getHabits(email)
    setHabits(habits)
  }

  async function handleDelete() {
    if (id) {
      setIsDeleting(true)
      await deleteHabit(id)
      const habits = await getHabits(email)
      setHabits(habits)
      setIsDeleting(false)
    }
  }

  const [isDeleting, setIsDeleting] = useState(false)

  const isOpen = openHabit === habit
  return (
    <div className="habit" key={habit}>
      <div onClick={() => handleOpenHabit(habit, isTip)} className="habit-card">
        {isTip ? habit : <strong>{habit}</strong>}
      </div>
      <div className={`habit-actions ${isOpen ? 'open' : ''}`}>
        {isTip ? (
          <LoaderButton
            message=""
            isLoading={false}
            handleSubmit={() => handleMoveHabit(habit)}
            buttonText="Add To My Habits"
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

export function HabitHeaderWithSubtext({
  header,
  subtext,
}: {
  header: string
  subtext: string
}) {
  return (
    <>
      <h2 className="habit-header">{header}</h2>
      <p
        className="habit-subtext"
        style={{ fontStyle: 'italic', marginTop: '0' }}
      >
        {subtext}
      </p>
    </>
  )
}

export function JustHabits({ habits }: { habits: HabitModel[] }) {
  return (
    <div className="habits">
      {habits.map((habit) => (
        <div className="just-habit" key={habit._id}>
          {habit.title}
        </div>
      ))}
    </div>
  )
}
