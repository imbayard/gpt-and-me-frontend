import React, { useState } from 'react';
import './Goals.css'
import { CiBadgeDollar, CiBank, CiDumbbell, CiForkAndKnife, CiStar } from 'react-icons/ci'

import { postGoals } from './api'
import { Categories } from './models';

interface GoalsComponentProps {
  goals: Categories
  setGoals: React.Dispatch<React.SetStateAction<Categories>>
}

export const Goals = ({goals, setGoals}: GoalsComponentProps) => {
    
    const [form, setForm] = useState(goals)
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
      const response = await postGoals(form)
      setGoals(form)
      setIsLoading(false);
      console.log(response.data)
      return
    };
  
    return (
      <div className="Goals">
        <h5>What are your goals</h5>
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
              <h5>Updating goals...</h5>
            </>
            
          ) : (
            <button type="submit">Submit</button>
          )}
        </form>
      </div>
    );
}