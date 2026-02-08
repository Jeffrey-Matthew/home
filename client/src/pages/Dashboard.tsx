import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useProjects } from '../hooks/useProjects';
import { ProjectForm } from '../components/admin/ProjectForm';
import { CategoryManager } from '../components/admin/CategoryManager';
import type { Project } from '../types';
import './Dashboard.css';

export const Dashboard = () => {
    const { user, logout } = useAuthContext();
    const { projects, loading, deleteProject } = useProjects();
    const [isEditing, setIsEditing] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
    const [activeTab, setActiveTab] = useState<'projects' | 'categories'>('projects');

    const totalProjects = projects.length;
    const featuredProjects = projects.filter(p => p.featured).length;

    const handleAddNew = () => {
        setEditingProject(undefined);
        setIsEditing(true);
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            await deleteProject(id);
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        setEditingProject(undefined);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingProject(undefined);
    };

    if (isEditing) {
        return (
            <main className="dashboard-page">
                <div className="section-container">
                    <ProjectForm
                        initialData={editingProject}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                </div>
            </main>
        );
    }

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

                {/* Tab Navigation */}
                <div className="dashboard-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-color)' }}>
                    <button
                        className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('projects')}
                        style={{
                            padding: 'var(--space-3) var(--space-4)',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === 'projects' ? '2px solid var(--primary-color)' : '2px solid transparent',
                            color: activeTab === 'projects' ? 'var(--primary-color)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            transition: 'all var(--transition-base)'
                        }}
                    >
                        Projects
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
                        onClick={() => setActiveTab('categories')}
                        style={{
                            padding: 'var(--space-3) var(--space-4)',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === 'categories' ? '2px solid var(--primary-color)' : '2px solid transparent',
                            color: activeTab === 'categories' ? 'var(--primary-color)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            transition: 'all var(--transition-base)'
                        }}
                    >
                        Categories
                    </button>
                </div>

                {activeTab === 'categories' ? (
                    <CategoryManager />
                ) : (
                    <div className="dashboard-grid">
                        <div className="dashboard-card">
                            <h3>📊 Quick Stats</h3>
                            <div className="stat-row">
                                <span className="stat-label">Total Projects</span>
                                <span className="stat-value">{loading ? '...' : totalProjects}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Featured</span>
                                <span className="stat-value">{loading ? '...' : featuredProjects}</span>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <h3>🚀 Quick Actions</h3>
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleAddNew}>
                                + Add New Project
                            </button>
                        </div>

                        <div className="dashboard-card full-width">
                            <h3>📝 Projects</h3>
                            {loading ? (
                                <p>Loading projects...</p>
                            ) : projects.length === 0 ? (
                                <p className="card-hint">No projects found. Add one to get started!</p>
                            ) : (
                                <div className="projects-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {projects.map(project => (
                                        <div key={project.id} className="project-item" style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '1rem',
                                            background: 'var(--bg-color)',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border-color)'
                                        }}>
                                            <div>
                                                <h4 style={{ margin: 0 }}>{project.title}</h4>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                    {project.category?.name || 'Uncategorized'}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    className="btn btn-secondary"
                                                    style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                                                    onClick={() => handleEdit(project)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-secondary"
                                                    style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', color: 'var(--error-color)', borderColor: 'var(--error-color)' }}
                                                    onClick={() => handleDelete(project.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main >
    );
};
