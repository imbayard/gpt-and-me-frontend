import React from 'react'
import { Categories } from './models';

import './GoalsHUD.css'

export function GoalsHUD({goals, openModal}: {goals: Categories, openModal: (component: any) => void}) {
    const allGoalsEmpty = !Object.values(goals).some(goal => goal.trim() !== '');

    return (
        <div className="goals-display">
          <div className="goals-display-header">
            <h2>Your Goals</h2>
            <button onClick={() => openModal('goals')}>Edit</button>
          </div>
            {allGoalsEmpty ? (
              <p>Add goals from the "Update Goals" tile</p>
            ) : (
              <>
                <p><strong>Work: </strong>{goals.work}</p>
                <p><strong>Workout: </strong>{goals.workout}</p>
                <p><strong>Fun: </strong>{goals.fun}</p>
                <p><strong>Food: </strong>{goals.food}</p>
                <p><strong>Finance: </strong>{goals.finance}</p>
              </>
          )}
        </div>
    )
}