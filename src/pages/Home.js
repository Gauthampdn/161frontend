import React, { useState, useEffect } from 'react';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');

  // Fetch all notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND}/note`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent with the request if needed for authentication
        mode: 'cors', // Ensure CORS policy is handled correctly
      });
      const data = await response.json();
      if (response.ok) {
        setNotes(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BACKEND}/note/make`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent with the request if needed for authentication
        mode: 'cors', // Ensure CORS policy is handled correctly
        body: JSON.stringify({ title, description, color }),
      });
      const data = await response.json();
      if (response.ok) {
        setNotes([data, ...notes]);
        setTitle('');
        setDescription('');
        setColor('');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>Create Note</h2>
        <form onSubmit={createNote}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Color:</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <button type="submit">Create Note</button>
        </form>
      </div>
      <div style={{ flex: 2, padding: '20px' }}>
        <h2>Notes</h2>
        {notes.map((note) => (
          <div key={note._id} style={{ marginBottom: '20px', padding: '10px', backgroundColor: note.color || '#f5f5f5' }}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <small>Last updated: {new Date(note.updatedAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
