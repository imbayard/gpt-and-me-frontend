import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'

import './GoalMgr.css'
import { addNewGoal, generateGoalTip, getGoalTip, getGoals } from './api'
import Loader, { LoaderButton } from './components/Loader'

import { mockGoals } from './lib/mock_data'
import { URLS } from './lib/constants'
import { Goal, GoalHeaderWithSubtext } from './components/Goal'
import { QandAForm } from './components/QandAForm'
import { questions } from './lib/new-goal-questions'
import { Goal as GoalModel } from './models'

export function GoalMgr() {
  useEffect(() => {
    async function loadPage() {
      const tip = await getGoalTip('beton@bu.edu')
      setGoalTip({ goal_tip: tip })

      const goals = await getGoals('beton@bu.edu')
      setGoals(goals)
    }
    loadPage()
  }, [])

  const [goal_tip, setGoalTip] = useState<{ goal_tip?: string; id?: string }>(
    {}
  )
  const [goals, setGoals] = useState<GoalModel[] | undefined>(mockGoals)
  const [isLoadingNewGoalTip, setIsLoadingNewGoalTip] = useState(false)
  const [isLoadingGoals, setIsLoadingGoals] = useState(false)
  const [openGoalTip, setOpenGoalTip] = useState('')
  const [openGoal, setOpenGoal] = useState('')
  const [isAddNewGoalFormOpen, setIsAddNewGoalFormOpen] = useState(false)
  const [newGoalForm, setNewGoalForm] = useState(questions)
  const [hasChanges, setHasChanges] = useState(false)

  async function handleGenerateGoalTip() {
    setIsLoadingNewGoalTip(true)
    const goal_tip_obj = await generateGoalTip('beton@bu.edu')
    setGoalTip(goal_tip_obj)
    setIsLoadingNewGoalTip(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, qid: number) => {
    const { value } = e.target
    setNewGoalForm((prevData) => {
      const updatedData = [...prevData]
      const questionIndex = updatedData.findIndex((item) => item.qid === qid)
      updatedData[questionIndex] = { ...updatedData[questionIndex], value }
      return updatedData
    })
    setHasChanges(true)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(newGoalForm)
    setIsLoadingGoals(true)
    const res = await addNewGoal(newGoalForm)
    const all_goals = await getGoals('beton@bu.edu')
    setGoals(all_goals)
    setIsLoadingGoals(false)
    setIsAddNewGoalFormOpen(false)
    setHasChanges(false)
  }

  function handleOpenGoal(goal: string, isTip: boolean): void {
    if (isTip) {
      setOpenGoalTip(openGoalTip === goal ? '' : goal)
    } else {
      setOpenGoal(openGoal === goal ? '' : goal)
    }
  }
  function separateByCarrot(goals: string | undefined) {
    return goals ? (
      goals.split('^').map((goal) => {
        return (
          <Goal
            goal={goal}
            handleOpenGoal={(goal, isTip) => handleOpenGoal(goal, isTip)}
            openGoal={openGoalTip}
            isTip={true}
            setGoals={(goals) => setGoals(goals)}
          />
        )
      })
    ) : (
      <></>
    )
  }

  return (
    <div className="goal-mgr">
      <h1 style={{ textAlign: 'center' }}>Goal Manager</h1>
      <p style={{ fontStyle: 'italic', marginTop: '0', textAlign: 'center' }}>
        <a href={URLS.JOURNAL}>Log an entry in your Journal </a>to track goals.
      </p>
      <div className="goal-mgr-body">
        <div className="goal-suggestions">
          <GoalHeaderWithSubtext
            header="GPT Suggested Goals"
            subtext="SWOT Analysis & User Summary Inform Goal Suggestions"
          />
          {goal_tip && goal_tip.goal_tip && separateByCarrot(goal_tip.goal_tip)}
          <LoaderButton
            isLoading={isLoadingNewGoalTip}
            handleSubmit={() => handleGenerateGoalTip()}
            buttonText="Generate Suggestions"
            message="Generating suggestions..."
          />
        </div>
        <div className="my-goals">
          <GoalHeaderWithSubtext
            header="My Goals"
            subtext="Set Goals By Clicking on GPT Suggestions or Manually Inputting"
          />
          {goals &&
            goals[0] &&
            goals.map((goal) => {
              return (
                <Goal
                  goal={goal.title}
                  handleOpenGoal={(goal, isTip) => handleOpenGoal(goal, isTip)}
                  openGoal={openGoal}
                  isTip={false}
                  id={goal._id}
                  setGoals={(goals) => setGoals(goals)}
                />
              )
            })}
          <QandAForm
            questions={newGoalForm}
            handleChange={(e, qid) => handleChange(e, qid)}
            hasChanges={hasChanges}
            handleSubmit={(e) => handleSubmit(e)}
            title="New Goal"
            visible={isAddNewGoalFormOpen}
          />
          <LoaderButton
            isLoading={isLoadingGoals}
            handleSubmit={() => setIsAddNewGoalFormOpen(!isAddNewGoalFormOpen)}
            buttonText={isAddNewGoalFormOpen ? 'Done' : 'Add New Goals'}
            message="Loading goals..."
          />
        </div>
      </div>
    </div>
  )
}
