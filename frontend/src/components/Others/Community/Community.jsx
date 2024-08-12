import React, { useState } from 'react';
import '../../../assets/css/Others/Community/Community.css'
const CommunityPage = () => {
  const [challenges, setChallenges] = useState([
    { id: 1, title: 'Complete 10 push-ups in 1 minute', description: 'Get ready to sweat!', acceptedBy: [] },
    { id: 2, title: 'Run 5 kilometers in 30 minutes', description: 'Show us your endurance!', acceptedBy: [] },
  ]);

  const [newChallenge, setNewChallenge] = useState({ title: '', description: '' });
  const [acceptedChallenges, setAcceptedChallenges] = useState([]);
  const [activeSection, setActiveSection] = useState('postChallenges'); // State to control active section

  const handlePostChallenge = () => {
    setChallenges([...challenges, { id: challenges.length + 1, title: newChallenge.title, description: newChallenge.description, acceptedBy: [] }]);
    setNewChallenge({ title: '', description: '' });
  };

  const handleAcceptChallenge = (challenge) => {
    setAcceptedChallenges([...acceptedChallenges, challenge]);
    setChallenges(challenges.map((c) => c.id === challenge.id ? { ...c, acceptedBy: [...c.acceptedBy, 'You'] } : c));
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
            {challenges.map((challenge) => (
              <li key={challenge.id} className="community-challenge-item">
                <h2>{challenge.title}</h2>
                <p>{challenge.description}</p>
                <p>Accepted by: {challenge.acceptedBy.join(', ')}</p>
                <button onClick={() => handleAcceptChallenge(challenge)} className="community-button community-button-accept">
                  Accept Challenge
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeSection === 'acceptedChallenges' && (
        <div className="community-accepted-section">
          <ul>
            {acceptedChallenges.map((challenge) => (
              <li key={challenge.id} className="community-accepted-item">
                <h2>{challenge.title}</h2>
                <p>{challenge.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
