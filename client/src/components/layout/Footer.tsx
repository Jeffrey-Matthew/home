import './Footer.css';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/Jeffrey-Matthew', icon: '⌘' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jeffreymatthew/', icon: '◈' },
        { name: 'Email', url: 'mailto:jeffenz3110@gmail.com', icon: '✉' },
    ];

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img src="/logo.png" alt="J.M.Studio Logo" className="footer-logo" />
                        <span>J.M.Studio</span>
                    </div>

                    <div className="footer-links">
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
                                <span className="social-name">{name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © {currentYear} J.M.Studio. Built with React & TypeScript.
                    </p>
                </div>
            </div>
        </footer>
    );
};
