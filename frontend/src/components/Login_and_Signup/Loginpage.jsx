// import React, { useState } from "react";
// import '../../assets/css/Login_and_Signup/Loginpage.css';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { emailvalidator, passwordvalidator } from "./Regexvalidator";
// import { useAuth } from '../../context/AuthContext';

// const Loginpage = () => {
//   const navigate = useNavigate();
//   const { loginUser, loginAdmin } = useAuth();

//   const [input, setInput] = useState({ email: '', password: '' });
//   const [errormsg, setErrormsg] = useState('');

//   const handleChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fetchUserData = async () => {
//     try {
//       const [userResponse, adminResponse] = await Promise.all([
//         //axios.get('http://localhost:8080/user/users'),
//         axios.post('http://localhost:8080/user/account/login',input)
//         //axios.get('http://localhost:8080/admin/admins')
//       ]);

//       console.log(userResponse.data);
//       return { users: userResponse.data, admins: adminResponse.data };
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setErrormsg('Error fetching user or admin data');
//       return { users: [], admins: [] };
//     }
//   };

//   const validateCredentials = async () => {
//     const { users, admins } = await fetchUserData();
//     // const user = users.find(user => user.email === input.email && user.password === input.password);
//     // const admin = admins.find(admin => admin.email === input.email && admin.password === input.password);

//     //if (users.size()>0) {
//       //loginUser(user); // Now stores userId in localStorage
//       navigate('/');
//     // } else if (admins.szie()>0) {
//     //   //loginAdmin(admin);
//     //   navigate('/');
//     // } else {
//     //   setErrormsg('Invalid email or password');
//     // }
//   };

//   const onClickEvent = async (e) => {
//     e.preventDefault();
//     if (!emailvalidator(input.email)) {
//       setErrormsg('Enter a valid email id');
//     } else if (!passwordvalidator(input.password)) {
//       setErrormsg('Enter a valid password');
//     } else {
//       await validateCredentials();
//     }
//   };

//   return (
//     <div>
//       <div className="login_container">
//         <h1 className="ltext">Sign in to app</h1>
//         <div className="inputdiv">
//           {errormsg.length > 0 && (<div style={{ backgroundColor: 'black', color: 'red' }}>{errormsg}</div>)}<br />
//           <input className="inputl" placeholder="Enter email" name="email" onChange={handleChange} />
//           <input className="inputl" placeholder="Enter password" type="password" name="password" onChange={handleChange} /><br /><br />
//           <u>Forgot Password?</u><br /><br />
//         </div>
//         <div className="buttonouter">
//           <div className="buttondiv">
//             <button className="finalbutton1" onClick={onClickEvent}>Continue</button>
//             <button className="finalbutton1" onClick={() => navigate('/register')}>Sign up</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Loginpage;

// import React, { useState } from "react";
// import '../../assets/css/Login_and_Signup/Loginpage.css';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { emailvalidator, passwordvalidator } from "./Regexvalidator";
// import { useAuth } from '../../context/AuthContext';

// const Loginpage = () => {
//   const navigate = useNavigate();
//   const { loginUser, loginAdmin } = useAuth();

//   const [input, setInput] = useState({ email: '', password: '' });
//   const [errormsg, setErrormsg] = useState('');

//   const handleChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/user/account/login', {
//         username: input.email,
//         password: input.password
//       });

//       const { token, user } = response.data;

//       // Store JWT token in local storage
//       localStorage.setItem('token', token);

//       // Assuming you want to store the user in context or local storage
//       loginUser(user);

//       // Navigate to the homepage
//       navigate('/');

//     } catch (error) {
//       console.error('Error logging in:', error);
//       setErrormsg('Invalid email or password');
//     }
//   };

//   const onClickEvent = async (e) => {
//     e.preventDefault();
//     setErrormsg(''); // Reset error message

//     if (!emailvalidator(input.email)) {
//       setErrormsg('Enter a valid email id');
//     } else if (!passwordvalidator(input.password)) {
//       setErrormsg('Enter a valid password');
//     } else {
//       await fetchUserData();
//     }
//   };

//   return (
//     <div>
//       <div className="login_container">
//         <h1 className="ltext">Sign in to app</h1>
//         <div className="inputdiv">
//           {errormsg.length > 0 && (<div style={{ backgroundColor: 'black', color: 'red' }}>{errormsg}</div>)}<br />
//           <input className="inputl" placeholder="Enter email" name="email" onChange={handleChange} />
//           <input className="inputl" placeholder="Enter password" type="password" name="password" onChange={handleChange} /><br /><br />
//           <u>Forgot Password?</u><br /><br />
//         </div>
//         <div className="buttonouter">
//           <div className="buttondiv">
//             <button className="finalbutton1" onClick={onClickEvent}>Continue</button>
//             <button className="finalbutton1" onClick={() => navigate('/register')}>Sign up</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Loginpage;


import React, { useState } from "react";
import '../../assets/css/Login_and_Signup/Loginpage.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { emailvalidator, passwordvalidator } from "./Regexvalidator";
import { useAuth } from '../../context/AuthContext';

const Loginpage = () => {
  const navigate = useNavigate();
  const { loginUser, loginAdmin } = useAuth();

  const [input, setInput] = useState({ email: '', password: '' });
  const [errormsg, setErrormsg] = useState('');

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fetchAdminData = async () => {
    try {
      const adminResponse = await axios.get('http://localhost:8080/admin/admins');
      const admins = adminResponse.data;

      const admin = admins.find(admin => admin.email === input.email && admin.password === input.password);

      if (admin) {
        // Admin found, log in as admin
        loginAdmin(admin);
        navigate('/'); // Navigate to admin dashboard
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setErrormsg('Error fetching admin data');
      return false;
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.post('http://localhost:8080/user/account/login', {
        username: input.email,
        password: input.password
      });

      const { token, user } = response.data;

      // Store JWT token in local storage
      localStorage.setItem('token', token);

      // Assuming you want to store the user in context or local storage
      loginUser(user);

      // Navigate to the homepage
      navigate('/');

    } catch (error) {
      console.error('Error logging in:', error);
      setErrormsg('Invalid email or password');
    }
  };

  const onClickEvent = async (e) => {
    e.preventDefault();
    setErrormsg(''); // Reset error message

    if (!emailvalidator(input.email)) {
      setErrormsg('Enter a valid email id');
    } else if (!passwordvalidator(input.password)) {
      setErrormsg('Enter a valid password');
    } else {
      const isAdmin = await fetchAdminData();
      if (!isAdmin) {
        await fetchUserData();
      }
    }
  };

  return (
    <div>
      <div className="login_container">
        <h1 className="ltext">Sign in to app</h1>
        <div className="inputdiv">
          {errormsg.length > 0 && (<div style={{ backgroundColor: 'black', color: 'red' }}>{errormsg}</div>)}<br />
          <input className="inputl" placeholder="Enter username or email" name="email" onChange={handleChange} />
          <input className="inputl" placeholder="Enter password" type="password" name="password" onChange={handleChange} /><br /><br />
          <u>Forgot Password?</u><br /><br />
        </div>
        <div className="buttonouter">
          <div className="buttondiv">
            <button className="finalbutton1" onClick={onClickEvent}>Continue</button>
            <button className="finalbutton1" onClick={() => navigate('/register')}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
