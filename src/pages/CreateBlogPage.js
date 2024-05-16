import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export const CreateBlogPage = () => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const history = useNavigate();

  if (!user) {
    history.push('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = { title, content, author: user.name };
    await axios.post('localhost:5000/api/blogs', newBlog, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    history.push('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            value={title}
            onClick={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <input
            value={title}
            onClick={(e) => setContent(e.target.value)}
            required
          />
        </label>
      </form>
    </div>
  );
};
