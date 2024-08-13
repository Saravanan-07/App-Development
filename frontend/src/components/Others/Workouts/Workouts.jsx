import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../assets/css/Others/Workouts/Workouts.css';
import Carousel from '../../Carousel/Carousel';
import { useAuth } from '../../../context/AuthContext';

export default function Component() {
  const { admin, userId } = useAuth(); // Use the context to identify if the user is an admin and to get userId
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); // Initial number of workouts visible
  const [workoutDetails, setWorkoutDetails] = useState({
    name: '',
    description: '',
    img_url: '',
    sets: '',
    reps: '',
    range_value: '',
  });
  const [errormsg, setErrormsg] = useState('');
  const [successmsg, setSuccessmsg] = useState('');
  const [allPredefinedWorkouts, setAllPredefinedWorkouts] = useState([]);
  const [userWorkouts, setUserWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/workoutPlans');
        setAllPredefinedWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    const fetchUserWorkouts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/workoutPlans/user/${userId}`);
        setUserWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching user workouts:', error);
      }
    };

    fetchWorkouts();
    if (!admin) {
      fetchUserWorkouts();
    }
  }, [userId, admin]);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/workoutPlans');
      setAllPredefinedWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(1));
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 6, allPredefinedWorkouts.length));
  };

  const handleInputChange = (e) => {
    setWorkoutDetails({ ...workoutDetails, [e.target.name]: e.target.value });
  };

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('http://localhost:8080/admin/workoutPlans', workoutDetails);
      await axios.post('http://localhost:8080/admin/workoutPlans', workoutDetails);
      setSuccessmsg('Workout added successfully!');
      setErrormsg('');
      setWorkoutDetails({
        name: '',
        description: '',
        img_url: '',
        sets: '',
        reps: '',
        range_value: '',
      });
      fetchWorkouts();
    } catch (error) {
      setErrormsg('Error adding workout. Please try again.');
      setSuccessmsg('');
      console.error('Error adding workout:', error);
    }
  };

  const handleAddToMyWorkouts = async (workoutPlanId) => {
    try {
      await axios.post(`http://localhost:8080/workoutPlans/user/${userId}/add/${workoutPlanId}`);
      setSuccessmsg('Workout added to your list!');
      setErrormsg('');
      // Fetch updated user workouts
      const response = await axios.get(`http://localhost:8080/workoutPlans/user/${userId}`);
      setUserWorkouts(response.data);
    } catch (error) {
      setErrormsg('Error adding workout to your list. Please try again.');
      setSuccessmsg('');
      console.error('Error adding workout to user:', error);
    }
  };

  const handleDeleteWorkout = async (workoutPlanId) => {
    try {
      await axios.delete(`http://localhost:8080/workoutPlans/${userId}/workoutPlans/${workoutPlanId}`);
      setSuccessmsg('Workout deleted from your list!');
      setErrormsg('');
      // Fetch updated user workouts
      const response = await axios.get(`http://localhost:8080/workoutPlans/user/${userId}`);
      setUserWorkouts(response.data);
      
    } catch (error) {
      setErrormsg('Error deleting workout from your list. Please try again.');
      setSuccessmsg('');
      console.error('Error deleting workout from user:', error);
    }
  };

  return (
    <div className="app-container">
      {!admin &&
        <section className="bmi-calculator-section">
          <h2 className="section-header">BMI Calculator</h2>
          <form className="bmi-form" onSubmit={calculateBMI}>
            <div className="form-field">
              <label className="form-label" htmlFor="height">Height (cm)</label>
              <input
                id="height"
                type="number"
                className="form-input"
                placeholder="Enter your height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                type="number"
                className="form-input"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <button type="submit" className="form-button">Calculate BMI</button>
            {bmi !== null && (
              <div className="bmi-result">
                <h3>Your BMI: {bmi}</h3>
                <p>
                  {bmi < 18.5
                    ? 'You are underweight.'
                    : bmi < 24.9
                    ? 'You have a normal weight.'
                    : 'You are overweight.'}
                </p>
              </div>
            )}
          </form>
        </section>
      }

      {admin ? (
        <section className="add-workout-section">
          <h2 className="section-header">Add Predefined Workouts</h2>
          <form className="add-workout-form" onSubmit={handleAddWorkout}>
            <div className="form-field">
              <label className="form-label" htmlFor="name">Workout Name</label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="Enter workout name"
                name="name"
                value={workoutDetails.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                className="form-input"
                placeholder="Enter description"
                name="description"
                value={workoutDetails.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="img_url">Image URL</label>
              <input
                id="img_url"
                type="text"
                className="form-input"
                placeholder="Enter image URL"
                name="img_url"
                value={workoutDetails.img_url}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="sets">Sets</label>
              <input
                id="sets"
                type="number"
                className="form-input"
                placeholder="Enter sets"
                name="sets"
                value={workoutDetails.sets}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="reps">Reps</label>
              <input
                id="reps"
                type="number"
                className="form-input"
                placeholder="Enter reps"
                name="reps"
                value={workoutDetails.reps}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="range_value">Recommended BMI Range</label>
              <input
                id="range_value"
                type="text"
                className="form-input"
                placeholder="Enter recommended BMI range"
                name="range_value"
                value={workoutDetails.range_value}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="form-button">Add Workout</button>
          </form>
          {errormsg && <div className="error-message">{errormsg}</div>}
          {successmsg && <div className="success-message">{successmsg}</div>}
        </section>
      ) : (
        <section className="my-workout-section">
          <h2 className="section-header">My Workouts</h2>
          <Carousel>
            {userWorkouts.length > 0 ? (
              userWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  isUserWorkout={true}
                  onDelete={() => handleDeleteWorkout(workout.id)}
                />
              ))
            ) : (
              <p>No workouts added to your list yet.</p>
            )}
          </Carousel>
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        </section>
      )}

      <section className="all-workout-section">
        <h2 className="section-header">All Workouts</h2>
        <Carousel>
          {allPredefinedWorkouts.slice(0, visibleCount).map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              isUserWorkout={false}
              onAddToMyWorkouts={() => handleAddToMyWorkouts(workout.id)}
            />
          ))}
        </Carousel>
        {visibleCount < allPredefinedWorkouts.length && (
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </section>
    </div>
  );
}

function WorkoutCard({ workout, isUserWorkout, onAddToMyWorkouts, onDelete }) {
  return (
    <div className="workout-card">
      <img src={workout.img_url} alt={workout.name} className="workout-image" />
      <h3 className="workout-title">{workout.name}</h3>
      <p className="workout-description">{workout.description}</p>
      <p className="workout-sets">Sets: {workout.sets}</p>
      <p className="workout-reps">Reps: {workout.reps}</p>
      <p className="workout-bmi-range">Recommended BMI: {workout.range_value}</p>
      {isUserWorkout ? (
        <button className="delete-workout-button" onClick={onDelete}>
          Remove
        </button>
      ) : (
        <button className="add-workout-button" onClick={onAddToMyWorkouts}>
          Add to My Workouts
        </button>
      )}
    </div>
  );
}
