import React, { useState } from 'react';
import { CiBadgeDollar, CiBank, CiDumbbell, CiForkAndKnife, CiStar } from 'react-icons/ci'
import './PracticePicker.css';
import { pickPractice } from './api';
import { Categories } from './models';

export const PracticePicker = ({goals}: {goals: Categories}) => {
  const [selectedPractice, setSelectedPractice] = useState('');
  const [selectedTime, setSelectedTime] = useState(0);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const handlePracticeClick = (practice: string) => {
    setSelectedPractice(practice);
  };

  const handleTimeChange = (e: any) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(`Selected practice: ${selectedPractice}`);
    console.log(`Selected time: ${selectedTime}`);
    setIsLoading(true)
    console.log(`Goal: ${goals[selectedPractice as keyof Categories]}`)
    const response = await pickPractice({
      time: selectedTime,
      category: selectedPractice,
      goal: goals[selectedPractice as keyof Categories]
    })
    setIsLoading(false)
    console.log(`Suggested practice: ${response.data}`)
    setResponse(response.data.practice_description)
    return
  };

  return (
    <div className="PracticePicker">
      <h5>Which goal do you want to work toward?</h5>
      <div className="practices">
        <div className="practice" onClick={() => handlePracticeClick('work')}>
          <CiBank className={selectedPractice === 'work' ? 'selected' : ''} />
          <span className="practice-label">Work</span>
        </div>
        <div className="practice" onClick={() => handlePracticeClick('workout')}>
          <CiDumbbell className={selectedPractice === 'workout' ? 'selected' : ''} />
          <span className="practice-label">Workout</span>
        </div>
        <div className="practice" onClick={() => handlePracticeClick('fun')}>
          <CiStar className={selectedPractice === 'fun' ? 'selected' : ''} />
          <span className="practice-label">Fun</span>
        </div>
        <div className="practice" onClick={() => handlePracticeClick('food')}>
          <CiForkAndKnife className={selectedPractice === 'food' ? 'selected' : ''} />
          <span className="practice-label">Food</span>
        </div>
        <div className="practice" onClick={() => handlePracticeClick('finance')}>
          <CiBadgeDollar className={selectedPractice === 'finance' ? 'selected' : ''} />
          <span className="practice-label">Finance</span>
        </div>
      </div>
      <h5>How much time do you want to spend?</h5>
      <select onChange={handleTimeChange} value={selectedTime}>
        <option value="">Select...</option>
        <option value="5">5 minutes</option>
        <option value="10">10 minutes</option>
        <option value="15">15 minutes</option>
        <option value="30">30 minutes</option>
        <option value="60">1 hour</option>
      </select>
      {isLoading ? (
            <>
              <div className="loader"></div>
              <h5>Asking GPT...</h5>
            </>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
      )}
      {response ? (
        <>
          <h5>Response:</h5>
          <p className="response">{response}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
