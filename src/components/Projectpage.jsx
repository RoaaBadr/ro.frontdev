import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { projects } from "../../data/projects.json";

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
/* ── Mini Splash ── */
.pp-splash {
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
.pp-splash-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(245,166,35,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245,166,35,0.07) 1px, transparent 1px);
  background-size: 52px 52px;
  animation: ppGridPulse 2s ease-in-out infinite;
}
@keyframes ppGridPulse { 0%,100%{opacity:.3} 50%{opacity:1} }
.pp-splash-circle {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pp-splash-circle-inner {
  width: 110px; height: 110px;
  border-radius: 50%;
  border: 1px solid var(--amber);
  animation: ppCircleExpand 1.1s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s forwards;
  opacity: 0;
}
@keyframes ppCircleExpand {
  0%   { opacity:.9; transform:scale(.15); }
  100% { opacity:0;  transform:scale(9);  }
}
.pp-splash-bar-wrap {
  position: relative;
  z-index: 2;
  width: 160px;
  opacity: 0;
  animation: ppFadeIn .3s ease .1s forwards;
}
@keyframes ppFadeIn { to { opacity:1; } }
.pp-splash-bar-bg {
  height: 1px;
  background: rgba(255,255,255,0.08);
}
.pp-splash-bar-fill {
  height: 1px;
  background: var(--amber);
  width: 0%;
  animation: ppBarFill .9s cubic-bezier(0.4,0,0.2,1) .15s forwards;
}
@keyframes ppBarFill { to { width:100%; } }
.pp-splash.pp-hide {
  animation: ppExit .65s cubic-bezier(0.7,0,0.3,1) forwards;
}
@keyframes ppExit {
  0%   { clip-path: polygon(0 0,100% 0,100% 100%,0 100%); }
  100% { clip-path: polygon(0 0,100% 0,100% 0,0 0); }
}

/* ── Page ── */
.pp-page {
  background: var(--white);
  min-height: 100vh;
  opacity: 0;
  transition: opacity 0.45s ease 0.1s;
}
.pp-page.pp-visible { opacity: 1; }

/* ── Nav bar inside project page ── */
.pp-nav {
//   position: fixed;
//   top: 0; left: 0; right: 0;
background: #0C0B09;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 64px;
  height: 72px;
}

.pp-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--white);
  background: none;
  border: none;
  cursor: pointer;
  mix-blend-mode: difference;
  transition: gap 0.25s;
  padding: 0;
}
.pp-back-btn:hover { gap: 16px; }

.pp-nav-logo {
  font-family: 'DM Mono', monospace;
  font-size: 16px;
  color: var(--amber);
  letter-spacing: -0.02em;
  text-decoration: none;
}

/* ── Hero ── */
.pp-hero {
  min-height: 100vh;
  background: var(--black);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 64px 80px;
  position: relative;
  overflow: hidden;
}
.pp-hero-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.18;
  transition: opacity 0.6s;
}
.pp-hero:hover .pp-hero-img { opacity: 0.25; }
.pp-hero::before {
  content: '';
  position: absolute;
  bottom: -200px; right: -100px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(245,166,35,0.09) 0%, transparent 70%);
  pointer-events: none;
}
.pp-hero-meta {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
}
.pp-hero-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.pp-hero-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--amber);
  border: 1px solid rgba(245,166,35,0.35);
  padding: 5px 12px;
}
.pp-hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(64px, 9vw, 120px);
  line-height: 0.9;
  letter-spacing: -0.01em;
  color: var(--white);
  margin-bottom: 16px;
}
.pp-hero-subtitle {
  font-size: 16px;
  line-height: 1.75;
  color: rgba(247,245,240,0.45);
  max-width: 520px;
}
.pp-hero-right {
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: flex-end;
  flex-shrink: 0;
}
.pp-hero-stat { text-align: right; }
.pp-hero-stat-label {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--mid);
  margin-bottom: 4px;
}
.pp-hero-stat-val {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--white);
}
.pp-live-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--amber);
  color: var(--black);
  padding: 14px 28px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: background 0.25s, gap 0.25s, transform 0.25s;
}
.pp-live-btn:hover {
  background: var(--amber-dark);
  gap: 16px;
  transform: translateY(-2px);
}

