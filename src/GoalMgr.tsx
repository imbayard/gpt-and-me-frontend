import React, { useState, useEffect } from 'react'

import './GoalMgr.css'
import { BigText } from './components/BigText'
import { generateGoalTip, getGoalTip } from './api'
import Loader from './components/Loader'

export function GoalMgr() {
  useEffect(() => {
    async function loadPage() {
      const tip = await getGoalTip('beton@bu.edu')
      setGoalTip({ goal_tip: tip })
    }
    loadPage()
  }, [])

  const [goal_tip, setGoalTip] = useState<{ goal_tip?: string; id?: string }>(
    {}
  )
  const [isLoadingNewGoalTip, setIsLoadingNewGoalTip] = useState(false)

  async function handleGenerateGoalTip() {
    setIsLoadingNewGoalTip(true)
    const goal_tip_obj = await generateGoalTip('beton@bu.edu')
    setGoalTip(goal_tip_obj)
    setIsLoadingNewGoalTip(false)
  }

  function separateByCarrot(goals: string | undefined) {
    return goals ? (
      goals.split('^').map((goal) => (
        <div className="goal" key={goal}>
          {goal}
        </div>
      ))
    ) : (
      <></>
    )
  }

  return (
    <div className="goal-mgr">
      <div className="goal-suggestions">
        {goal_tip && goal_tip.goal_tip && separateByCarrot(goal_tip.goal_tip)}
      </div>
      {!isLoadingNewGoalTip ? (
        <button
          onClick={() => handleGenerateGoalTip()}
          className="gen-goal-tip-button"
        >
          Generate Goal Tip
        </button>
      ) : (
        <Loader message="Generating goal tip..." />
      )}
    </div>
  )
}
