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

  return (
    <div className="goal-mgr">
      {goal_tip && goal_tip.goal_tip && (
        <BigText header="Goal Tip" body={goal_tip.goal_tip} />
      )}
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
