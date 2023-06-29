import React, { useEffect, useState } from 'react';

import './LearnSomething.css'
import Loader from './components/Loader';
import TreeItem from './components/TreeItem';
import { mock_learn_something } from './lib/mock_data';
import { getLearnSomethings, learnSomethingNew } from './api';

export default function LearnSomethingComponent() {
    const [openDrawer, setOpenDrawer] = useState('');
    const [isLearnSomethingNewOpen, setIsLearnSomethingNewOpen] = useState(false)
    const [newTopic, setNewTopic] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [learnSomethingArray, setLearnSomethingArray] = useState([mock_learn_something])

    useEffect(() => {
      async function fetchLearnSomethings() {
        const learnSomethings = await getLearnSomethings()
        setLearnSomethingArray(learnSomethings)
      }

      fetchLearnSomethings()
    }, [])

    useEffect(() => {
      console.log(learnSomethingArray);
    }, [learnSomethingArray]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setNewTopic(e.target.value)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()

      setIsLoading(true)
      const response = await learnSomethingNew(newTopic)
      console.log("Response Received", response)
      const all = await getLearnSomethings()
      setLearnSomethingArray(all)
      setIsLoading(false)
    }

    return (
      <div className='learn-something'>
        <h1 className='learn-something-header'>Your Subjects To Learn</h1>
        <button className='learn-something-new' onClick={() => setIsLearnSomethingNewOpen(!isLearnSomethingNewOpen)}>Learn Something New</button>
        <div className={`learn-drawer ${isLearnSomethingNewOpen ? 'open' : ''}`}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
                <p>What Do You Want To Learn?</p>
                <input 
                    onChange={(e) => handleChange(e)} 
                    type="text" 
                    name='new_topic' 
                    placeholder='Enter Topic (eg: "Buddhism" or "How to win Blackjack")'
                    value={newTopic || ''}
                />
            </label>
            {isLoading ? (
                    <Loader message={'Getting Feedback...'}/>
                ) : (
                    <button type="submit">Submit</button>
                )}
          </form>
        </div>
        {learnSomethingArray ? learnSomethingArray.map(learn_something => {
          return (
            <>
              <button 
                className="open-button" 
                onClick={() => {
                  if (openDrawer === learn_something.seed) {
                    setOpenDrawer(''); // if clicked drawer is already open, close it
                  } else {
                    setOpenDrawer(learn_something.seed); // else, open the clicked drawer
                  }
                }}>
                {learn_something.seed}
              </button>
              <div 
                key={learn_something.seed.replace('/\\s/g', '')} 
                className={`drawer ${openDrawer === learn_something.seed ? 'open' : ''}`}>
                <TreeItem setLearnSomethings={(ls) => setLearnSomethingArray(ls)} node={learn_something} level={0} rootId={learn_something._id || ''}/>
              </div>
            </>
          )
        }) : (
          <h3 style={{color: '#454545'}}>You don't have any subjects yet. Click "Learn Something New" above.</h3>
        )}
      </div>
    );
}