import './Skills.css';

const businessSkills = [
    { name: 'Requirements Gathering', level: 'expert' },
    { name: 'Process Mapping', level: 'expert' },
    { name: 'Stakeholder Management', level: 'advanced' },
    { name: 'Data Analysis', level: 'advanced' },
    { name: 'User Story Writing', level: 'expert' },
    { name: 'Agile/Scrum', level: 'advanced' },
    { name: 'SQL & Reporting', level: 'advanced' },
    { name: 'Business Process Improvement', level: 'expert' },
];

const techSkills = [
    { name: 'TypeScript', level: 'advanced' },
    { name: 'React', level: 'advanced' },
    { name: 'Node.js', level: 'intermediate' },
    { name: 'Python', level: 'advanced' },
    { name: 'SQL/PostgreSQL', level: 'advanced' },
    { name: 'Git', level: 'advanced' },
    { name: 'REST APIs', level: 'advanced' },
    { name: 'HTML/CSS', level: 'advanced' },
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
                    <span className="section-tag">Skills</span>
                    <h2 className="section-title">Tools of the Trade</h2>
                    <p className="section-subtitle">
                        A blend of business acumen and technical expertise
                    </p>
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

                <div className="skills-legend">
                    <span className="legend-item">
                        <span className="legend-dot" style={{ background: 'var(--accent-color)' }}></span>
                        Expert
                    </span>
                    <span className="legend-item">
                        <span className="legend-dot" style={{ background: 'var(--primary-color)' }}></span>
                        Advanced
                    </span>
                    <span className="legend-item">
                        <span className="legend-dot" style={{ background: 'var(--secondary-color)' }}></span>
                        Intermediate
                    </span>
                </div>
            </div>
        </section>
    );
};
