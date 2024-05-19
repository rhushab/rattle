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
    history('/login');
    return null;
  }
  console.log(user.username);
  const handleSubmit = async (e) => {
    const newBlog = { title, content, author: user.username };
    await axios.post('http://localhost:5000/blog/create', newBlog, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };

  return (
    <div>
      <h1>Welcome, Create a blog</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
