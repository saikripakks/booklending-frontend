import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Borrowed() {
  const [borrowed, setBorrowed] = useState([]);

  useEffect(() => {
    axios.get('/api/borrowed/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    }).then(res => setBorrowed(res.data));
  }, []);
const returnBook = (borrowId) => {
  const token = localStorage.getItem('access');
  axios.post(`https://booklending.infinitysagax.net/api/return/${borrowId}/`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    alert(res.data.detail);
    // Refresh list
    setBorrowed(prev => prev.filter(b => b.id !== borrowId));
  })
  .catch(err => {
    console.error(err);
    alert(err.response?.data?.detail || "Failed to return book");
  });
};

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Borrowed Books</h1>
      <ul className="grid gap-4">
        {borrowed.map(entry => (
          <li key={entry.id} className="p-4 border rounded">
            <h2 className="font-semibold">{entry.book.title}</h2>
            <p>{entry.book.author}</p>
            <button
        className="mt-2  btn btn-primary"
        onClick={() => returnBook(entry.id)}
      >
        Return Book
      </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
