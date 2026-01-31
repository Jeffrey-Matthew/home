import { useAuthContext } from '../context/AuthContext';
import './Dashboard.css';

export const Dashboard = () => {
    const { user, logout } = useAuthContext();

    return (
        <main className="dashboard-page">
            <div className="section-container">
                <header className="dashboard-header">
                    <div className="user-info">
                        {user?.user_metadata?.avatar_url && (
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="Profile"
                                className="dashboard-avatar"
                            />
                        )}
                        <div>
                            <h1>Welcome back!</h1>
                            <p className="user-email">{user?.email}</p>
                        </div>
                    </div>
                    <button className="btn btn-secondary" onClick={logout}>
                        Sign Out
                    </button>
                </header>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>📊 Quick Stats</h3>
                        <div className="stat-row">
                            <span className="stat-label">Total Projects</span>
                            <span className="stat-value">4</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Featured</span>
                            <span className="stat-value">2</span>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>🚀 Quick Actions</h3>
                        <p className="card-hint">
                            Content management features coming soon!
                            You'll be able to add and edit projects directly from here.
                        </p>
                    </div>

                    <div className="dashboard-card full-width">
                        <h3>📝 Recent Activity</h3>
                        <p className="card-hint">
                            Activity tracking will be available in a future update.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};
