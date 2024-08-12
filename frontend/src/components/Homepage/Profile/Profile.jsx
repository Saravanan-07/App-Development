import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../../../assets/css/Homepage/Profile/Profile.css'; 

const Profile = () => {
  const { user } = useAuth();

 
  if (!user) {
    return (
      <div className="profile-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{user.username}'s Profile</h1>
      </div>
      <div className="profile-details">
        <div className="profile-detail">
          <label>Username:</label>
          <p>{user.username}</p>
        </div>
        <div className="profile-detail">
          <label>Email:</label>
          <p>{user.email}</p>
        </div>
        <div className="profile-detail">
          <label>Joined:</label>
          <p>{new Date(user.joined).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="profile-actions">
        <button className="edit-profile-button">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
