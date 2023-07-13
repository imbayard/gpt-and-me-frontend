import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Question } from '../models'

import './QandAForm.css'

interface QandAFormProps {
  questions: Question[] | undefined
  handleChange: (e: ChangeEvent<HTMLInputElement>, qid: number) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  hasChanges: boolean
  title: string
  visible: boolean
}

export const QandAForm: React.FC<QandAFormProps> = ({
  questions,
  handleChange,
  handleSubmit,
  hasChanges,
  title,
  visible,
}) => {
  const [formData, setFormData] = useState<Question[]>(questions || [])

  useEffect(() => {
    setFormData(questions || [])
  }, [questions])

  return questions ? (
    <form
      onSubmit={handleSubmit}
      className={`qa-form ${visible ? 'open' : ''}`}
    >
      <h3>{title}</h3>
      {questions.length > 10 && hasChanges && (
        <button type="submit">Save Changes</button>
      )}
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
  ) : (
    <></>
  )
}
