import React, { useState } from 'react';
import './PromptResponse.css';
import { CiBadgeDollar, CiBank, CiDumbbell, CiForkAndKnife, CiStar } from 'react-icons/ci'

import { postPost } from './api'
import { SentimentResonator } from './SentimentResonator';
import { Categories } from './models';

export const PromptResponse = ({goals}: {goals: Categories}) => {
    
    const emptyForm = {
      work: '',
      workout: '',
      fun: '',
      food: '',
      finance: '',
      summary: ''
    }

    const testData = {
      "work": "You did some good work today on this app, but don't forget to schedule in some rest days so that you don't get burned out. Try to set some goals for what you want to accomplish tomorrow for yourself.",
      "workout": "No workout today, but it's great that you went for a walk. That counts as physical activity too! Make sure to set some goals for your workouts this week.",
      "fun": "It sounds like you had a great day today. Spending time with family and friends is always enjoyable and it's great that you watched some F1. Try to plan some fun activities with your family and friends for next weekend.",
      "food": "You didn't eat as healthy as you could have today. Although it's OK to treat yourself every once and awhile, try to get back on track tomorrow and plan out some nutritious meals for the week.",
      "finance": "It's great that you were mindful of your spending today. Make sure to continue to track your spending throughout the week.",
      "summary": "It sounds like you had a fun and relaxing day today. You worked hard, spent time with your family, watched F1, and were mindful of your spending habits. Try to plan healthier meals and give yourself more goals for work and workouts this week."
    }
    const [form, setForm] = useState(emptyForm)
    
    const [gptResponse, setGptResponse] = useState(emptyForm)
  
    const [isLoading, setIsLoading] = useState(false);
  
    const handleChange = (e: any) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      console.log(form);
    
      setIsLoading(true);
      const response = await postPost(form)
      setIsLoading(false);
      console.log(response.data)
      setGptResponse(response.data)
      return
    };
  
    return (
      <div className="PromptResponse">
        <h5>What was your day like?</h5>
        <form onSubmit={handleSubmit}>
        <div className="input-group">
            <CiBank />
            <input type="text" name="work" placeholder="Work" onChange={handleChange} value={form.work || ''} />
          </div>
          <div className="input-group">
            <CiDumbbell />
            <input type="text" name="workout" placeholder="Workout" onChange={handleChange} value={form.workout || ''}  />
          </div>
          <div className="input-group">
            <CiStar />
            <input type="text" name="fun" placeholder="Fun" onChange={handleChange} value={form.fun || ''}  />
          </div>
          <div className="input-group">
            <CiForkAndKnife />
            <input type="text" name="food" placeholder="Food" onChange={handleChange} value={form.food || ''}  />
          </div>
          <div className="input-group">
            <CiBadgeDollar />
            <input type="text" name="finance" placeholder="Finance" onChange={handleChange} value={form.finance || ''}  />
          </div>
          {isLoading ? (
            <>
              <div className="loader"></div>
              <p>Getting feedback from GPT...</p>
            </>
            
          ) : (
            <button type="submit">Submit</button>
          )}
        </form>
        {gptResponse && gptResponse.summary ? (
          <>
            <h5>Response:</h5>
            <table>
              <tr><th>Work:</th><td>{gptResponse.work || ''}</td></tr>
              <tr><th>Workout:</th><td>{gptResponse.workout || ''}</td></tr>
              <tr><th>Fun:</th><td>{gptResponse.fun || ''}</td></tr>
              <tr><th>Food:</th><td>{gptResponse.food || ''}</td></tr>
              <tr><th>Finance:</th><td>{gptResponse.finance || ''}</td></tr>
              <tr><th>Summary:</th><td>{gptResponse.summary || ''}</td></tr>
            </table>
            <SentimentResonator entry={gptResponse} goals={goals} />
          </>
        ) : 
        <>
        </>
        }
      </div>
    );
}