import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import '../../../assets/css/Others/Workouts/Workouts.css';
import { Link } from 'react-router-dom';

const Workouts = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
    reps: '',
    userId: user?.id || ''
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (user) {
        try {
          const response = await axios.get('http://localhost:5001/workouts', {
            params: { userId: user.id }
          });
          setWorkouts(response.data);
        } catch (error) {
          console.error('Error fetching workouts:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWorkouts();
  }, [user]);

  const handleWorkoutChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/workouts', { ...newWorkout, userId: user.id }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setWorkouts(prevState => [...prevState, response.data]);
      setNewWorkout({
        name: '',
        description: '',
        reps: '', 
        userId: user?.id || ''
      });
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  const handleDelete = async (workoutId) => {
    try {
      await axios.delete(`http://localhost:5001/workouts/${workoutId}`);
      setWorkouts(prevState => prevState.filter(workout => workout.id !== workoutId));
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  if (loading) {
    return <div className='loading'>Sign in as user to view workouts</div>;
  }

  return (
    <>
      <div className="header-main">
        <div className="header-list demo-navbar">
          <ul>
            <li><Link to='/home' id="Link">Back</Link></li>
            <li><Link to='/workout-plans' id="Link">Workout Plans</Link></li>
          </ul>
        </div>
      </div>
      <div className="personalized-workouts">
        <h2>Workouts for {user.username}</h2>
        {workouts.length > 0 ? (
          <div className="workouts-list">
            {workouts.map((workout) => (
              <div key={workout.id} className="workout-item">
                <h3>{workout.name}</h3>
                <p>{workout.description}</p>
                <p>Reps: {workout.reps}</p>
                <button onClick={() => handleDelete(workout.id)}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No personalized workouts available. Please complete your profile to receive recommendations.</p>
        )}
        <div className="addworkoutformouter">
          <div className="add-workout-form">
            <h3>Add a New Workout</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Workout Name"
                  value={newWorkout.name}
                  onChange={handleWorkoutChange}
                  required
                />
              </div>
              <div>
                <textarea
                  name="description"
                  placeholder="Workout Description"
                  value={newWorkout.description}
                  onChange={handleWorkoutChange}
                  required
                ></textarea>
              </div>
              <div>
                <input
                  type="number"
                  name="reps"
                  placeholder="Reps"
                  value={newWorkout.reps}
                  onChange={handleWorkoutChange}
                  required
                />
              </div>
              <button type="submit">Add Workout</button>
            </form>
          </div>
        </div>
      </div>
      <div className="contentbox footer workoutfooter">
        <ul>
          <li><h1>VEST ARMOUR</h1></li>
          <li>© 2024 Vest Armour®, Inc. All rights reserved</li>
          <li>Privacy Policy |  </li>
          <li>Terms of use |  </li>
          <li>Cookie Policy |  </li>
          <li>Manage Your Content |  </li>
          <li>AdChoices |  </li>
        </ul>
      </div>
    </>
  );
};

export default Workouts;
