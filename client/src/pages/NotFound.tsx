import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="section-container" style={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 'var(--space-6)'
        }}>
            <h1 style={{
                fontSize: 'clamp(3rem, 10vw, 6rem)',
                color: 'var(--primary-color)',
                lineHeight: 1,
                margin: 0
            }}>
                404
            </h1>
            <div>
                <h2 style={{ marginBottom: 'var(--space-2)' }}>Page Not Found</h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
                    The page you're looking for doesn't exist or has been moved.
                </p>
            </div>
            <Link to="/" className="btn btn-primary">
                Return Home
            </Link>
        </div>
    );
};
