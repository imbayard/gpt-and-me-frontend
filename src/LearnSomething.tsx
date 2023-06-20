import React, { useState } from 'react';
import { LearnSomething } from './models';

import './LearnSomething.css'
import MindMap from './components/MindMap';
import Loader from './components/Loader';
import { wait } from '@testing-library/user-event/dist/utils';

const mockTopics = [
  {
    seed: "Examples",
    lesson: "Artificial intelligence is increasingly permeating various aspects of life, revolutionizing sectors like healthcare and finance by providing groundbreaking solutions. This advanced technology is aiding in disease diagnosis, predictive analysis, and risk management. Furthermore, the concept of remote work, propelled by recent global events, has altered traditional employment paradigms, promoting flexibility and work-life integration. On a grander scale, advancements in space technology are inspiring a new generation, fueling the aspiration for interstellar exploration and the pursuit of extraterrestrial life",
    num_topics: 0,
    num_topics_done: 0,
    done: true,
    topics: []
  },
  {
    seed: "Second Node",
    lesson: "Artificial intelligence is increasingly permeating various aspects of life, revolutionizing sectors like healthcare and finance by providing groundbreaking solutions. This advanced technology is aiding in disease diagnosis, predictive analysis, and risk management. Furthermore, the concept of remote work, propelled by recent global events, has altered traditional employment paradigms, promoting flexibility and work-life integration. On a grander scale, advancements in space technology are inspiring a new generation, fueling the aspiration for interstellar exploration and the pursuit of extraterrestrial life",
    num_topics: 0,
    num_topics_done: 0,
    done: false,
    topics: []
  }
]

const mockData: LearnSomething = {
    seed: "Physics",
    lesson: "Artificial intelligence is increasingly permeating various aspects of life, tion for interstellar exploration and the pursuit of extraterrestrial life",
    num_topics: 3,
    num_topics_done: 2,
    done: false,
    topics: [
      {
        seed: "First Law",
        lesson: "Artificial intelligence ropelled by recent global events, has altered traditional employment paradigms, promoting flexibility and work-life integration. On a grander scale, advancements in space technology are inspiring a new generation, fueling the aspiration",
        num_topics: 1,
        num_topics_done: 1,
        done: true,
        topics: mockTopics
      },
      {
        seed: "Second Law",
        lesson: "F=ma",
        num_topics: 0,
        num_topics_done: 0,
        done: false,
        topics: []
      },
      {
        seed: "Third Law",
        lesson: "Artificial intelligence is increasingly permeating various aspects of life, revolutionizing sectors like healthcare and finance by providing groundbreaking solutions. This advanced technology is aiding in disease diagnosis, predictive analysis, and risk management. Furthermore, the concept of remote work, propelled by recent global events, has altered traditional employment paradigms, promoting flexibility and work-life integration. On a grander scale, advancements in space technology are inspiring a new generation, fueling the aspiration for interstellar exploration and the pursuit of extraterrestrial life",
        num_topics: 0,
        num_topics_done: 0,
        done: false,
        topics: mockTopics
      }
    ]
  };
  

export default function LearnSomethingComponent() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLearnSomethingNewOpen, setIsLearnSomethingNewOpen] = useState(false)
    const [newTopic, setNewTopic] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(e: any) {
      setNewTopic(e.target.value)
    }

    function handleSubmit(e: any) {
      e.preventDefault()

      console.log("Submittted")
      setIsLoading(true)
      wait(5)
      setIsLoading(false)
    }

    return (
      <div className='learn-something'>
        <h1 className='learn-something-header'>Your Subjects To Learn</h1>
        <button className='learn-something-new' onClick={() => setIsLearnSomethingNewOpen(!isLearnSomethingNewOpen)}>Learn Something New</button>
        <div className={`learn-drawer ${isLearnSomethingNewOpen ? 'open' : ''}`}>
          <form>
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
                    <button onClick={(e) => handleSubmit(e)} type="submit">Submit</button>
                )}
          </form>
        </div>
        <button className="open-button" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>{mockData.seed}</button>
        <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
          <MindMap data={mockData} />
        </div>
      </div>
    );
}