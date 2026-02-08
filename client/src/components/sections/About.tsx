import './About.css';

import { useState } from 'react';
import './About.css';

const quotes = [
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann" },
    { text: "It’s not a bug; it’s an undocumented feature.", author: "Anonymous" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "Fix the cause, not the symptom.", author: "Steve Maguire" },
    { text: "Optimism is an occupational hazard of programming: feedback is the treatment.", author: "Kent Beck" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Software is a great combination between artistry and engineering.", author: "Bill Gates" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" }
];

export const About = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    const handleProfileClick = () => {
        if (!isFlipped) {
            // Pick a new random quote when flipping to the back
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setCurrentQuoteIndex(randomIndex);
        }
        setIsFlipped(!isFlipped);
    };
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
                            <div
                                className={`profile-flip-container ${isFlipped ? 'flipped' : ''}`}
                                onClick={handleProfileClick}
                            >
                                <div className="profile-flip-inner">
                                    <div className="profile-flip-front">
                                        <img
                                            src="/profile.png"
                                            alt="Jeffrey Matthew Caricature"
                                            className="profile-image"
                                        />
                                        <div className="flip-hint">Click for inspiration ✨</div>
                                    </div>
                                    <div className="profile-flip-back">
                                        <div className="quote-content">
                                            <p className="quote-text">"{quotes[currentQuoteIndex].text}"</p>
                                            <span className="quote-author">— {quotes[currentQuoteIndex].author}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
