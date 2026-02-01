import { useState } from 'react';
import { ProjectCard } from '../components/sections/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import './Projects.css';

type CategoryFilter = 'all' | 'business' | 'development' | 'hybrid';

export const Projects = () => {
    const [filter, setFilter] = useState<CategoryFilter>('all');
    const { projects, loading } = useProjects();

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    const filters: { value: CategoryFilter; label: string }[] = [
        { value: 'all', label: 'All Projects' },
        { value: 'hybrid', label: 'BA + Dev' },
        { value: 'business', label: 'Business Analysis' },
        { value: 'development', label: 'Development' },
    ];

    if (loading) {
        return <div className="loading-page">Loading projects...</div>;
    }

    return (
        <main className="projects-page">
            <div className="section-container">
                <header className="projects-header">
                </header>

                <div className="projects-filters">
                    {filters.map(({ value, label }) => (
                        <button
                            key={value}
                            className={`filter-btn ${filter === value ? 'active' : ''}`}
                            onClick={() => setFilter(value)}
                        >
                            {label}
                        </button>
                    ))}
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
