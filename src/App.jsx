import { useEffect, useState } from 'react';
import Cursor from './components/Cursor';
import Splash from './components/Splash';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import TechStack from './components/TechStack';
import Works from './components/Works';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  //Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Cursor Effect
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const cursor = cursorRef.current;
    const ring = ringRef.current;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;

      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;

      ring.style.left = rx + "px";
      ring.style.top = ry + "px";

      requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animateRing();

    // Hover effects
    const elements = document.querySelectorAll(
      "a, button, .work-card, .tech-card"
    );

    elements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        ring.style.width = "56px";
        ring.style.height = "56px";
        ring.style.borderColor = "var(--amber)";
        cursor.style.transform = "translate(-50%, -50%) scale(0.5)";
      });

      el.addEventListener("mouseleave", () => {
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "var(--amber)";
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
      });
    });

    // cleanup (IMPORTANT)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="app">
      { /* Cursors */}
      <div className="cursor" id="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" id="cursorRing" ref={ringRef}></div>

      { /* Sit */}
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <div id="site" className="visible">
          <header className="header">
            <Nav />
          </header>

          <main>
            <section>
              <Hero />
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
      )}
    </div>
  )
}

export default App