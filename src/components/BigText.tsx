import React from 'react'

import './BigText.css'

interface BigTextProps {
  header: string
  body: string
}

const wrapWordsWithSpans = (text: string) => {
  const split = text.split('.')
  const length = split.length
  return split.map((word, index) => (
    <span key={index} className="big-text-word">
      {index === length - 1 ? word : word + '.'}
    </span>
  ))
}

export function BigText({ header, body }: BigTextProps) {
  return (
    <div className="big-text">
      <h3>{header}</h3>
      <div>{wrapWordsWithSpans(body)}</div>
    </div>
  )
}
