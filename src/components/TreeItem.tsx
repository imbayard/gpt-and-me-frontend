import React, { useEffect, useRef, useState } from 'react'
import './TreeItem.css'
import { LearnSomething } from '../models'
import { generateChildLearnSOmething, getLearnSomethings } from '../api'
import Loader from './Loader'
import { BigText } from './BigText'
import { empty_learn_something } from '../lib/constants'

const TreeItem: React.FC<{
  node: LearnSomething
  rootId: string
  email: string
  setLearnSomething: React.Dispatch<React.SetStateAction<LearnSomething>>
}> = ({ node, rootId, setLearnSomething, email }) => {
  async function handleGenerateSeed(child: string) {
    setIsLoadingNewSeed(true)
    console.log(child, rootId)
    const didSucceed = await generateChildLearnSOmething(child, rootId)
    if (didSucceed) {
      const ls = await getLearnSomethings(email)
      const root =
        ls.find((root) => root._id === rootId) || empty_learn_something
      console.log(root)
      setLearnSomething(root)
    }
    setIsLoadingNewSeed(false)
  }

  const [openChild, setOpenChild] = useState<LearnSomething | undefined>(
    undefined
  )
  const expandingDivRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoadingNewSeed, setIsLoadingNewSeed] = useState(false)

  useEffect(() => {
    if (isExpanded && expandingDivRef.current !== null) {
      expandingDivRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isExpanded])

  function KeepDigging(node: LearnSomething) {
    return node.lesson ? (
      <BigText header="" body={node.lesson} />
    ) : !isLoadingNewSeed ? (
      <button
        className="generate-seed-button"
        onClick={() => handleGenerateSeed(node.seed)}
      >
        Keep Digging!
      </button>
    ) : (
      <Loader message="Generating Lesson..." />
    )
  }

  function handleOpen(child: LearnSomething) {
    const conditional = openChild && child.seed === openChild.seed
    setOpenChild(conditional ? undefined : child)
    setIsExpanded(conditional ? false : true)
  }

  return (
    <div className="tree-item">
      <h3 className="tree-seed">{node.seed}</h3>
      {KeepDigging(node)}
      <>
        <div className="tree-child-tabs">
          {node.topics.map((child) => {
            return (
              <div
                key={child.seed}
                onClick={() => {
                  handleOpen(child)
                }}
                className={`tree-child-tab${
                  openChild && child.seed === openChild.seed ? '-open' : ''
                }`}
              >
                {child.seed}
              </div>
            )
          })}
        </div>
        {openChild && (
          <div className="tree-child" ref={expandingDivRef}>
            <TreeItem
              node={
                node.topics.find((child) => child.seed === openChild.seed) ||
                empty_learn_something
              }
              rootId={rootId}
              setLearnSomething={(ls) => setLearnSomething(ls)}
              email={email}
            />
          </div>
        )}
      </>
    </div>
  )
}

export default TreeItem
