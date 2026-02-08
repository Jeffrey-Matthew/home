import { Link } from 'react-router-dom';
import type { Project, Category } from '../../types';
import './ProjectCard.css';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const getCategoryLabel = (category?: Category) => {
        if (!category) return 'Uncategorized';
        return category.name;
    };

    const getCategoryColor = (category?: Category) => {
        if (!category) return 'var(--text-muted)';

        // Fallback colors based on slug if needed
        switch (category.slug) {
            case 'business': return 'var(--accent-color)';
            case 'development': return 'var(--primary-color)';
            case 'hybrid': return '#8b5cf6';
            default: return 'var(--primary-color)'; // Default color for new categories
        }
    };

    return (
        <article className={`project-card ${project.featured ? 'featured' : ''}`}>
            <div className="project-header">
                <span
                    className="project-category"
                    style={{ '--category-color': getCategoryColor(project.category) } as React.CSSProperties}
                >
                    {getCategoryLabel(project.category)}
                </span>
                {project.featured && <span className="featured-badge">Featured</span>}
            </div>

            <Link to={`/projects/${project.id}`} className="project-title-link">
                <h3 className="project-title">{project.title}</h3>
            </Link>
            <p className="project-description">{project.description}</p>

            <div className="project-tags">
                {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div>

            <div className="project-links">
                {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link">
                        <span>⌘</span> Code
                    </a>
                )}
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        <span>◈</span> Live Demo
                    </a>
                )}
            </div>
        </article>
    );
};
