import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import './Navbar.css';

export const Navbar = () => {
    const { user, login, logout, loading } = useAuthContext();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/projects', label: 'Projects' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">◆</span>
                    <span className="brand-text">Portfolio</span>
                </Link>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
                </button>

                <div className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-links">
                        {navLinks.map(({ path, label }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    className={`nav-link ${isActive(path) ? 'active' : ''}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                        {user && (
                            <li>
                                <Link
                                    to="/dashboard"
                                    className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>

                    <div className="nav-auth">
                        {loading ? (
                            <span className="auth-loading">...</span>
                        ) : user ? (
                            <div className="user-menu">
                                <img
                                    src={user.user_metadata?.avatar_url || '/default-avatar.png'}
                                    alt="Profile"
                                    className="user-avatar"
                                />
                                <button className="btn btn-secondary" onClick={logout}>
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button className="btn btn-primary" onClick={login}>
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
