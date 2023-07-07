import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { QandAForm } from './components/QandAForm'
import questions from './lib/swot-questions'
import { Question, SWOTObj, SWOTType } from './models'
import Loader from './components/Loader'
import { getSWOTAnalysisAndQuestions, performSWOTAnalysis } from './api'

import './SWOT.css'
import { BigText } from './components/BigText'

export function SWOT() {
  const [answers, setAnswers] = useState<SWOTObj<Question[]>>(questions)
  const [hasChanges, setHasChanges] = useState<SWOTObj<boolean>>({})
  const [isLoading, setIsLoading] = useState<SWOTObj<boolean>>({})
  const [responses, setResponses] = useState<SWOTObj<string>>({})
  const [isQAOpen, setIsQAOpen] = useState<SWOTObj<boolean>>({
    opportunities: true,
    weaknesses: true,
    strengths: true,
    threats: true,
  })

  useEffect(() => {
    async function loadPage() {
      const { analysis, inputs } = await getSWOTAnalysisAndQuestions(
        'beton@bu.edu'
      )

      const newResponses: SWOTObj<string> = {}
      const newAnswers: SWOTObj<Question[]> = {}
      Object.keys(analysis).forEach((key) => {
        const realkey = key as keyof SWOTObj<string>
        if (analysis[realkey] && key !== 'email') {
          newResponses[realkey] = analysis[realkey]
          setIsQAOpen({ ...isQAOpen, [realkey]: false })
        }
      })
      Object.keys(inputs).forEach((key) => {
        const realkey = key as keyof SWOTObj<Question[]>
        if (key !== 'email') {
          if (inputs[realkey]?.[0]) {
            newAnswers[realkey] = inputs[realkey]
          } else {
            newAnswers[realkey] = questions[realkey]
          }
        }
      })
      setAnswers(newAnswers as SWOTObj<Question[]>)
      setResponses(newResponses as SWOTObj<string>)
    }
    loadPage()
  }, [])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    qid: number,
    type: SWOTType
  ) => {
    // Find the index of the question changed
    const index = answers[type].findIndex((q: Question) => {
      return q.qid === qid
    })

    if (index !== -1) {
      // Make a copy of the questions array for the specific type
      const updatedQuestions = [...answers[type]]

      // Update the answer's value in the copied array
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        value: e.target.value,
      }

      // Update the state with the modified array
      setAnswers({ ...answers, [type]: updatedQuestions })

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
    const response = await performSWOTAnalysis(type, answers[type] || [])
    if (response) {
      // Refresh the responses and answers
      const { analysis, inputs } = await getSWOTAnalysisAndQuestions(
        'beton@bu.edu'
      )
      setAnswers({ ...answers, [type]: inputs[type] })
      setResponses(analysis)
    }

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
      {swotTypes.map((type) => {
        return (
          <div className="SorWorOorT-lol">
            <div
              className="big-text-wrapper"
              onClick={() => {
                console.log(isQAOpen[type])
                setIsQAOpen({ ...isQAOpen, [type]: !isQAOpen[type] })
              }}
            >
              {responses[type] && (
                <BigText header="" body={responses[type] || ''} />
              )}
            </div>
            <QandAForm
              key={type}
              questions={answers[type] || questions[type]}
              title={type.charAt(0).toUpperCase() + type.slice(1)}
              handleChange={(e, qid) => handleChange(e, qid, type)}
              handleSubmit={(e) => handleSubmit(e, type)}
              hasChanges={hasChanges[type] || false}
              visible={isQAOpen[type] || false}
            />
            {isLoading[type] ? <Loader message="Loading response..." /> : <></>}
          </div>
        )
      })}
    </div>
  )
}
