import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import type { Project } from '../types';
import './ProjectDetails.css';

export const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                if (!id) return;

                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id, navigate]);

    if (loading) {
        return <div className="loading-page">Loading...</div>;
    }

    if (!project) {
        return null;
    }

    return (
        <main className="project-details-page">
            <div className="section-container">
                <Link to="/projects" className="back-link">
                    ← Back to Projects
                </Link>

                <article className="project-details-content">
                    <header className="project-details-header">
                        <div className="project-meta-top">
                            <span className={`project-category-badge ${project.category}`}>
                                {project.category}
                            </span>
                            {project.featured && <span className="featured-badge">Featured</span>}
                        </div>

                        <h1 className="project-title-large">{project.title}</h1>

                        <div className="project-tags-large">
                            {project.tags.map(tag => (
                                <span key={tag} className="tag-large">{tag}</span>
                            ))}
                        </div>
                    </header>

                    <div className="project-image-container">
                        <img src={project.image_url} alt={project.title} className="project-hero-image" />
                    </div>

                    <div className="project-body">
                        <div className="project-description-section">
                            <h2>About this Project</h2>
                            <p className="project-description-text">{project.description}</p>
                        </div>

                        <div className="project-links-section">
                            <h3>Project Links</h3>
                            <div className="links-grid">
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                        Visit Live Site ↗
                                    </a>
                                )}
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                        View Code ⌘
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
};
