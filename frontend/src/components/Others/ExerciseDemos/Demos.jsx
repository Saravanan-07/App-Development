import React, { useState, useEffect } from 'react';
import "../../../assets/css/Others/ExerciseDemos/Demos.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';  

const API_URL_GET = 'http://localhost:8080/user/exerciseVideos';
const API_URL_POST_DELETE = 'http://localhost:8080/admin/exerciseVideos';

const Demos = () => {
  const { admin } = useAuth();  
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL_GET);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!admin) {
      return;
    }
    console.log(`Deleting video with ID: ${id}`); // Log the ID for debugging
    try {
      const response = await fetch(`${API_URL_POST_DELETE}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorMessage = await response.text(); // Capture error message from response
        throw new Error(`Network response was not ok: ${errorMessage}`);
      }
      setVideos(videos.filter(video => video.id !== id));
    } catch (error) {
      console.error('Error deleting video', error);
    }
  };
  
  

  const handleAdd = async () => {
    if (!admin) {
      return;
    }

    const newVideo = {
      name,
      description,
      video_url: videoUrl,
    };

    try {
      const response = await fetch(API_URL_POST_DELETE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVideo),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVideos([...videos, data]);
      setName('');
      setDescription('');
      setVideoUrl('');
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding video', error);
    }
  };

  return (
    <div className="outermost">
      <div className="header-main">
        <div className="header-list demo-navbar">
          <ul>
            <li><Link to='/home' id="Link">Back</Link></li>
          </ul>
        </div>
      </div>
      <div className='outer'>
        {admin && (
          <button onClick={() => setIsFormVisible(!isFormVisible)} className='add-card-btn'>
            {isFormVisible ? 'Cancel' : 'Add Card'}
          </button>
        )}
        {isFormVisible && admin && (
          <div className='form-container'>
            <h2>Add New Demo</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
              <label>
                Video URL:
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className='form-submit-btn'>Add Demo</button>
            </form>
          </div>
        )}
        {videos.map(video => (
          <div key={video.id} className='card-container'>
            <iframe className='card-img' width="560" height="315" src={video.video_url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3 className='card-title'>{video.name}</h3>
            <p className='card-description'>{video.description}</p>
            {admin && (
              <button onClick={() => handleDelete(video.id)} className='card-btn'>Delete</button>
            )}
          </div>
        ))}
      </div>
      <div className="contentbox footer">
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
    </div>
  );
};

export default Demos;
