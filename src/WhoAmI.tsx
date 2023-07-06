import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { questions } from './lib/who_am_i_questions'
import './WhoAmI.css'
import { Question } from './models'
import { getUserSummary, getWhoAmI, submitWhoAmI } from './api'
import { BigText } from './components/BigText'
import { QandAForm } from './components/QandAForm'

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
      {userSummary && <BigText header="User Summary" body={userSummary} />}
      <QandAForm
        questions={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        title={'Questionnaire'}
        hasChanges={hasChanges}
      />
    </div>
  )
}
