import React, { useState, useEffect, useRef } from 'react'
import { LearnSomething } from './models'
import { useNavigate, useParams } from 'react-router-dom'
import { getLearnSomethings } from './api'
import { URLS, empty_learn_something as empty } from './lib/constants'

import './LearnSomethingRoot.css'
import { BigText } from './components/BigText'
import TreeItem from './components/TreeItem'

export function LearnSomethingRoot({ email }: { email: string }) {
  const [root, setRoot] = useState<LearnSomething>(empty)
  const [openChild, setOpenChild] = useState<LearnSomething | undefined>(
    undefined
  )
  const expandingDivRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const { id } = useParams()
  const history = useNavigate()

  useEffect(() => {
    async function load() {
      const ls_all: LearnSomething[] = await getLearnSomethings(email)
      const this_ls = ls_all ? ls_all.find((ls) => ls._id === id) : empty
      setRoot(this_ls || empty)
    }
    load()
    if (isExpanded && expandingDivRef.current !== null) {
      expandingDivRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isExpanded])

  function handleOpen(child: LearnSomething) {
    const conditional = openChild && child.seed === openChild.seed
    setOpenChild(conditional ? undefined : child)
    setIsExpanded(conditional ? false : true)
  }

  return (
    <div key={root._id} className="learn-something-root">
      <div className="learn-something-root-navigator">
        <button
          className="learn-something-root-navigate-back"
          onClick={() => history(URLS.LEARN)}
        >
          Back
        </button>
        <h3 className="learn-something-root-topic">{root.seed}</h3>
      </div>
      <div className="learn-something-root-lesson">
        {root.lesson && root.lesson !== '' && (
          <BigText header="" body={root.lesson} />
        )}
      </div>
      <>
        <div className="learn-something-child-tabs">
          {root.topics.map((child) => {
            return (
              <div
                key={child.seed}
                onClick={() => {
                  handleOpen(child)
                }}
                className={`learn-something-child-tab${
                  openChild && child.seed === openChild.seed ? '-open' : ''
                }`}
              >
                {child.seed}
              </div>
            )
          })}
        </div>
        {openChild && (
          <div className="learn-something-child" ref={expandingDivRef}>
            <TreeItem
              node={
                root.topics.find((child) => child.seed === openChild.seed) ||
                empty
              }
              rootId={root._id || ''}
              setLearnSomething={(ls) => setRoot(ls)}
              email={email}
            />
          </div>
        )}
      </>
    </div>
  )
}
