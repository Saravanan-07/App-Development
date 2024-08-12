import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import '../../../../assets/css/Others/Workouts/WorkoutPlans/WorkoutPlans_1.css';

const Wpcardio = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/workout-plans');
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workout plans:', error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <div className="slider-container">
        <nav className="slider-navbar">
          <ul className="navbar-list">
            <li><Link to='/workouts' id="Link" className='navbar-item'>Back</Link></li>
            <li className="navbar-item"><a href="#exaer">Aerobics</a></li>
            <li className="navbar-item"><a href="#exbox">Boxing</a></li>
            <li className="navbar-item"><a href="#excyc">Cycling</a></li>
            <li className="navbar-item"><a href="#exdan">Dancing</a></li>
            <li className="navbar-item"><a href="#exjog">Jogging</a></li>
            <li className="navbar-item"><a href="#expil">Pilates</a></li>
            <li className="navbar-item"><a href="#extread">Treadmill</a></li>
            <li className="navbar-item"><a href="#exswi">Swimming</a></li>
            <li className="navbar-item"><a href="#exwal">Walking</a></li>
            <li className="navbar-item"><a href="#exrun">Running</a></li>
            <li className="navbar-item"><a href="#exyog">Yoga</a></li>
          </ul>
        </nav>
      </div>
      <div className="navspace"></div>

      <div className="exercisecontainer" id='exaer'>
        {workouts && workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout.id} className="exercisetext">
              <div className="exercisetitle">{workout.name}</div>
              <p className='exercisedesc'>Reps: {workout.reps}</p>
              <button className='addexbut'>Add Workout</button>
            </div>
          ))
        ) : (
          <p>No workouts available</p>
        )}
      </div>
    </div>
  );
};

export default Wpcardio;
