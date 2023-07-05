import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { questions } from './lib/who_am_i_questions'
import './WhoAmI.css'
import { Question } from './models'
import { getUserSummary, getWhoAmI, submitWhoAmI } from './api'

export const WhoAmI: React.FC = () => {
  const [formData, setFormData] = useState<Question[]>(questions)
  const [hasChanges, setHasChanges] = useState(false)

  const [userSummary, setUserSummary] = useState(undefined)

  const handleChange = (e: ChangeEvent<HTMLInputElement>, qid: number) => {
    const { value } = e.target
    setFormData((prevData) => {
      const updatedData = [...prevData]
      const questionIndex = updatedData.findIndex((item) => item.qid === qid)
      updatedData[questionIndex] = { ...updatedData[questionIndex], value }
      return updatedData
    })
    setHasChanges(true)
  }

  const wrapWordsWithSpans = (text: string) => {
    return text.split('.').map((word, index) => (
      <span key={index} className="user-summary-word">
        {word + '.'}
      </span>
    ))
  }

  useEffect(() => {
    async function loadPage() {
      try {
        const userSummaryFetched = await getUserSummary('beton@bu.edu')
        setUserSummary(userSummaryFetched)
        const whoAmI = await getWhoAmI('beton@bu.edu')
        if (whoAmI && whoAmI.questions) setFormData(whoAmI.questions)
      } catch (err) {
        console.log('An error occurred...', err)
      }
    }
    loadPage()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    // Perform further actions with the form data, such as saving it to a database
    const userSummaryFetched = await submitWhoAmI({
      questions: formData,
      isComplete: false,
      email: 'beton@bu.edu',
    })
    setUserSummary(userSummaryFetched)
    setHasChanges(false)
  }

  return (
    <div className="form-container">
      {userSummary && (
        <div className="user-summary">
          <h3>Your Summary</h3>
          {wrapWordsWithSpans(userSummary)}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h3>Your Questionnaire</h3>
        {hasChanges && <button type="submit">Save Changes</button>}
        {questions.map((questionObj: Question, index: number) => (
          <div key={index}>
            <label htmlFor={`question-${index}`}>{questionObj.question}</label>
            <input
              type="text"
              id={`question-${index}`}
              value={formData.find((item) => item.qid === index)?.value || ''}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
        {hasChanges && <button type="submit">Save Changes</button>}
      </form>
    </div>
  )
}
