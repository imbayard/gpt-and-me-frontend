import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PromptResponse } from './PromptResponse'
import { Goals } from './Goals';
import './App.css'
import { PracticePicker } from './PracticePicker';
import { getGoals } from './api'
import Tabs from './Tabs';

Modal.setAppElement('#root');

const App = () => {

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await getGoals();
      setGoals(response.data.goals || emptyGoals)
      setName(response.data.name)
      setEmail(response.data.email)
      setStudyPlans(response.data.studyPlans)
    };
  
    fetchGoals();
  }, []);

  const testGoals = {
    "work": "To be promoted to senior software engineer",
    "workout": "To be toned, energetic, and agile",
    "fun": "To be genuinely happy",
    "food": "To eat what I like, but mostly healthy",
    "finance": "To be independently wealthy"
  }

  const emptyGoals = {
    work: "",
    workout: "",
    fun: "",
    food: "",
    finance: ""
  }

  const [studyPlans, setStudyPlans] = useState({})
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [goals, setGoals] = useState(testGoals);

  const [modalOpen, setModalOpen] = useState({
    promptResponse: false,
    goals: false,
    practicePicker: false,
    userProfile: false
  });

  const openModal = (component) => {
    setModalOpen(prevState => ({ ...prevState, [component]: true }));
  };

  const closeModal = (component) => {
    setModalOpen(prevState => ({ ...prevState, [component]: false }));
  };

  const modalStyle = {
    content: {
      width: '80vw',
      height: '90vh',
      padding: '0px',
      margin: 'auto',
      overflowX: 'hidden',
      overflowY: 'scroll',
      backgroundColor: '#f4f4f4'
    }
  }

  const allGoalsEmpty = !Object.values(goals).some(goal => goal.trim() !== '');

  return (
    <div className="App">
      <p className="welcome-message">{name}</p>
      <div className='app-body'>
        <div className="goals-display">
          <div className="goals-display-header">
            <h2>Your Goals</h2>
            <button onClick={() => openModal('goals')}>Edit</button>
          </div>
            {allGoalsEmpty ? (
              <p>Add goals from the "Update Goals" tile</p>
            ) : (
              <>
                <p><strong>Work: </strong>{goals.work}</p>
                <p><strong>Workout: </strong>{goals.workout}</p>
                <p><strong>Fun: </strong>{goals.fun}</p>
                <p><strong>Food: </strong>{goals.food}</p>
                <p><strong>Finance: </strong>{goals.finance}</p>
              </>
          )}
        </div>
        <div className='tiles'>
          <div className="tile" onClick={() => openModal('promptResponse')}>Record A Journal Entry</div>
            <Modal style={modalStyle} isOpen={modalOpen.promptResponse} onRequestClose={() => closeModal('promptResponse')}>
              <PromptResponse goals={goals} />
            </Modal>
            <Modal style={modalStyle} isOpen={modalOpen.goals} onRequestClose={() => closeModal('goals')}>
              <Goals goals={goals} setGoals={setGoals} />
            </Modal>
          <div className="tile" onClick={() => openModal('practicePicker')}>Do Something</div>
            <Modal style={modalStyle} isOpen={modalOpen.practicePicker} onRequestClose={() => closeModal('practicePicker')}>
              <PracticePicker goals={goals} />
            </Modal>
          <div className="tile" onClick={() => openModal('userProfile')}>Learn Something</div>
            <Modal style={modalStyle} isOpen={modalOpen.userProfile} onRequestClose={() => closeModal('userProfile')}>
              <Tabs goals={goals} studyPlans={studyPlans} name={name} email={email}/>
            </Modal>
        </div>
      </div>
    </div>
  )
};

export default App;
