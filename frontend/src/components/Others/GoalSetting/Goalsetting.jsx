import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../assets/css/Others/GoalSetting/Goalsetting.css';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ name: '', description: '', targetDate: '' });

  // Fetch goals from backend
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/goals/user/1'); // Update with actual userId if needed
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    const dateDiff = Math.abs(new Date(newGoal.targetDate).getTime() - new Date().getTime());
    const days = Math.ceil(dateDiff / (1000 * 3600 * 24));
    const type = days <= 30 ? 'Short Term' : 'Long Term';

    try {
      const response = await axios.post('http://localhost:8080/goals/user/1', {
        ...newGoal,
        target_date: newGoal.targetDate, // Ensure correct field name for target_date
        type,
      }); // Update with actual userId if needed

      setGoals([...goals, response.data]);
      setNewGoal({ name: '', description: '', targetDate: '' });
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await axios.delete(`http://localhost:8080/goals/${goalId}/user/1`); // Update with actual userId if needed
      setGoals(goals.filter(goal => goal.id !== goalId));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleCountdown = (targetDate) => {
    const dateDiff = Math.abs(new Date(targetDate).getTime() - new Date().getTime());
    const days = Math.ceil(dateDiff / (1000 * 3600 * 24));
    const hours = Math.floor((dateDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((dateDiff % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  return (
    <div className="goals-container">
      <h1 className="title">Goals</h1>
      <div className="form">
        <label className="label">
          <span className="label-text">Name</span>
          <input
            type="text"
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            className="input"
          />
        </label>
        <label className="label">
          <span className="label-text">Description</span>
          <textarea
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            className="textarea"
          />
        </label>
        <label className="label">
          <span className="label-text">Target Date</span>
          <input
            type="date"
            value={newGoal.targetDate}
            onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
            className="input"
          />
        </label>
        <button
          onClick={handleAddGoal}
          className="button"
        >
          Add Goal
        </button>
      </div>
      <ul className="goals-list">
        {goals.map((goal) => (
          <li key={goal.id} className="goal-item">
            <h2 className="goal-name">{goal.name}</h2>
            <p className="goal-description">{goal.description}</p>
            <p className="goal-countdown">Countdown: {handleCountdown(goal.target_date)}</p>
            <button
              onClick={() => handleDeleteGoal(goal.id)}
              className="button"
            >
              Delete Goal
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsPage;
