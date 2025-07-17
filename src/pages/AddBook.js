import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    available: true,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook({ ...book, [name]: type === 'checkbox' ? checked : value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const token = localStorage.getItem('access');
  if (!token) {
    alert('Please log in first.');
    return;
  }

  axios.post('https://booklending.infinitysagax.net/api/books/add/', book, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(() => {
    alert('Book added successfully!');
    navigate('/');
  })
  .catch(err => {
    console.error(err);
    alert('Failed to add book. Make sure you are logged in.');
  });
};


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control"
            value={book.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input type="text" name="author" className="form-control"
            value={book.author} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input type="text" name="genre" className="form-control"
            value={book.genre} onChange={handleChange} required />
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input"
            name="available" checked={book.available} onChange={handleChange} />
          <label className="form-check-label">Available</label>
        </div>
        <button type="submit" className="btn btn-success">Add Book</button>
      </form>
    </div>
  );
}
