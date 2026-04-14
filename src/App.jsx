import './App.css'
import Nav from './components/Nav'

function App() {

  return (
    <div className="app">
      <header className="header">
        <Nav/>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero-content">
            <h1>Hi, I'm John Doe!</h1>
            <p className="hero-subtitle">Front-End Developer</p>
            <p className="hero-description">Building beautiful digital experiences</p>
            <a href="#contact" className="cta-button">Get In Touch</a>
          </div>
        </section>

        <section className="about" id="about">
          <h2>About Me</h2>
          <p>I'm a passionate front-end developer with expertise in creating responsive and user-friendly websites. I love turning ideas into reality through clean code and creative design.</p>
        </section>

        <section className="projects" id="projects">
          <h2>Projects</h2>
          <div className="projects-grid">
            <article className="project-card">
              <h3>Project One</h3>
              <p>A brief description of this amazing project.</p>
            </article>
            <article className="project-card">
              <h3>Project Two</h3>
              <p>A brief description of this amazing project.</p>
            </article>
            <article className="project-card">
              <h3>Project Three</h3>
              <p>A brief description of this amazing project.</p>
            </article>
          </div>
        </section>

        <section className="contact" id="contact">
          <h2>Get In Touch</h2>
          <p>Feel free to reach out for collaborations or just a friendly chat.</p>
          <a href="mailto:hello@johndoe.com" className="cta-button">Send Message</a>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 John Doe. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App