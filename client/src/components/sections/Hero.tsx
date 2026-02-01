import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="hero-content">
                <h1 className="hero-title">
                    <span className="title-line">Business Analyst</span>
                    <span className="title-divider">×</span>
                    <span className="title-line highlight">Software Developer</span>
                </h1>

                <p className="hero-subtitle">
                    Bridging the gap between business needs and technical solutions.
                    I analyze problems with a business mindset and solve them with code.
                </p>

                <div className="hero-cta">
                    <Link to="/projects" className="btn btn-primary btn-lg">
                        View My Work
                        <span className="btn-arrow">→</span>
                    </Link>
                    <a href="mailto:jeffenz3110@gmail.com" className="btn btn-secondary btn-lg">
                        Contact Me
                    </a>
                </div>

                <div className="hero-stats">
                    <div className="stat">
                        <span className="stat-value">5+</span>
                        <span className="stat-label">Years Experience</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-value">20+</span>
                        <span className="stat-label">Projects Delivered</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-value">100%</span>
                        <span className="stat-label">Passion for Code</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
