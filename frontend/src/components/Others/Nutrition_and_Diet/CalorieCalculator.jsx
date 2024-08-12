import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/Others/Nutrition_and_Diet/CalorieCalc.css'
const CalorieCalculator = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    gender: '',
    age: '',
    goal: '',
    weightChange: '',
  });

  const [calories, setCalories] = useState({
    maintenance: 0,
    weightLoss: 0,
    weightGain: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateCalories = () => {
    const { weight, height, gender, age, goal, weightChange } = formData;
    let bmr;

    if (gender === 'male') {
        bmr = 13.397 * weight + 6.25 * height - 4.799 * age  +88.362;
      } else if (gender === 'female') {
        bmr = 9.247 * weight + 3.098* height - 4.330 * age +447.593;
      }
  

    const maintenanceCalories = bmr * 1.2; 

    const weightChangeCalories = (goal === 'lose' ? 1 : 1) +350

    const weightLossCalories = maintenanceCalories - weightChangeCalories;
    const weightGainCalories = maintenanceCalories + weightChangeCalories;

    setCalories({
      maintenance: maintenanceCalories,
      weightLoss: weightLossCalories,
      weightGain: weightGainCalories,
    });
  };

  return (
    <div clss="caloriecalc">
      <div className="navbarcal">
          
        <Link to='/home' id="Link" className='navbarbutcal'>Back</Link>
          
      </div>
      <form class="caloform">
        <div>
            <h3 class="head1">Calculate your calories</h3>
          <label className='formlabelcalo'>Weight (kg): </label>
          <input className='forminputcal' type="number" name="weight" value={formData.weight} onChange={handleChange} />
        </div>
        <div>
          <label className='formlabelcalo'>Height (cm): </label>
          <input className='forminputcal' type="number" name="height" value={formData.height} onChange={handleChange} />
        </div>
        <div>
          <label className='formlabelcalo'>Gender: </label>
          <select className='forminputcal' name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className='formlabelcalo'>Age: </label>
          <input className='forminputcal' type="number" name="age" value={formData.age} onChange={handleChange} />
        </div>
        <div>
          <label className='formlabelcalo'>Goal: </label>
          <select className='forminputcal' name="goal" value={formData.goal} onChange={handleChange}>
            <option value="">Select</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>
        <div>
          <label className='formlabelcalo'>Weight Change (kg): </label>
          <input className='forminputcal' type="number" name="weightChange" value={formData.weightChange} onChange={handleChange} />
        </div>
        
        <button className='formbutcal' type="button" onClick={calculateCalories}>Calculate</button>

      <div>
        <h3>Calorie Requirements</h3>
        <p>Maintenance Calories: {calories.maintenance.toFixed(2)}</p>
        {formData.goal === 'lose' && (
            
          <p>Weight Loss Calories: {calories.weightLoss.toFixed(2)}</p>
        )}
        {formData.goal === 'gain' && (
          <p>Weight Gain Calories: {calories.weightGain.toFixed(2)}</p>
        )}
      </div>
      </form>
    </div>
  );
};

export default CalorieCalculator;