import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { QandAForm } from './components/QandAForm'
import questions from './lib/swot-questions'
import { Question, SWOTObj, SWOTType } from './models'
import Loader from './components/Loader'
import { getSWOTAnalysisAndQuestions, performSWOTAnalysis } from './api'

import './SWOT.css'
import { BigText } from './components/BigText'

export function SWOT({
  email,
  isFirstTime,
  setHasDoneSWOT,
}: {
  email: string
  isFirstTime?: boolean
  setHasDoneSWOT?: (value: React.SetStateAction<boolean>) => void
}) {
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

  const swotTypes: SWOTType[] = [
    'strengths',
    'weaknesses',
    'opportunities',
    'threats',
  ]
  useEffect(() => {
    async function loadPage() {
      const { analysis, inputs } = await getSWOTAnalysisAndQuestions(email)

      if (!inputs) {
        return
      }

      const newResponses: SWOTObj<string> = {}
      const newAnswers: SWOTObj<Question[]> = {
        strengths: [],
        opportunities: [],
        threats: [],
        weaknesses: [],
      }
      let isQAOpen_new: SWOTObj<boolean> = {
        strengths: true,
        opportunities: true,
        threats: true,
        weaknesses: true,
      }
      Object.keys(analysis).forEach((key) => {
        const realkey = key as keyof SWOTObj<string>
        if (analysis[realkey] && key !== 'email') {
          newResponses[realkey] = analysis[realkey]
          isQAOpen_new = { ...isQAOpen_new, [realkey]: false }
        }
      })
      setIsQAOpen(isQAOpen_new)
      swotTypes.forEach((key) => {
        if (inputs[key]?.[0]) {
          newAnswers[key] = inputs[key]
        } else {
          newAnswers[key] = questions[key]
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
    const index =
      questions[type]?.findIndex((q: Question) => {
        return q.qid === qid
      }) || 0

    if (index !== -1) {
      // Make a copy of the questions array for the specific type
      const updatedQuestions = [...(answers[type] || [])]

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
      const { analysis, inputs } = await getSWOTAnalysisAndQuestions(email)
      setAnswers({ ...answers, [type]: inputs[type] })
      setResponses(analysis)
    }

    // After submission, reset the hasChanges state for the specific type
    setHasChanges({ ...hasChanges, [type]: false })
    setIsLoading({ ...isLoading, [type]: false })
    if (
      isFirstTime &&
      setHasDoneSWOT &&
      responses.opportunities &&
      responses.strengths &&
      responses.weaknesses &&
      responses.threats
    ) {
      setHasDoneSWOT(true)
    }
  }

  return (
    <>
      {isFirstTime && setHasDoneSWOT && (
        <>
          <BigText header="SWOT Analysis" body="Just a few more questions :)" />
          <div
            style={{
              cursor: 'pointer',
              border: '1px solid black',
              width: '20vw',
              margin: 'auto',
              textAlign: 'center',
            }}
            onClick={() => setHasDoneSWOT(true)}
          >
            Skip for now
          </div>
        </>
      )}
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
                  <BigText
                    header={type.charAt(0).toUpperCase() + type.slice(1)}
                    body={responses[type] || ''}
                  />
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
                isLoading={isLoading[type] || false}
              />
              {isLoading[type] ? (
                <Loader message="Loading response..." />
              ) : (
                <></>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
