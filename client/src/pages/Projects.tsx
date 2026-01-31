import { useState } from 'react';
import { ProjectCard } from '../components/sections/ProjectCard';
import projectsData from '../data/projects.json';
import type { Project } from '../types';
import './Projects.css';

type CategoryFilter = 'all' | 'business-analysis' | 'development' | 'hybrid';

export const Projects = () => {
    const [filter, setFilter] = useState<CategoryFilter>('all');
    const projects = projectsData.projects as Project[];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    const filters: { value: CategoryFilter; label: string }[] = [
        { value: 'all', label: 'All Projects' },
        { value: 'hybrid', label: 'BA + Dev' },
        { value: 'business-analysis', label: 'Business Analysis' },
        { value: 'development', label: 'Development' },
    ];

    return (
        <main className="projects-page">
            <div className="section-container">
                <header className="projects-header">
                    <span className="section-tag">Portfolio</span>
                    <h1 className="section-title">My Projects</h1>
                    <p className="section-subtitle">
                        A collection of work showcasing both business analysis and development skills
                    </p>
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
