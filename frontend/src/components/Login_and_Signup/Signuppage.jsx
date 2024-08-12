import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { emailvalidator, passwordvalidator, usernamevalidator } from './Regexvalidator';
import '../../assets/css/Login_and_Signup/Signuppage.css';

const Signuppage = () => {
  const navigate = useNavigate();

  const [inputt, setInputt] = useState({ name: '', email: '', password: '' });
  const [errmsg, setErrmsg] = useState('');

  const changeHandlerr = (e) => {
    setInputt({ ...inputt, [e.target.name]: e.target.value });
  }

  const onClickeventt = async (e) => {
    e.preventDefault();
    if (!emailvalidator(inputt.email)) {
      setErrmsg("Enter a valid email id");
    } else if (!usernamevalidator(inputt.name)) {
      setErrmsg("Enter a valid username");
    } else if (!passwordvalidator(inputt.password)) {
      setErrmsg("Password must have a length of at least 8 characters");
    } else {
      try {
        const response = await axios.post('http://localhost:8080/user/signup', {
          name: inputt.name,
          email: inputt.email,
          password: inputt.password,
        });

        if (response.status === 200) {
          console.log('User registered successfully:', response.data);
          navigate('/login');
        } else {
          setErrmsg('Registration failed');
        }
      } catch (error) {
        console.error("There was an error registering!", error);
        setErrmsg('There was an issue with the registration process. Please try again.');
      }
    }
  }

  return (
    <div className='container'>
      <h1 className='ltext'>Create a new account</h1><br/><br/>
      {errmsg && (<div style={{color:'red',backgroundColor:'black'}}>{errmsg}</div>)}
      <div className="inputdiv">
        <input className='inputl' type='text' placeholder='Enter username' name='name' onChange={changeHandlerr} />
        <input className='inputl' type='email' placeholder='Enter email' name='email' onChange={changeHandlerr} />
        <input className='inputl' type='password' placeholder='Enter password' name='password' onChange={changeHandlerr} />
      </div>
      <hr/>
      <div className="buttonouter">
        <div className="buttondiv">
          <button className='loginbutton' onClick={onClickeventt}>Sign Up</button>
          <button className='loginbutton' onClick={() => navigate('/login')}>Sign In?</button>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;
