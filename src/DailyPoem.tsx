import React, { useEffect, useState } from 'react'
import { getUserSummaryPoem } from './api'
import { BigText } from './components/BigText'

import './DailyPoem.css'
import Loader from './components/Loader'

export function DailyPoem() {
  const [poem, setPoem] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const date = new Date()
  const readable = `${date.getMonth().toString()}-${date
    .getDate()
    .toString()}-${date.getFullYear().toString()}`

  useEffect(() => {
    async function fetchPoem() {
      setIsLoading(true)
      const poem = await getUserSummaryPoem('beton@bu.edu')
      setPoem(poem || 'No poem...')
      setIsLoading(false)
    }
    fetchPoem()
  }, [])
  return isLoading ? (
    <Loader message="Loading poem..." />
  ) : (
    <div className="daily-poem">
      <BigText header={readable} body={poem.toLocaleLowerCase()} />
    </div>
  )
}
