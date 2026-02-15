import { useState } from 'react';
import { ProjectCard } from '../components/sections/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { useCategories } from '../hooks/useCategories';
import './Projects.css';



export const Projects = () => {
    const [filter, setFilter] = useState<string>('all');
    const { projects, loading } = useProjects();
    const { categories, loading: categoriesLoading } = useCategories();

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category_id === filter);

    if (loading) {
        return (
            <main className="projects-page">
                <div className="section-container">
                    <header className="projects-header">
                        <div className="skeleton skeleton-title" style={{ margin: '0 auto var(--space-4)' }}></div>
                        <div className="skeleton skeleton-line medium" style={{ margin: '0 auto' }}></div>
                    </header>
                    <div className="projects-filters">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="skeleton skeleton-badge"></div>
                        ))}
                    </div>
                    <div className="projects-grid">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="skeleton-card">
                                <div className="skeleton skeleton-badge"></div>
                                <div className="skeleton skeleton-title"></div>
                                <div className="skeleton skeleton-line full"></div>
                                <div className="skeleton skeleton-line medium"></div>
                                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                                    <div className="skeleton skeleton-badge"></div>
                                    <div className="skeleton skeleton-badge"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="projects-page">
            <div className="section-container">
                <header className="projects-header">
                    <h1 className="section-title">My Projects</h1>
                    <p className="section-subtitle">
                        A collection of work showcasing both business analysis and development skills
                    </p>
                </header>

                <div className="projects-filters">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Projects
                    </button>
                    {categoriesLoading ? (
                        <span style={{ color: 'var(--text-muted)' }}>Loading categories...</span>
                    ) : (
                        categories.map(category => (
                            <button
                                key={category.id}
                                className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                                onClick={() => setFilter(category.id)}
                            >
                                {category.name}
                            </button>
                        ))
                    )}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <p className="no-projects">No projects found in this category.</p>
                )}
            </div>
        </main>
    );
};
