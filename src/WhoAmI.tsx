import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { questions } from './lib/who_am_i_questions'
import './WhoAmI.css'
import { Question } from './models'
import { getUserSummary, getWhoAmI, submitWhoAmI } from './api'
import { BigText } from './components/BigText'
import { QandAForm } from './components/QandAForm'
import { useNavigate } from 'react-router-dom'

export const WhoAmI: React.FC<{
  email: string
  isFirstTime?: boolean
  setHasDoneUserSummary?: (value: React.SetStateAction<boolean>) => void
}> = ({ email, isFirstTime, setHasDoneUserSummary }) => {
  const [formData, setFormData] = useState<Question[]>(questions)
  const [hasChanges, setHasChanges] = useState(false)
  const [questionsOpen, setQuestionsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

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
        const userSummaryFetched = await getUserSummary(email)
        setUserSummary(userSummaryFetched)
        const whoAmI = await getWhoAmI(email)
        if (whoAmI && whoAmI.questions) setFormData(whoAmI.questions)
      } catch (err) {
        console.log('An error occurred...', err)
      }
    }
    loadPage()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    console.log(formData)
    // Perform further actions with the form data, such as saving it to a database
    const userSummaryFetched = await submitWhoAmI({
      questions: formData,
      isComplete: false,
      email: email,
    })
    setUserSummary(userSummaryFetched)
    if (isFirstTime && setHasDoneUserSummary) {
      setHasDoneUserSummary(true)
    }
    setHasChanges(false)
    setIsLoading(false)
  }

  return (
    <div className="form-container">
      {isFirstTime && (
        <BigText
          header="User Summary"
          body="Welcome! Please complete the questionnaire to get started."
        />
      )}
      {userSummary && (
        <div onClick={() => setQuestionsOpen(!questionsOpen)}>
          <BigText header="User Summary" body={userSummary} />
        </div>
      )}
      <QandAForm
        questions={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        title={'Questionnaire'}
        hasChanges={hasChanges}
        visible={isFirstTime || questionsOpen}
        isLoading={isLoading}
      />
    </div>
  )
}
