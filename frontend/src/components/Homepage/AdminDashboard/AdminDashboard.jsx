import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import '../../../assets/css/Homepage/AdminDashboard/AdminDashboard.css';

const AdminDashboard = () => {
  const { admin } = useAuth();
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [newTrainer, setNewTrainer] = useState({ name: '', email: '', password: '', expertise: '', img_url: '' });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersAndTrainers = async () => {
      try {
        const [usersResponse, trainersResponse] = await Promise.all([
          axios.get('http://localhost:8080/user/users'),
          axios.get('http://localhost:8080/trainer/trainers'),
        ]);

        setUsers(usersResponse.data);
        setTrainers(trainersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (admin) {
      fetchUsersAndTrainers();
    }
  }, [admin]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTrainerChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/users', newUser, {
        headers: { 'Content-Type': 'application/json' },
      });
      setUsers((prevState) => [...prevState, response.data]);
      setNewUser({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Error adding user. Please try again.');
    }
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/trainers', newTrainer, {
        headers: { 'Content-Type': 'application/json' },
      });
      setTrainers((prevState) => [...prevState, response.data]);
      setNewTrainer({ name: '', email: '', password: '', expertise: '', img_url: '' });
    } catch (error) {
      console.error('Error adding trainer:', error);
      setError('Error adding trainer. Please try again.');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/user/${userId}`);
      setUsers((prevState) => prevState.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user. Please try again.');
    }
  };

  const handleDeleteTrainer = async (trainerId) => {
    try {
      await axios.delete(`http://localhost:8080/admin/trainers/${trainerId}`);
      setTrainers((prevState) => prevState.filter((trainer) => trainer.id !== trainerId));
    } catch (error) {
      console.error('Error deleting trainer:', error);
      setError('Error deleting trainer. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!admin) {
    return <div className="not-admin">Sign In as Admin</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`tab-button ${activeTab === 'trainers' ? 'active' : ''}`}
          onClick={() => setActiveTab('trainers')}
        >
          Trainers
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {activeTab === 'users' && (
        <div className="tab-content">
          <h2>Users</h2>
          <form onSubmit={handleAddUser} className="form">
            <input
              type="text"
              name="name"
              placeholder="User Name"
              value={newUser.name}
              onChange={handleUserChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="User Email"
              value={newUser.email}
              onChange={handleUserChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="User Password"
              value={newUser.password}
              onChange={handleUserChange}
              required
            />
            <button type="submit">Add User</button>
          </form>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="list-item">
                {user.name} ({user.email})
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'trainers' && (
        <div className="tab-content">
          <h2>Trainers</h2>
          <form onSubmit={handleAddTrainer} className="form">
            <input
              type="text"
              name="name"
              placeholder="Trainer Name"
              value={newTrainer.name}
              onChange={handleTrainerChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Trainer Email"
              value={newTrainer.email}
              onChange={handleTrainerChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Trainer Password"
              value={newTrainer.password}
              onChange={handleTrainerChange}
              required
            />
            <input
              type="text"
              name="expertise"
              placeholder="Expertise"
              value={newTrainer.expertise}
              onChange={handleTrainerChange}
            />
            <input
              type="text"
              name="img_url"
              placeholder="Image URL"
              value={newTrainer.img_url}
              onChange={handleTrainerChange}
            />
            <button type="submit">Add Trainer</button>
          </form>
          <ul>
            {trainers.map((trainer) => (
              <li key={trainer.id} className="list-item">
                {trainer.name} ({trainer.email}) - {trainer.expertise}
                <button onClick={() => handleDeleteTrainer(trainer.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
