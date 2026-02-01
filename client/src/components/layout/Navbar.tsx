import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import './Navbar.css';

export const Navbar = () => {
    const { user, logout } = useAuthContext();
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
                    <img src="/logo.png" alt="Jeffrey Matthew" className="brand-logo" />
                    <span className="brand-text">Jeffrey Matthew</span>
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

                    <div className="nav-actions">
                        <ThemeToggle />

                        <div className="nav-auth">
                            {user && (
                                <div className="user-menu">
                                    <img
                                        src={user.user_metadata?.avatar_url || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23374151"/><text x="50" y="55" font-size="40" fill="%23fff" text-anchor="middle" dominant-baseline="middle">👤</text></svg>'}
                                        alt="Profile"
                                        className="user-avatar"
                                    />
                                    <button className="btn btn-secondary" onClick={logout}>
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
