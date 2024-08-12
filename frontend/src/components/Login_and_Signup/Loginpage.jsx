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
//         axios.get('http://localhost:8080/user/users'),
//         axios.get('http://localhost:8080/admin/admins')
//       ]);

//       return { users: userResponse.data, admins: adminResponse.data };
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setErrormsg('Error fetching user or admin data');
//       return { users: [], admins: [] };
//     }
//   };

//   const validateCredentials = async () => {
//     const { users, admins } = await fetchUserData();
//     const user = users.find(user => user.email === input.email && user.password === input.password);
//     const admin = admins.find(admin => admin.email === input.email && admin.password === input.password);

//     if (user) {
//       loginUser(user);
//       console.log(user.id);
//       navigate('/');
//     } else if (admin) {
//       loginAdmin(admin);
//       navigate('/');
//     } else {
//       setErrormsg('Invalid email or password');
//     }
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
//           <u>forgot your password?</u><br /><br />
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
//       const [userResponse, adminResponse] = await Promise.all([
//         axios.get('http://localhost:8080/user/users'),
//         axios.get('http://localhost:8080/admin/admins')
//       ]);

//       return { users: userResponse.data, admins: adminResponse.data };
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setErrormsg('Error fetching user or admin data');
//       return { users: [], admins: [] };
//     }
//   };

//   const validateCredentials = async () => {
//     const { users, admins } = await fetchUserData();
//     const user = users.find(user => user.email === input.email && user.password === input.password);
//     const admin = admins.find(admin => admin.email === input.email && admin.password === input.password);

//     if (user) {
//       loginUser(user); // This will now set the userId in the context
//       navigate('/');
//     } else if (admin) {
//       loginAdmin(admin);
//       navigate('/');
//     } else {
//       setErrormsg('Invalid email or password');
//     }
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
//           <u>forgot your password?</u><br /><br />
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
  const { loginUser, loginAdmin} = useAuth();

  const [input, setInput] = useState({ email: '', password: '' });
  const [errormsg, setErrormsg] = useState('');

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fetchUserData = async () => {
    try {
      const [userResponse, adminResponse] = await Promise.all([
        axios.get('http://localhost:8080/user/users'),
        axios.get('http://localhost:8080/admin/admins'),
      ]);

      return { users: userResponse.data, admins: adminResponse.data};
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrormsg('Error fetching user, admin, or trainer data');
      return { users: [], admins: []};
    }
  };

  const validateCredentials = async () => {
    const { users, admins} = await fetchUserData();
    const user = users.find(user => user.email === input.email && user.password === input.password);
    const admin = admins.find(admin => admin.email === input.email && admin.password === input.password);
    if (user) {
      loginUser(user);
      navigate('/');
    } else if (admin) {
      loginAdmin(admin);
      navigate('/');
    }
    else {
      setErrormsg('Invalid email or password');
    }
  };

  const onClickEvent = async (e) => {
    e.preventDefault();
    if (!emailvalidator(input.email)) {
      setErrormsg('Enter a valid email id');
    } else if (!passwordvalidator(input.password)) {
      setErrormsg('Enter a valid password');
    } else {
      await validateCredentials();
    }
  };

  return (
    <div>
      <div className="login_container">
        <h1 className="ltext">Sign in to app</h1>
        <div className="inputdiv">
          {errormsg.length > 0 && (<div style={{ backgroundColor: 'black', color: 'red' }}>{errormsg}</div>)}<br />
          <input className="inputl" placeholder="Enter email" name="email" onChange={handleChange} />
          <input className="inputl" placeholder="Enter password" type="password" name="password" onChange={handleChange} /><br /><br />
          <u>forgot your password?</u><br /><br />
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
