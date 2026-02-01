import type { Skill } from '../../types';
import './Skills.css';

const businessSkills: Skill[] = [
    { name: 'Requirements Gathering', level: 'expert', category: 'business' },
    { name: 'Process Mapping', level: 'expert', category: 'business' },
    { name: 'Stakeholder Management', level: 'advanced', category: 'business' },
    { name: 'Data Analysis', level: 'advanced', category: 'business' },
    { name: 'User Story Writing', level: 'expert', category: 'business' },
    { name: 'Agile/Scrum', level: 'advanced', category: 'business' },
    { name: 'SQL & Reporting', level: 'advanced', category: 'business' },
    { name: 'Business Process Improvement', level: 'expert', category: 'business' },
];

const techSkills: Skill[] = [
    { name: 'TypeScript', level: 'advanced', category: 'technical' },
    { name: 'React', level: 'advanced', category: 'technical' },
    { name: 'Node.js', level: 'intermediate', category: 'technical' },
    { name: 'Python', level: 'advanced', category: 'technical' },
    { name: 'SQL/PostgreSQL', level: 'advanced', category: 'technical' },
    { name: 'Git', level: 'advanced', category: 'technical' },
    { name: 'REST APIs', level: 'advanced', category: 'technical' },
    { name: 'HTML/CSS', level: 'advanced', category: 'technical' },
];

const getLevelColor = (level: string) => {
    switch (level) {
        case 'expert': return 'var(--accent-color)';
        case 'advanced': return 'var(--primary-color)';
        case 'intermediate': return 'var(--secondary-color)';
        default: return 'var(--text-muted)';
    }
};

export const Skills = () => {
    return (
        <section className="skills">
            <div className="section-container">
                <div className="skills-header">
                    <h2 className="section-title">Tools of the Trade</h2>
                </div>

                <div className="skills-grid">
                    <div className="skills-category">
                        <div className="category-header">
                            <span className="category-icon">📊</span>
                            <h3>Business Analysis</h3>
                        </div>
                        <div className="skills-list">
                            {businessSkills.map(skill => (
                                <div
                                    key={skill.name}
                                    className="skill-tag"
                                    style={{ '--skill-color': getLevelColor(skill.level) } as React.CSSProperties}
                                >
                                    <span className="skill-name">{skill.name}</span>
                                    <span className="skill-level">{skill.level}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="skills-category">
                        <div className="category-header">
                            <span className="category-icon">⚡</span>
                            <h3>Development</h3>
                        </div>
                        <div className="skills-list">
                            {techSkills.map(skill => (
                                <div
                                    key={skill.name}
                                    className="skill-tag"
                                    style={{ '--skill-color': getLevelColor(skill.level) } as React.CSSProperties}
                                >
                                    <span className="skill-name">{skill.name}</span>
                                    <span className="skill-level">{skill.level}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
