import './Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/Jeffrey-Matthew', icon: <FaGithub /> },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jeffreymatthew/', icon: <FaLinkedin /> },
        { name: 'Email', url: 'mailto:jeffenz3110@gmail.com', icon: <FaEnvelope /> },
    ];

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span>Jeffrey Matthew</span>
                    </div>

                    <div className="footer-links">
                        <a href="/projects" className="footer-link">Projects</a>
                        <a href="mailto:jeffenz3110@gmail.com" className="footer-link">Contact</a>
                        <div className="footer-socials">
                            {socialLinks.map(({ name, url, icon }) => (
                                <a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label={name}
                                >
                                    <span className="social-icon">{icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © {currentYear} Jeffrey Matthew. Built with React & TypeScript.
                    </p>
                </div>
            </div>
        </footer>
    );
};
