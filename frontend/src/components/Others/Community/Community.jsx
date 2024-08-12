import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../assets/css/Others/Community/Community.css';
import { useAuth } from '../../../context/AuthContext';

const CommunityPage = () => {
  const { userId } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState({ title: '', description: '' });
  const [acceptedChallenges, setAcceptedChallenges] = useState([]);
  const [activeSection, setActiveSection] = useState('postChallenges');

  useEffect(() => {
    fetchChallenges();
    fetchAcceptedChallenges(); // Fetch accepted challenges on component mount
  }, [userId]); // Dependency on userId to refetch when userId changes

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('http://localhost:8080/challenges');
      // Ensure the data is an array
      if (Array.isArray(response.data)) {
        setChallenges(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
        setChallenges([]);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
      setChallenges([]);
    }
  };

  const fetchAcceptedChallenges = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/challenges/user/${userId}`);
      // Ensure the data is an array
      if (Array.isArray(response.data)) {
        setAcceptedChallenges(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
        setAcceptedChallenges([]);
      }
    } catch (error) {
      console.error('Error fetching accepted challenges:', error);
      setAcceptedChallenges([]);
    }
  };

  const handlePostChallenge = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/challenges/userpost/${userId}`, 
        newChallenge, // Send JSON directly
        {
          headers: {
            'Content-Type': 'application/json' // Specify content type
          }
        }
      );
  
      if (response.data && response.data.id) {
        setChallenges([...challenges, response.data]);
        setNewChallenge({ title: '', description: '' });
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error posting challenge:', error.response ? error.response.data : error.message);
    }
  };

  const handleAcceptChallenge = async (challenge) => {
    try {
      const response = await axios.put(`http://localhost:8080/challenges/${challenge.id}/user/${userId}`);
      if (response.data && response.data.id) {
        fetchAcceptedChallenges(); // Refresh accepted challenges after accepting a new one
        setChallenges(challenges.map((c) =>
          c.id === challenge.id ? { ...c, acceptedBy: [...(c.acceptedBy || []), 'You'] } : c
        ));
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error accepting challenge:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="community-container">
      <h1>Community Challenges</h1>
      <div className="community-tabs">
        <button
          className={`community-tab ${activeSection === 'postChallenges' ? 'active' : ''}`}
          onClick={() => setActiveSection('postChallenges')}
        >
          Post & View Challenges
        </button>
        <button
          className={`community-tab ${activeSection === 'acceptedChallenges' ? 'active' : ''}`}
          onClick={() => setActiveSection('acceptedChallenges')}
        >
          Accepted Challenges
        </button>
      </div>

      {activeSection === 'postChallenges' && (
        <div className="community-post-section">
          <div className="community-input-container">
            <input
              type="text"
              value={newChallenge.title}
              onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
              placeholder="Title"
              className="community-input"
            />
            <textarea
              value={newChallenge.description}
              onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
              placeholder="Description"
              className="community-textarea"
            />
            <button onClick={handlePostChallenge} className="community-button community-button-post">
              Post Challenge
            </button>
          </div>
          <ul>
            {challenges.length > 0 ? (
              challenges.map((challenge) => (
                <li key={challenge.id} className="community-challenge-item">
                  <h2>{challenge.title}</h2>
                  <p>{challenge.description}</p>
                  <p>Accepted by: {challenge.acceptedBy ? challenge.acceptedBy.join(', ') : 'None'}</p>
                  <button onClick={() => handleAcceptChallenge(challenge)} className="community-button community-button-accept">
                    Accept Challenge
                  </button>
                </li>
              ))
            ) : (
              <p>No challenges available.</p>
            )}
          </ul>
        </div>
      )}

      {activeSection === 'acceptedChallenges' && (
        <div className="community-accepted-section">
          <ul>
            {acceptedChallenges.length > 0 ? (
              acceptedChallenges.map((challenge) => (
                <li key={challenge.id} className="community-accepted-item">
                  <h2>{challenge.title}</h2>
                  <p>{challenge.description}</p>
                </li>
              ))
            ) : (
              <p>No accepted challenges.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
