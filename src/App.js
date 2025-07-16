// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import Recommend from './pages/Recommend';
import Borrowed from './pages/Borrowed';
import AddBook from './pages/AddBook';
import ReadStats from './pages/ReadStats';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/borrowed" element={<Borrowed />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/user/read-stats/" element={<ReadStats />} />
      </Routes>
    </Router>
  );
}
