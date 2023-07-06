import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { QandAForm } from './components/QandAForm'
import questions from './lib/swot-questions'
import {
  Question,
  SWOTQuestions,
  SWOTType,
  SWOTTypeBoolean,
  SWOTTypeString,
} from './models'
import Loader from './components/Loader'
import { getSWOTResponse } from './api'

import './SWOT.css'

export function SWOT() {
  const [answers, setAnswers] = useState<SWOTQuestions>(questions)
  const [hasChanges, setHasChanges] = useState<SWOTTypeBoolean>({})
  const [isLoading, setIsLoading] = useState<SWOTTypeBoolean>({})
  const [responses, setResponses] = useState<SWOTTypeString>({})

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    qid: number,
    type: SWOTType
  ) => {
    // Clone current answers and the array within it
    const updatedAnswers = { ...answers, [type]: [...answers[type]] }
    // Find the index of the question changed
    const index = updatedAnswers[type].findIndex((q) => {
      return q.qid === qid
    })
    if (index !== -1) {
      // Update the answer's value
      updatedAnswers[type][index] = {
        ...updatedAnswers[type][index],
        value: e.target.value,
      }

      // Update the state
      setAnswers(updatedAnswers)

      // Indicate that there are changes for the specific type
      setHasChanges({ ...hasChanges, [type]: true })
    }
  }

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    type: SWOTType
  ) => {
    e.preventDefault() // Prevent default form submission
    console.log('Submitting answers for', type, answers[type])
    setIsLoading({ ...isLoading, [type]: true })

    // Make API Call
    const response = await getSWOTResponse(type, answers[type])
    setResponses(response)

    // After submission, reset the hasChanges state for the specific type
    setHasChanges({ ...hasChanges, [type]: false })
    setIsLoading({ ...isLoading, [type]: false })
  }

  const swotTypes: SWOTType[] = [
    'strengths',
    'weaknesses',
    'opportunities',
    'threats',
  ]

  return (
    <div className="SWOT">
      {swotTypes.map((type) => (
        <>
          <QandAForm
            key={type}
            questions={answers[type]}
            title={type.charAt(0).toUpperCase() + type.slice(1)}
            handleChange={(e, qid) => handleChange(e, qid, type)}
            handleSubmit={(e) => handleSubmit(e, type)}
            hasChanges={hasChanges[type] || false}
          />
          {isLoading[type] ? <Loader message="Loading response..." /> : <></>}
        </>
      ))}
    </div>
  )
}
