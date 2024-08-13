import React, { useState } from 'react';
import '../../assets/css/Homepage/Homepage.css';
import imgpw from '../../assets/images/Homepage/personalisedworkouts.jpg'
import imged from '../../assets/images/Homepage/Exercisedemos.png'
import imgnd from '../../assets/images/Homepage/Nutritionanddiet.jpeg'
import imgvt from '../../assets/images/Homepage/virtualtrainer.png'
import imgpg from '../../assets/images/Homepage/personalgoals.jpeg'
import imgcc from '../../assets/images/Homepage/commmmunity.jpeg'
import pabtg1 from '../../assets/images/Homepage/scheduleabt.jpeg'
import pabtg2 from '../../assets/images/Homepage/videoai.jpeg'
import pabtg3 from '../../assets/images/Homepage/Nutritionanddiet.jpeg'
import pabtg4 from '../../assets/images/Homepage/vtaiii.jpeg'
import pabtg5 from '../../assets/images/Homepage/pgoals.png'
import pabtg6 from '../../assets/images/Homepage/commuai.jpeg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Homepage = () => {
  const navigate = useNavigate();
  const { user, admin, logout } = useAuth();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "98a4795c-7c31-42ea-8431-326bd737761b");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      alert('Form Submitted Successfully');
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutPopup(false);
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };


  return (
    <div>
      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <button className="popup-button confirm" onClick={handleConfirmLogout}>Yes</button>
            <button className="popup-button cancel" onClick={handleCancelLogout}>No</button>
          </div>
        </div>
      )}
      
      <div className={`homepage-content ${showLogoutPopup ? 'blurred' : ''}`}>
        <div className="header-main">
           <div className="header-list">
            <div className='navbarrrrr'><ul>
              <li><a href='#aboutpage' id="Link">About</a></li>
              <li><a href='#cont' id="Link">Contact</a></li>
              <li><a href='#serv2' id="Link">Services</a></li>
              {user || admin ? (
                <>
                  {admin && <li><Link to='/AdminDashboard' id="Link">Admin Dashboard</Link></li>}
                  {admin && <li><Link to='/workouts' id="Link">Add Workouts</Link></li>}
                  {admin && <li><Link to='/demos' id="Link">Add Demo Videos</Link></li>}
                  {/*{user && <li><Link to='/Profile' id="Link">Profile</Link></li>}*/}
                  <li><Link id="Link" onClick={handleLogoutClick}>Logout</Link></li>
                </>
              ) : (
                <>
                  <li><Link to='/login' id="Link" className='login_btn'>Login</Link></li>
                  <li><Link to='/register' id="Link" className='signup_btn'>Sign Up</Link></li>
                </>
              )}
            </ul>
            </div>
          </div> 
           
          <div className="contentbox wwe">
            <div className="contentbox-one-11">
              <h1>Take Control of Your <br /> Fitness Journey</h1>
              <p>FitTrack is your personal fitness companion, helping you
                achieve your goals through personalized workout plans, Setting personal goals,
                Nutrition and diet plans, and expert guidance.</p>
              {user || admin ? (
                <>
                  <h3>Welcome, {user ? user.username : admin.name}</h3>
                </>
              ) : (
                <div className='login_and_signup'>
                  <button className='blk-button top-btn' onClick={() => { navigate('/register') }}>Join</button>
                  <button className='wht-button top-btn' onClick={() => { navigate('/login') }}>Login</button>
                </div>
              )}
            </div>
          </div>


{/* <div className="contentboxm">
    <div className="contentbox-one-1 box2" id='serv'>
    <h1>Unlock Your Fitness Potential</h1>
    <div className="maincls">
            <div className="bdy">
            <div className="cardarea">
            <div className="wrapperr">
            <div className="boxxarea">
            <div className="boxxx">
            <img src={imgpw} alt="" className='boxxximg' style={{height:'380px',width:'400px'}}/>
                                <div className="overlayyy">
                                    <h3 className='overlayyhh'>Personalized Workouts</h3>
                                    <button onClick={() => { navigate('/workouts') }} className='overlayybtt'>View</button>
                                </div>
                                </div>
                            <div className="boxxx">
                            <img src={imged} alt="" className='boxxximg' style={{height:'380px',width:'400px'}}/>
                            <div className="overlayyy">
                            <h3 className='overlayyhh'>Exercise Demos</h3>
                            <button onClick={() => { navigate('/demos') }} className='overlayybtt'>View</button>
                            </div>
                            </div>
                            <div className="boxxx">
                            <img src={imgnd} alt="" className='boxxximg' style={{height:'380px',width:'400px'}}/>
                                <div className="overlayyy">
                                <h3 className='overlayyhh'>Nutrition and diet</h3>
                                    <button onClick={() => { navigate('/nutrients') }} className='overlayybtt'>View</button>
                                </div>
                            </div>
                            <div className="boxxx">
                            <img src={imgvt} alt="" className='boxxximg' style={{height:'380px',width:'400px'}}/>
                                <div className="overlayyy">
                                <h3 className='overlayyhh'>Virtual Trainer</h3>
                                    <button onClick={() => { navigate('/virtualtrainer') }} className='overlayybtt'>View</button>
                                    </div>
                                    </div>
                            <div className="boxxx">
                            <img src={imgpg} alt="" className='boxxximg' style={{height:'380px',width:'400px'}}/>
                            <div className="overlayyy">
                                    <h3 className='overlayyhh'>Goal Setting</h3>
                                    <button onClick={() => { navigate('/goals') }} className='overlayybtt'>View</button>
                                </div>
                                </div>
                            <div className="boxxx">
                            <img src={imgcc} alt="" className='boxxximg' style={{height:'380px',width:'400px'}}/>
                            <div className="overlayyy">
                            <h3 className='overlayyhh'>Community</h3>
                            <button onClick={() => { navigate('/community') }} className='overlayybtt'>View</button>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
        </div>
        </div> 
</div> */}

