import React, { useState, ChangeEvent, FormEvent } from 'react'
import { questions } from './lib/who_am_i_questions'
import './WhoAmI.css'

interface Question {
  question: string
  qid: number
  value: string
}

export const WhoAmI: React.FC = () => {
  const [formData, setFormData] = useState<Question[]>(questions)
  const [hasChanges, setHasChanges] = useState(false)

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    // Perform further actions with the form data, such as saving it to a database
    setHasChanges(false)
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
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
