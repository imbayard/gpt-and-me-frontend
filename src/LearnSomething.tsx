import React, { useState } from 'react';
import { LearnSomething } from './models';

import './LearnSomething.css'
import MindMap from './components/MindMap';

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
        topics: [
          {
            seed: "Examples",
            lesson: "Artificial intelligence is increasingly permeating various aspects of life, revolutionizing sectors like healthcare and finance by providing groundbreaking solutions. This advanced technology is aiding in disease diagnosis, predictive analysis, and risk management. Furthermore, the concept of remote work, propelled by recent global events, has altered traditional employment paradigms, promoting flexibility and work-life integration. On a grander scale, advancements in space technology are inspiring a new generation, fueling the aspiration for interstellar exploration and the pursuit of extraterrestrial life",
            num_topics: 0,
            num_topics_done: 0,
            done: true,
            topics: []
          }
        ]
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
        topics: []
      }
    ]
  };
  

export default function LearnSomethingComponent() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
      <div>
        <button className="open-button" onClick={() => setIsDrawerOpen(true)}>Open Drawer</button>
        <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
          <MindMap data={mockData} />
          <button onClick={() => setIsDrawerOpen(false)}>Close Drawer</button>
        </div>
      </div>
    );
}