<section class="intro" id='aboutpage'>
        <h2>Welcome to Our Fitness Hub</h2>
        <p>Discover our comprehensive suite of fitness services designed to help you achieve your personal health and wellness goals. From customized workout plans to expert nutritional advice, our platform is dedicated to supporting your fitness journey.</p>
        <h3>Our services include</h3>
    </section>
       
<section class="feaatures" id='serv2'> 
        <div class="feaature" onClick={()=>{navigate('/workouts')}}>
            <div class="icoon">
                <img src={pabtg1}  alt="Customised Workout Plans"/>
            </div>
            <h3 className='feeh3'>Customised Workout Schedule</h3>
            <p className='feep'>A customized exercise schedule will take your schedule and your requirements into account and work around those issues.</p>
        </div>
        <div class="feaature" onClick={()=>{navigate('/demos')}}>
            <div class="icoon">
                <img src={pabtg2}  alt="Exercise demos"/>
            </div>
            <h3 className='feeh3'>Exercise demos</h3>
            <p className='feep'> This page provides a series of video tutorials that illustrate different types of workouts for user reference.</p>
        </div>
        <div class="feaature" onClick={()=>{navigate('/nutrients')}}>
            <div class="icoon">
                <img src={pabtg3}  alt="Nutrition Guidance"/>
            </div>
            <h3 className='feeh3'>Nutrition Guidance</h3>
            <p className='feep'>Our experts provide comprehensive nutrition advice to help you fuel your body and achieve your fitness goals.</p>
        </div>
        <div class="feaature" onClick={()=>{navigate('/virtualtrainer')}}>
            <div class="icoon">
                <img src={pabtg4} alt="Experienced Trainers"/>
            </div>
            <h3 className='feeh3'>Experienced Trainers</h3>
            <p className='feep'>Our team of certified trainers are dedicated to helping you achieve your fitness objectives through personalized guidance and support.</p>
        </div>
        <div class="feaature" onClick={()=>{navigate('/goals')}}>
            <div class="icoon">
                <img src={pabtg5} alt="Set personal goals"/>
            </div>
            <h3 className='feeh3'>Set your personal goals</h3>
            <p className='feep'>Goal setting involves the development of an action plan designed in order to motivate and guide a person or group toward a goal.</p>
        </div>
        <div class="feaature" onClick={()=>{navigate('/community')}}>
            <div class="icoon">
                <img src={pabtg6} alt="Welcoming Community"/>
            </div>
            <h3 className='feeh3'>Welcoming Community</h3>
            <p className='feep'>Join our vibrant community of fitness enthusiasts and find the motivation and camaraderie you need to push yourself further.</p>
        </div>
    </section>

        {/* <div className="contentboxxxx dummy">
          <div className="dummyimg">
            <div className="imginsidedummy"></div>
            <h1>Your mind is your strongest muscle.</h1>     
          </div>
        </div> */}



        <div className="contentboxxxx dummy">
          <div className="dummyimg">
            <div className="imginsidedummy2"></div>
            <h1>The secret of getting ahead is getting started.</h1> 
          </div>
        </div>


<div className='bboody' id='cont'>
<div className="contact-form-container">
  <h1 className="contact-form-title">Get in Touch</h1>
  <p className="contact-form-subtitle">
    Have a question or want to work together? Fill out the form below and we'll get back to you as soon as possible.
  </p>

<form className="contact-form" onSubmit={onSubmit}>
  <div className="form-group">
    <label htmlFor="name" className='lbl'>Name</label>
    <input type="text" id="name" name="name" placeholder="Enter your name" />
  </div>
  <div className="form-group">
    <label htmlFor="mobile" className='lbl'>Mobile.no</label>
    <input type="text" id="number" name="mobile" placeholder="Enter your mobile no" />
  </div>
  <div className="form-group">
    <label htmlFor="message" className='lbl'>Message</label>
    <textarea id="message" name="message" placeholder="Enter your message"></textarea>
  </div>
  <button type="submit" className="contact-form-submit">
    Submit
  </button>
</form>
</div>
</div>



          <div className="contentboxxxx footer">
            <ul>
              <li><h1>VEST ARMOUR</h1></li>
              <li>© 2024 Vest Armour®, Inc. All rights reserved</li>
              <li>Privacy Policy  /</li>
              <li>Terms of use  /</li>
              <li>Cookie Policy  /</li>
              <li>Manage Your Content /</li>
              <li>AdChoices</li>
            </ul>
          </div>
          <div className="contentbox footer">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
