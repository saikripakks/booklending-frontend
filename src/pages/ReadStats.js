import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReadStats() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return;

    axios.get('https://booklending.kripzart.in/api/user/read-stats/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setBooks(res.data))
    .catch(err => console.error('Failed to fetch read stats:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3"> Books You've Read</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Times Read</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <tr key={idx}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.read_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
