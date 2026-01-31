import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const AdminLogin = () => {
    const { login, user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="section-container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Admin Access</h1>
                <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
                    Restricted area. Please sign in to continue.
                </p>
                <button className="btn btn-primary" onClick={login}>
                    Sign In with Google
                </button>
            </div>
        </div>
    );
};
