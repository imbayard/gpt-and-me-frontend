import React, { useEffect, useState } from 'react'
import { getUserSummaryPoem } from './api'
import { BigText } from './components/BigText'

import './DailyPoem.css'
import Loader from './components/Loader'

export function DailyPoem() {
  const [poem, setPoem] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
      <BigText header="A Daily Poem" body={poem.toLocaleLowerCase()} />
    </div>
  )
}
