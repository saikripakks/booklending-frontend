import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('access');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (isLoggedIn && token) {
            axios.get('https://booklending.kripzart.in/api/auth/me/', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => setEmail(res.data.email))
            .catch(err => console.error('Failed to fetch user info', err));
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('access');
        navigate('/login');
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <span className="fw-bold">BookLend</span>
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={toggleMobileMenu}
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><Link className="nav-link" to="/" onClick={() => setMobileMenuOpen(false)}>Books</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/recommend" onClick={() => setMobileMenuOpen(false)}>Recommend</Link></li>
                        {isLoggedIn && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/borrowed" onClick={() => setMobileMenuOpen(false)}>My Borrowed</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/add-book" onClick={() => setMobileMenuOpen(false)}>Add Book</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/user/read-stats/" onClick={() => setMobileMenuOpen(false)}>Read Statistics</Link></li>
                            </>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-3 text-white">
                        {isLoggedIn && email && (
                            <span className="me-2 small">📧 {email}</span>
                        )}
                        {isLoggedIn ? (
                            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
                                <Link className="btn btn-outline-light btn-sm ms-2" to="/register">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
