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
        return <div className="loading-page">Loading projects...</div>;
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