/* ── Divider ── */
.pp-divider {
  height: 1px;
  background: rgba(0,0,0,0.08);
  margin: 0 64px;
}

/* ── Body ── */
.pp-body {
  padding: 100px 64px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 80px;
  align-items: start;
}

/* ── Overview ── */
.pp-section-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.pp-section-eyebrow::before {
  content: '';
  display: block;
  width: 18px;
  height: 1px;
  background: var(--amber);
}
.pp-overview-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(30px, 3.5vw, 46px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 28px;
  color: var(--black);
}
.pp-overview-body {
  font-size: 15px;
  line-height: 1.85;
  color: #555;
  max-width: 580px;
}
.pp-overview-body p + p { margin-top: 18px; }

/* ── Challenges ── */
.pp-challenges { margin-top: 64px; }
.pp-challenges-title {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 28px;
  color: var(--black);
}
.pp-challenge-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(0,0,0,0.07);
}
.pp-challenge-item:first-of-type { border-top: 1px solid rgba(0,0,0,0.07); }
.pp-challenge-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--mid);
  margin-bottom: 8px;
}
.pp-challenge-text {
  font-size: 14px;
  line-height: 1.7;
  color: #555;
}
.pp-solution-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--black);
}

/* ── Sidebar ── */
.pp-sidebar {
  position: sticky;
  top: 96px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.pp-info-card {
  border: 1px solid rgba(0,0,0,0.09);
  padding: 24px;
}
.pp-info-card-title {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--mid);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0,0,0,0.07);
}
.pp-info-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 9px 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}
.pp-info-row:last-child { border-bottom: none; padding-bottom: 0; }
.pp-info-key {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  color: var(--mid);
  letter-spacing: 0.08em;
}
.pp-info-val {
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--black);
  text-align: right;
}
.pp-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 4px;
}
.pp-tech-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: var(--black);
  border: 1px solid rgba(0,0,0,0.15);
  padding: 5px 12px;
  transition: border-color 0.2s, color 0.2s;
}
.pp-tech-tag:hover { border-color: var(--amber); color: var(--amber); }

/* ── Gallery ── */
.pp-gallery { padding: 0 64px 100px; }
.pp-gallery-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(26px, 3vw, 38px);
  margin-bottom: 36px;
  color: var(--black);
}

.pp-gallery-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.pp-gallery-item {
  aspect-ratio: 16/9;
  background: #000;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.pp-gallery-item:first-child {
  grid-column: 1 / -1;
  aspect-ratio: 16/7;
}

.pp-gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 🔥 FIX */
  transition: transform 0.5s ease;
}

.pp-gallery-item:hover .pp-gallery-img {
  transform: scale(1.05);
}

/* ── Lightbox Modal ── */
.pp-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 40px;
}

.pp-lightbox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.pp-lightbox-close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 28px;
  color: white;
  cursor: pointer;
}

