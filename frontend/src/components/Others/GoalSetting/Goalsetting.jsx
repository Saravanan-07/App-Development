import React, { useState } from 'react';
import '../../../assets/css/Others/GoalSetting/Goalsetting.css'
const GoalsPage = () => {
  const [goals, setGoals] = useState([
    { id: 1, name: 'Complete 10 push-ups in 1 minute', description: 'Get ready to sweat!', targetDate: '2024-03-16', type: '' },
  ]);

  const [newGoal, setNewGoal] = useState({ name: '', description: '', targetDate: '' });

  const handleAddGoal = () => {
    const dateDiff = Math.abs(new Date(newGoal.targetDate).getTime() - new Date().getTime());
    const days = Math.ceil(dateDiff / (1000 * 3600 * 24));
    const type = days <= 30 ? 'Short Term' : 'Long Term';
    setGoals([...goals, { id: goals.length + 1, name: newGoal.name, description: newGoal.description, targetDate: newGoal.targetDate, type }]);
    setNewGoal({ name: '', description: '', targetDate: '' });
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
            <p className="goal-target-date">
              Target Date: {goal.targetDate} ({goal.type})
            </p>
            <p className="goal-countdown">Countdown: {handleCountdown(goal.targetDate)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsPage;