import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import TechStack from './components/TechStack';
import Works from './components/Works';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ProjectPage from './components/Projectpage';

/* ─────────────────────────────────────────────
   MINI SPLASH  (used on EVERY route entry)
   — no text, just grid + expanding circle + bar
───────────────────────────────────────────── */
const splashCss = `
.ms-splash {
  position: fixed;
  inset: 0;
  background: var(--black);
  z-index: 2000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 52px;
  overflow: hidden;
}
.ms-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(245,166,35,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245,166,35,0.07) 1px, transparent 1px);
  background-size: 52px 52px;
  animation: msGridPulse 2s ease-in-out infinite;
}
@keyframes msGridPulse { 0%,100%{opacity:.3} 50%{opacity:1} }

.ms-circle-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.ms-circle {
  width: 110px; height: 110px;
  border-radius: 50%;
  border: 1px solid var(--amber);
  animation: msCircle 1.1s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s forwards;
  opacity: 0;
}
@keyframes msCircle {
  0%   { opacity:.9; transform:scale(.15); }
  100% { opacity:0;  transform:scale(9);  }
}

.ms-bar-wrap {
  position: relative;
  z-index: 2;
  width: 160px;
  opacity: 0;
  animation: msFadeIn .3s ease .1s forwards;
}
@keyframes msFadeIn { to { opacity:1; } }

.ms-bar-bg {
  height: 1px;
  background: rgba(255,255,255,0.08);
}
.ms-bar-fill {
  height: 1px;
  background: var(--amber);
  width: 0%;
  animation: msBarFill var(--ms-duration, 0.9s) cubic-bezier(0.4,0,0.2,1) .15s forwards;
}
@keyframes msBarFill { to { width:100%; } }

.ms-splash.ms-hide {
  animation: msExit .65s cubic-bezier(0.7,0,0.3,1) forwards;
}
@keyframes msExit {
  0%   { clip-path: polygon(0 0,100% 0,100% 100%,0 100%); }
  100% { clip-path: polygon(0 0,100% 0,100% 0,0 0); }
}
`;

function MiniSplash({ duration = 1000, exitDelay = 700, onDone }) {
  const [hiding, setHiding] = useState(false);
  const doneRef = useRef(onDone);
  useEffect(() => { doneRef.current = onDone; }, [onDone]);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), duration);
    const t2 = setTimeout(() => doneRef.current?.(), duration + exitDelay);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [duration, exitDelay]);

  return (
    <div className={`ms-splash${hiding ? ' ms-hide' : ''}`}
      style={{ '--ms-duration': `${duration * 0.85}ms` }}>
      <div className="ms-grid" />
      <div className="ms-circle-wrap"><div className="ms-circle" /></div>
      <div className="ms-bar-wrap">
        <div className="ms-bar-bg"><div className="ms-bar-fill" /></div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
function HomePage() {
  const [splashDone, setSplashDone] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const revealInitialized = useRef(false);

  const initScrollReveal = () => {
    if (revealInitialized.current) return;
    revealInitialized.current = true;

    // Small delay so DOM is fully painted
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);
  };

  const handleSplashDone = () => {
    setSplashDone(true);
    setHeroVisible(true);
    initScrollReveal();
  };

  // Always scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {!splashDone && (
        <MiniSplash
          duration={1400}   /* slightly longer on home — feels welcoming */
          exitDelay={750}
          onDone={handleSplashDone}
        />
      )}

      <div
        id="site"
        className="container"
        style={{
          opacity: splashDone ? 1 : 0,
          transition: 'opacity 0.5s ease 0.1s',
        }}
      >
        <Nav />
        <Hero visible={heroVisible} />
        <Marquee />
        <About />
        <TechStack />
        <Works />
        <CTA />
        <Footer />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   APP  — proper Routes setup
───────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      {/* Cursor lives outside Routes so it's always present */}
      <Cursor />
      <style>{splashCss}</style>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        {/* Catch-all → home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}