import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext'; 
import '../../../assets/css/Others/VirtualTrainer/VirtualTrainer.css';
import axios from 'axios';

const VirtualTrainer = () => {
  const { user } = useAuth(); 
  const [trainers, setTrainers] = useState([]);
  const [currentTrainer, setCurrentTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trainerLoading, setTrainerLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchTrainers = async () => {
      if (user) {
        try {
          const response = await axios.get('http://localhost:8080/trainer/trainers');
          setTrainers(response.data);
        } catch (error) {
          console.error('Error fetching trainers:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    const fetchCurrentTrainer = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:8080/user/${user.id}/trainer`);
          setCurrentTrainer(response.data);
        } catch (error) {
          console.error('Error fetching current trainer:', error);
        } finally {
          setTrainerLoading(false);
        }
      }
    };

    fetchTrainers();
    fetchCurrentTrainer();
  }, [user]);

  const handleChooseTrainer = async (trainerId) => {
    setActionLoading(true);
    try {
      await axios.put(`http://localhost:8080/user/${user.id}/chooseTrainer/${trainerId}`);
      const response = await axios.get(`http://localhost:8080/user/${user.id}/trainer`);
      setCurrentTrainer(response.data);
    } catch (error) {
      console.error('Error choosing trainer:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnselectTrainer = async () => {
    setActionLoading(true);
    try {
      await axios.put(`http://localhost:8080/user/${user.id}/unselectTrainer`);
      setCurrentTrainer(null);
    } catch (error) {
      console.error('Error unselecting trainer:', error);
    } finally {
      setActionLoading(false);
    }
  };

  if (!user) {
    return <div className='errmsgtr'>Please log in as a user to choose a trainer.</div>;
  }

  if (loading || trainerLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Conditionally render the Available Trainers section */}
      {!currentTrainer && (
        <>
          <h1 id='adph1'>Available Trainers</h1>
          <div className="trainers-list">
            {trainers.map(trainer => (
              <div key={trainer.id} className="trainer-item">
                <img 
                  src={trainer.img_url || 'https://via.placeholder.com/200'} 
                  alt={`${trainer.name}`} 
                  className="trainer-image"
                />
                <h2>{trainer.name}</h2>
                <h6>{trainer.expertise}</h6>
                <p>{trainer.email}</p>
                <button 
                  className="choose-trainer-btn" 
                  onClick={() => handleChooseTrainer(trainer.id)}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Processing...' : 'Choose Trainer'}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* My Trainer Section */}
      <h1 id='adph1'>My Trainer</h1>
      {currentTrainer ? (
        <div className="current-trainer">
          <img 
            src={currentTrainer.img_url || 'https://via.placeholder.com/200'} 
            alt={`${currentTrainer.name}`} 
            className="trainer-image"
          />
          <h2>{currentTrainer.name}</h2>
          <h6>{currentTrainer.expertise}</h6>
          <p>{currentTrainer.email}</p>
          <button 
            className="choose-trainer-btn" 
            onClick={handleUnselectTrainer}
            disabled={actionLoading}
          >
            {actionLoading ? 'Processing...' : 'Unselect Trainer'}
          </button>
        </div>
      ) : (
        <div>You have not selected a trainer yet.</div>
      )}
    </div>
  );
};

export default VirtualTrainer;
