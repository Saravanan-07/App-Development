import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../../assets/css/Others/Workouts/WorkoutPlans_2.css';

const Workoutplans = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
    reps: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/workouts');
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

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
      const response = await axios.post('http://localhost:5001/workouts', newWorkout, {
        headers: { 'Content-Type': 'application/json' }
      });
      setWorkouts(prevState => [...prevState, response.data]);
      setNewWorkout({
        name: '',
        description: '',
        reps: ''
      });
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading workouts...</div>;
  }

  return (
    <div>
      <div className="maincls">
        <div className="gobackwork">
          <Link to='/workouts' id="Link" className='navbarbutcal'>Back</Link>
        </div>
        <div className="bdy">
          <div className="cardarea">
            <div className="wrapperr">
              <div className="boxxarea">
                {workouts.map(workout => (
                  <div key={workout.id} className="boxxx">
                    <img src="https://picsum.photos/371/400" alt="" className='boxxximg' />
                    <div className="overlayyy">
                      <h3 className='overlayyhh'>{workout.name} Hello</h3>
                      <p>{workout.description}</p>
                      <p>Reps: {workout.reps}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

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

        <div className="contentbox footer">
          <ul>
            <li><h1>VEST ARMOUR</h1></li>
            <li>© 2024 Vest Armour®, Inc. All rights reserved</li>
            <li>Privacy Policy  |</li>
            <li>Terms of use  |</li>
            <li>Cookie Policy  |</li>
            <li>Manage Your Content |</li>
            <li>AdChoices|</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Workoutplans;