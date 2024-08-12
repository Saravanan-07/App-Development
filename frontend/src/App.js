import { Route, Routes } from 'react-router-dom';
import './App.css';
import Loginpage from './components/Login_and_Signup/Loginpage';
import Signuppage from './components/Login_and_Signup/Signuppage';
import Homepage from './components/Homepage/Homepage';
import AdminDashboard from './components/Homepage/AdminDashboard/AdminDashboard';
import Workouts from './components/Others/Workouts/Workouts_2';
import Demos from './components/Others/ExerciseDemos/Demos';
import Dietfoods from './components/Others/Nutrition_and_Diet/Dietfoods';
import VirtualTrainer from './components/Others/VirtualTrainer/VirtualTrainer';
import Goalsetting from './components/Others/GoalSetting/Goalsetting';
import Wpcardio from './components/Others/Workouts/WorkoutPlans/WorkoutPlans_1';
import Community from './components/Others/Community/Community';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Homepage/>}></Route>
        <Route path='/login' element={<Loginpage/>}></Route>
        <Route path='/register' element={<Signuppage/>}></Route>
        <Route path='/home' element={<Homepage/>}></Route>
        <Route path='/AdminDashboard' element={<AdminDashboard/>}></Route>
        <Route path='/trainer/trainees' element={<VirtualTrainer/>}></Route>
        <Route path='/workouts' element={<Workouts/>}></Route>
        <Route path='/workout-plans' element={<Wpcardio/>}></Route>
        <Route path='/demos' element={<Demos/>}></Route>
        <Route path='/nutrients' element={<Dietfoods/>}></Route>
        <Route path='/virtualtrainer' element={<VirtualTrainer/>}></Route>
        <Route path='/goals' element={<Goalsetting/>}></Route>
        <Route path='/community' element={<Community/>}></Route>
      </Routes>
   </div>
  );
}

export default App;
