import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'

import './HabitMgr.css'
import { addNewHabit, generateHabitTip, getHabitTip, getHabits } from './api'
import { LoaderButton } from './components/Loader'

import { mockHabits } from './lib/mock_data'
import { URLS } from './lib/constants'
import { Habit, HabitHeaderWithSubtext } from './components/Habit'
import { QandAForm } from './components/QandAForm'
import { questions } from './lib/new-habit-questions'
import { Habit as HabitModel } from './models'

export function HabitMgr({ email }: { email: string }) {
  useEffect(() => {
    async function loadPage() {
      const tip = await getHabitTip(email)
      setHabitTip({ habit_tip: tip })

      const habits = await getHabits(email)
      setHabits(habits)
    }
    loadPage()
  }, [])

  const [habit_tip, setHabitTip] = useState<{
    habit_tip?: string
    id?: string
  }>({})
  const [habits, setHabits] = useState<HabitModel[] | undefined>(mockHabits)
  const [isLoadingNewHabitTip, setIsLoadingNewHabitTip] = useState(false)
  const [isLoadingHabits, setIsLoadingHabits] = useState(false)
  const [openHabitTip, setOpenHabitTip] = useState('')
  const [openHabit, setOpenHabit] = useState('')
  const [isAddNewHabitFormOpen, setIsAddNewHabitFormOpen] = useState(false)
  const [newHabitForm, setNewHabitForm] = useState(questions)
  const [hasChanges, setHasChanges] = useState(false)

  async function handleGenerateHabitTip() {
    setIsLoadingNewHabitTip(true)
    const habit_tip_obj = await generateHabitTip(email)
    setHabitTip(habit_tip_obj)
    setIsLoadingNewHabitTip(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, qid: number) => {
    const { value } = e.target
    setNewHabitForm((prevData) => {
      const updatedData = [...prevData]
      const questionIndex = updatedData.findIndex((item) => item.qid === qid)
      updatedData[questionIndex] = { ...updatedData[questionIndex], value }
      return updatedData
    })
    setHasChanges(true)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(newHabitForm)
    setIsLoadingHabits(true)
    await addNewHabit(newHabitForm)
    const all_habits = await getHabits(email)
    setHabits(all_habits)
    setIsLoadingHabits(false)
    setIsAddNewHabitFormOpen(false)
    setHasChanges(false)
  }

  function handleOpenHabit(habit: string, isTip: boolean): void {
    if (isTip) {
      setOpenHabitTip(openHabitTip === habit ? '' : habit)
    } else {
      setOpenHabit(openHabit === habit ? '' : habit)
    }
  }
  function separateByCarrot(habits: string | undefined) {
    return habits ? (
      habits.split('^').map((habit) => {
        return (
          habit !== '' && (
            <Habit
              habit={habit}
              handleOpenHabit={(habit, isTip) => handleOpenHabit(habit, isTip)}
              openHabit={openHabitTip}
              isTip={true}
              setHabits={(habits) => setHabits(habits)}
              email={email}
            />
          )
        )
      })
    ) : (
      <></>
    )
  }

  return (
    <div className="habit-mgr">
      <h1 style={{ textAlign: 'center' }}>Habit Manager</h1>
      <p style={{ fontStyle: 'italic', marginTop: '0', textAlign: 'center' }}>
        <a href={URLS.JOURNAL}>Log an entry in your Journal </a>to track habits.
      </p>
      <div className="habit-mgr-body">
        <div className="habit-suggestions">
          <HabitHeaderWithSubtext
            header="GPT Suggested Habits"
            subtext="SWOT Analysis & User Summary Inform Habit Suggestions"
          />
          {habit_tip &&
            habit_tip.habit_tip &&
            separateByCarrot(habit_tip.habit_tip)}
          <LoaderButton
            isLoading={isLoadingNewHabitTip}
            handleSubmit={() => handleGenerateHabitTip()}
            buttonText="Generate Suggestions"
            message="Generating suggestions..."
          />
        </div>
        <div className="my-habits">
          <HabitHeaderWithSubtext
            header="My Daily Habits"
            subtext="Set Habits By Clicking on GPT Suggestions or Manually Inputting"
          />
          {habits &&
            habits[0] &&
            habits.map((habit) => {
              return (
                <Habit
                  habit={habit.title}
                  handleOpenHabit={(habit, isTip) =>
                    handleOpenHabit(habit, isTip)
                  }
                  openHabit={openHabit}
                  isTip={false}
                  id={habit._id}
                  setHabits={(habits) => setHabits(habits)}
                  email={email}
                />
              )
            })}
          <QandAForm
            questions={newHabitForm}
            handleChange={(e, qid) => handleChange(e, qid)}
            hasChanges={hasChanges}
            handleSubmit={(e) => handleSubmit(e)}
            title="New Habit"
            visible={isAddNewHabitFormOpen}
          />
          <LoaderButton
            isLoading={isLoadingHabits}
            handleSubmit={() =>
              setIsAddNewHabitFormOpen(!isAddNewHabitFormOpen)
            }
            buttonText={isAddNewHabitFormOpen ? 'Done' : 'Add New Habits'}
            message="Loading habits..."
          />
        </div>
      </div>
    </div>
  )
}