/* ── CTA strip ── */
.pp-cta {
  background: var(--black);
  padding: 100px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  position: relative;
  overflow: hidden;
}
.pp-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(245,166,35,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245,166,35,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}
.pp-cta-left { position: relative; }
.pp-cta-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 14px;
}
.pp-cta-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(48px, 6vw, 80px);
  line-height: 0.9;
  color: var(--white);
  letter-spacing: -0.01em;
}
.pp-cta-title span { color: var(--amber); }
.pp-cta-right {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-end;
}
.pp-cta-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--white);
  text-decoration: none;
  border-bottom: 1.5px solid var(--amber);
  padding-bottom: 4px;
  transition: color 0.25s, gap 0.25s;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
}
.pp-cta-link:hover { color: var(--amber); gap: 16px; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .pp-nav { padding: 0 32px; }
  .pp-hero { padding: 0 32px 64px; }
  .pp-hero-meta { flex-direction: column; align-items: flex-start; gap: 32px; }
  .pp-hero-right { align-items: flex-start; }
  .pp-body { padding: 72px 32px; grid-template-columns: 1fr; gap: 48px; }
  .pp-sidebar { position: relative; top: 0; }
  .pp-gallery { padding: 0 32px 72px; }
  .pp-divider { margin: 0 32px; }
  .pp-cta { padding: 80px 32px; flex-direction: column; align-items: flex-start; }
  .pp-cta-right { align-items: flex-start; }
}
@media (max-width: 600px) {
  .pp-nav { padding: 0 20px; height: 60px; }
  .pp-hero { padding: 0 20px 48px; }
  .pp-body { padding: 56px 20px; }
  .pp-gallery { padding: 0 20px 60px; }
  .pp-gallery-grid { grid-template-columns: 1fr; }
  .pp-gallery-item:first-child { grid-column: 1; aspect-ratio: 16/9; }
  .pp-challenge-item { grid-template-columns: 1fr; gap: 12px; }
  .pp-cta { padding: 60px 20px; }
  .pp-divider { margin: 0 20px; }
}
`;

/* ─────────────────────────────────────────────
   MINI SPLASH  (local to project page)
───────────────────────────────────────────── */
function MiniSplash({ onDone }) {
  const [hiding, setHiding] = useState(false);
  const doneRef = useRef(onDone);
  useEffect(() => { doneRef.current = onDone; }, [onDone]);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 1000);
    const t2 = setTimeout(() => doneRef.current?.(), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className={`pp-splash${hiding ? ' pp-hide' : ''}`}>
      <div className="pp-splash-grid" />
      <div className="pp-splash-circle"><div className="pp-splash-circle-inner" /></div>
      <div className="pp-splash-bar-wrap">
        <div className="pp-splash-bar-bg"><div className="pp-splash-bar-fill" /></div>
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────
   PROJECT PAGE
───────────────────────────────────────────── */
export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [splashDone, setSplashDone] = useState(false);
  const [activeImg, setActiveImg] = useState(null); 

  // Scroll to top whenever we land here
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const project = projects.find((p) => p.id === id);

  // If id not found → back to home
  if (!project) return <Navigate to="/" replace />;

  const p = project;

  // Navigate back to home — always "/" so all sections render correctly
  const goHome = () => navigate('/');

  return (
    <>
      <style>{css}</style>

      {/* Mini splash plays every time this page mounts */}
      {!splashDone && <MiniSplash onDone={() => setSplashDone(true)} />}

      {/* Fixed nav bar with back button */}
      <div className="pp-nav">
        <button className="pp-back-btn" onClick={goHome}>
          ← Back to works
        </button>
        <span className="pp-nav-logo">&lt;Roaa/&gt;</span>
      </div>

      {/* Main content fades in after splash */}
      <div className={`pp-page${splashDone ? ' pp-visible' : ''}`}>

        {/* ── HERO ── */}
        <section className="pp-hero">
          <div
            className="pp-hero-img"
            style={{ background: `linear-gradient(145deg, ${p.bgColor || '#1a1208'}, #0a0a0a)` }}
          />
          <div className="pp-hero-meta">
            <div className="pp-hero-left">
              <div className="pp-hero-tags">
                {(p.tags || []).map(t => <span key={t} className="pp-hero-tag">{t}</span>)}
              </div>
              <h1 className="pp-hero-title">{p.title}</h1>
              <p className="pp-hero-subtitle">{p.subtitle || p.desc}</p>
            </div>
            <div className="pp-hero-right">
              <div className="pp-hero-stat">
                <div className="pp-hero-stat-label">Year</div>
                <div className="pp-hero-stat-val">{p.year}</div>
              </div>
              <div className="pp-hero-stat">
                <div className="pp-hero-stat-label">Role</div>
                <div className="pp-hero-stat-val">{p.role}</div>
              </div>
              <div className="pp-hero-stat">
                <div className="pp-hero-stat-label">Duration</div>
                <div className="pp-hero-stat-val">{p.duration}</div>
              </div>
              <a href={p.liveUrl} className="pp-live-btn" target="_blank" rel="noreferrer">
                Live Site →
              </a>
            </div>
          </div>
        </section>

        <div className="pp-divider" />

        {/* ── BODY ── */}
        <div className="pp-body">
          <div className="pp-overview">
            <div className="pp-section-eyebrow">Overview</div>
            <h2 className="pp-overview-title">The Problem<br />&amp; The Approach</h2>
            <div className="pp-overview-body">
              {(p.overview || []).map((para, i) => <p key={i}>{para}</p>)}
            </div>

            {(p.challenges || []).length > 0 && (
              <div className="pp-challenges">
                <h3 className="pp-challenges-title">Challenges &amp; Solutions</h3>
                {p.challenges.map((item, i) => (
                  <div key={i} className="pp-challenge-item">
                    <div>
                      <div className="pp-challenge-label">Challenge</div>
                      <p className="pp-challenge-text">{item.challenge}</p>
                    </div>
                    <div>
                      <div className="pp-challenge-label" style={{ color: p.accentColor }}>Solution</div>
                      <p className="pp-solution-text">{item.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="pp-sidebar">
            <div className="pp-info-card">
              <div className="pp-info-card-title">Project Details</div>
              {p.client && (
                <div className="pp-info-row">
                  <span className="pp-info-key">Client</span>
                  <span className="pp-info-val">{p.client}</span>
                </div>
              )}
              <div className="pp-info-row">
                <span className="pp-info-key">Year</span>
                <span className="pp-info-val">{p.year}</span>
              </div>
              <div className="pp-info-row">
                <span className="pp-info-key">Role</span>
                <span className="pp-info-val">{p.role}</span>
              </div>
              <div className="pp-info-row">
                <span className="pp-info-key">Duration</span>
                <span className="pp-info-val">{p.duration}</span>
              </div>
            </div>

            <div className="pp-info-card">
              <div className="pp-info-card-title">Tech Stack</div>
              <div className="pp-tech-tags">
                {(p.tags || []).map(t => <span key={t} className="pp-tech-tag">{t}</span>)}
              </div>
            </div>

            <div className="pp-info-card">
              <div className="pp-info-card-title">Links</div>
              <div className="pp-info-row">
                <span className="pp-info-key">Live Site</span>
                <a href={p.liveUrl} className="pp-info-val"
                  style={{ color: p.accentColor || 'var(--amber)', textDecoration: 'none' }}
                  target="_blank" rel="noreferrer">View →</a>
              </div>
              <div className="pp-info-row">
                <span className="pp-info-key">GitHub</span>
                <a href={p.githubUrl} className="pp-info-val"
                  style={{ color: 'var(--black)', textDecoration: 'none' }}
                  target="_blank" rel="noreferrer">Repo →</a>
              </div>
            </div>
          </aside>
        </div>

        <div className="pp-gallery">
          <h2 className="pp-gallery-title">Screenshots</h2>

          <div className="pp-gallery-grid">
            {(p.gallery || []).map((img, i) => (
              <div
                key={i}
                className="pp-gallery-item"
                onClick={() => setActiveImg(img)} 
              >
                <img
                  src={img}
                  alt={`screenshot-${i}`}
                  className="pp-gallery-img"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── LIGHTBOX ── */}
        {activeImg && (
          <div className="pp-lightbox" onClick={() => setActiveImg(null)}>
            <span className="pp-lightbox-close">×</span>
            <img src={activeImg} alt="preview" />
          </div>
        )}

        {/* ── CTA ── */}
        <section className="pp-cta">
          <div className="pp-cta-left">
            <div className="pp-cta-label">Like what you see?</div>
            <h2 className="pp-cta-title">LET'S BUILD<br /><span>TOGETHER.</span></h2>
          </div>
          <div className="pp-cta-right">
            <a href="mailto:roaa.muh90@gmail.com" className="pp-cta-link">
              roaa.muh90@gmail.com →
            </a>
            <button className="pp-cta-link" onClick={goHome}>
              ← Back to works
            </button>
          </div>
        </section>

      </div>
    </>
  );
}