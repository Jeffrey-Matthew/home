import type { Project } from '../../types';
import './ProjectCard.css';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'business-analysis': return 'Business Analysis';
            case 'development': return 'Development';
            case 'hybrid': return 'BA + Dev';
            default: return category;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'business-analysis': return 'var(--accent-color)';
            case 'development': return 'var(--primary-color)';
            case 'hybrid': return '#8b5cf6';
            default: return 'var(--text-muted)';
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

            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>

            {project.metrics && project.metrics.length > 0 && (
                <div className="project-metrics">
                    {project.metrics.map((metric, index) => (
                        <div key={index} className="metric">
                            <span className="metric-value">{metric.value}</span>
                            <span className="metric-label">{metric.label}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="project-tags">
                {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div>

            {project.links && (
                <div className="project-links">
                    {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
                            <span>⌘</span> Code
                        </a>
                    )}
                    {project.links.demo && (
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                            <span>◈</span> Demo
                        </a>
                    )}
                    {project.links.caseStudy && (
                        <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer" className="project-link">
                            <span>📄</span> Case Study
                        </a>
                    )}
                </div>
            )}
        </article>
    );
};
