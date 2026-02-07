import './About.css';

export const About = () => {
    return (
        <section id="about" className="about">
            <div className="section-container">
                <div className="about-grid">
                    <div className="about-content">
                        <span className="section-tag">About Me</span>
                        <h2 className="section-title">
                            Where Business Meets Technology
                        </h2>

                        <div className="about-text">
                            <p>
                                By day, I'm a <strong>Business Analyst</strong> who thrives on understanding
                                complex problems, gathering requirements, and translating business needs into
                                actionable solutions.
                            </p>
                            <p>
                                By passion, I'm a <strong>Software Developer</strong> who loves turning ideas
                                into reality through clean, efficient code. This unique combination allows me
                                to see the full picture—from stakeholder needs to technical implementation.
                            </p>
                            <p>
                                I believe the best solutions come from understanding both sides of the equation.
                                Whether it's automating workflows, building dashboards, or architecting systems,
                                I bring both analytical rigor and hands-on development skills to every project.
                            </p>
                        </div>

                        <div className="about-highlights">
                            <div className="highlight-card">
                                <span className="highlight-icon">📊</span>
                                <div>
                                    <h4>Analytical Mindset</h4>
                                    <p>Data-driven decisions, process optimization</p>
                                </div>
                            </div>
                            <div className="highlight-card">
                                <span className="highlight-icon">💻</span>
                                <div>
                                    <h4>Technical Skills</h4>
                                    <p>Full-stack development, modern tools</p>
                                </div>
                            </div>
                            <div className="highlight-card">
                                <span className="highlight-icon">🤝</span>
                                <div>
                                    <h4>Bridge Builder</h4>
                                    <p>Stakeholder communication, team collaboration</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about-visual">
                        <div className="visual-card">
                            <div className="visual-header">
                                <div className="window-dots">
                                    <span></span><span></span><span></span>
                                </div>
                                <span className="visual-title">profile.json</span>
                            </div>
                            <div className="profile-image-container">
                                <img
                                    src="/profile.jpeg"
                                    alt="Jeffrey Matthew"
                                    className="profile-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
