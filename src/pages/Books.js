import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    genre: '',
    author: '',
    available: false
  });
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Fetch genres and authors for filter options
  useEffect(() => {
    axios.get('/api/books/genres/')
      .then(res => setGenres(res.data))
      .catch(err => console.error('Genre fetch failed:', err));

    axios.get('/api/books/authors/')
      .then(res => setAuthors(res.data))
      .catch(err => console.error('Authors fetch failed:', err));
  }, []);

  // Fetch books whenever `page` or filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.append('page', page);
    
    if (filters.genre) params.append('genre', filters.genre);
    if (filters.author) params.append('author', filters.author);
    if (filters.available) params.append('available', 'true');

    axios.get(`/api/books/?${params.toString()}`)
      .then(res => {
        const bookList = res.data.results || res.data;
        setBooks(bookList);
      })
      .catch(err => {
        console.error('Book fetch failed:', err);
        setBooks([]);
      });
  }, [page, filters]);

  // Borrow Book Handler
  const borrowBook = (bookId) => {
    const token = localStorage.getItem('access');
    if (!token) {
      alert("Please login first.");
      return;
    }

    axios.post(`https://booklending.infinitysagax.net/api/books/borrow/${bookId}/`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        alert(res.data.detail);
        // Refresh books after borrowing to update availability
        setPage(p => p); // This will trigger useEffect to refetch
      })
      .catch(err => {
        console.error('Borrow error:', err);
        alert(err.response?.data?.detail || 'Failed to borrow book.');
      });
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setFilters({
      genre: '',
      author: '',
      available: false
    });
    setPage(1);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Books</h1>

      {/* Filter Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Filters</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="genre" className="form-label">Genre</label>
              <select 
                id="genre" 
                name="genre" 
                className="form-select"
                value={filters.genre}
                onChange={handleFilterChange}
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="author" className="form-label">Author</label>
              <select 
                id="author" 
                name="author" 
                className="form-select"
                value={filters.author}
                onChange={handleFilterChange}
              >
                <option value="">All Authors</option>
                {authors.map(author => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  className="form-check-input"
                  checked={filters.available}
                  onChange={handleFilterChange}
                />
                <label htmlFor="available" className="form-check-label">
                  Available Only
                </label>
              </div>
            </div>
            <div className="col-12">
              <button 
                className="btn btn-outline-secondary"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Book Grid */}
      <div className="row">
        {books.map(book => (
          <div key={book.id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text mb-1"><strong>Author:</strong> {book.author}</p>
                <p className="card-text mb-1"><strong>Genre:</strong> {book.genre}</p>
                <p className="card-text mb-3">
                  <strong>Status:</strong> 
                  <span className={book.available ? 'text-success' : 'text-danger'}>
                    {book.available ? ' Available' : ' Borrowed'}
                  </span>
                </p>
                <button
                  className="btn btn-sm btn-success mt-auto"
                  onClick={() => borrowBook(book.id)}
                  disabled={!book.available}
                >
                  {book.available ? 'Borrow' : 'Unavailable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 d-flex justify-content-center gap-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ⬅ Prev
        </button>
        <span className="mx-2 align-self-center">Page {page}</span>
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage(p => p + 1)}
          disabled={books.length === 0}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}