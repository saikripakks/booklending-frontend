import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Recommend() {
  const [books, setBooks] = useState([]);

useEffect(() => {
  const token = localStorage.getItem('access');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  axios.get('https://booklending.infinitysagax.net/api/recommend/', config)
    .then(res => setBooks(res.data))
    .catch(err => {
      console.error('Failed to load recommendations', err);
      setBooks([]);
    });
}, []);


  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Recommended Books</h1>
      <ul className="grid gap-4">
        {books.map(book => (
          <li key={book.id} className="p-4 border rounded">
            <h2 className="font-semibold">{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.genre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
