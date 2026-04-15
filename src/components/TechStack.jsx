import { useState, useEffect, useRef } from "react";
import { IoLogoJavascript, IoLogoCss3 , IoLogoVercel, IoLogoReact } from "react-icons/io5";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiSass, SiNodedotjs, SiGoogleauthenticator, SiFigma, SiVitess} from "react-icons/si";
import { TbApi,TbBrandGit } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#F5A623",
    desc: "Building the interfaces people interact with — fast, accessible, beautiful.",
    techs: [
      { name: "JavaScript", icon: IoLogoJavascript, bg: "#F7DF1E", fg: "#000" },
      { name: "React.js", icon: IoLogoReact , bg: "#20232a", fg: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, bg: "#000", fg: "#fff" },
      { name: "TypeScript", icon: SiTypescript , bg: "#3178C6", fg: "#fff" },
      { name: "Tailwind", icon: SiTailwindcss, bg: "#0EA5E9", fg: "#fff" },
      { name: "Sass", icon: SiSass , bg: "#CC6699", fg: "#fff" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#7BC67E",
    desc: "Scalable server-side systems and real-time data pipelines.",
    techs: [
      { name: "Node.js", icon: SiNodedotjs, bg: "#339933", fg: "#fff" },
      { name: "JWT Auth", icon: SiGoogleauthenticator , bg: "#1c1c1c", fg: "#FFA000" },
      { name: "REST API", icon: TbApi, bg: "#2D2D2D", fg: "#F5A623" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    color: "#E8845A",
    desc: "The workflow, design, and DevOps tools that keep everything running.",
    techs: [
      { name: "Figma", icon: SiFigma , bg: "#F24E1E", fg: "#fff" },
      { name: "Git", icon: TbBrandGit , bg: "#F05032", fg: "#fff" },
      { name: "VS Code", icon: VscVscode, bg: "#007ACC", fg: "#fff" },
      { name: "Vercel", icon: IoLogoVercel , bg: "#000", fg: "#fff" },
      { name: "Vite", icon: SiVitess , bg: "#646CFF", fg: "#fff" },
    ],
  },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }


.ts-page{ background: var(--black); color: var(--white); font-family: 'DM Sans', sans-serif; }

/* wrapper
.ts-page {
  background: var(--black);
} */

/* ── SCROLL CONTAINER ── */
.ts-scroll-container {
  position: relative;
}

/* sticky panel: left = big title, right = cards */
.ts-sticky-panel {
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}

/* ── LEFT SIDE ── */
.ts-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 48px 60px 60px;
  position: relative;
  border-right: 1px solid var(--border);
}

.ts-left-top {
  margin-bottom: 48px;
}

.ts-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.ts-eyebrow::before {
  content: '';
  display: block;
  width: 20px;
  height: 1px;
  background: var(--amber);
}

.ts-main-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(56px, 6vw, 88px);
  line-height: 0.92;
  letter-spacing: -0.01em;
  color: var(--white);
}

.ts-main-sub {
  font-size: 13px;
  color: var(--mid);
  margin-top: 20px;
  line-height: 1.8;
  max-width: 300px;
  letter-spacing: 0.02em;
}

/* category nav */
.ts-cat-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ts-cat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
  cursor: default;
  position: relative;
  transition: opacity 0.3s;
}

.ts-cat-item:first-child { border-top: 1px solid var(--border); }

.ts-cat-item.inactive { opacity: 0.28; }

.ts-cat-num {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  color: var(--mid);
  letter-spacing: 0.1em;
  min-width: 24px;
  transition: color 0.3s;
}

.ts-cat-item.active .ts-cat-num {
  color: var(--amber);
}

.ts-cat-name {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.01em;
  transition: color 0.3s;
  color: rgba(247,245,240,0.4);
}

.ts-cat-item.active .ts-cat-name {
  color: var(--white);
}

.ts-cat-bar {
  position: absolute;
  left: -60px;
  top: 0; bottom: 0;
  width: 3px;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), background 0.3s;
  border-radius: 0 2px 2px 0;
}

.ts-cat-item.active .ts-cat-bar {
  transform: scaleY(1);
}

.ts-cat-arrow {
  margin-left: auto;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s, transform 0.3s;
  color: var(--amber);
  font-size: 14px;
}

.ts-cat-item.active .ts-cat-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* progress dots */
.ts-progress {
  position: absolute;
  bottom: 48px;
  left: 60px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.ts-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--border);
  transition: background 0.3s, transform 0.3s, width 0.3s;
}

.ts-dot.active {
  width: 20px;
  border-radius: 3px;
  transform: scaleY(1);
}

/* ── RIGHT SIDE ── */
.ts-right {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 60px 60px 48px;
}

/* category panel (one per category, absolutely stacked) */
.ts-panel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 60px 60px 48px;
  pointer-events: none;
}

.ts-panel.entering-up    { animation: enterUp 0.55s cubic-bezier(0.25,0.46,0.45,0.94) forwards; pointer-events: auto; }
.ts-panel.entering-down  { animation: enterDown 0.55s cubic-bezier(0.25,0.46,0.45,0.94) forwards; pointer-events: auto; }
.ts-panel.leaving-up     { animation: leaveUp 0.55s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
.ts-panel.leaving-down   { animation: leaveDown 0.55s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
.ts-panel.active-still   { opacity: 1; transform: translateY(0); pointer-events: auto; }
.ts-panel.hidden         { opacity: 0; pointer-events: none; }

@keyframes enterUp {
  from { opacity: 0; transform: translateY(60px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes enterDown {
  from { opacity: 0; transform: translateY(-60px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes leaveUp {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-60px); }
}
@keyframes leaveDown {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(60px); }
}

/* panel header */
.ts-panel-header {
  margin-bottom: 36px;
}

.ts-panel-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.ts-panel-desc {
  font-size: 13px;
  color: var(--mid);
  line-height: 1.75;
  max-width: 340px;
  letter-spacing: 0.01em;
}

/* tech grid */
.ts-tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.ts-tech-card {
  border: 1px solid var(--border);
  padding: 24px 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  position: relative;
  overflow: hidden;
  cursor: default;
  transition: border-color 0.25s, transform 0.25s;
  opacity: 0;
  transform: translateY(20px);
}

.ts-tech-card.card-in {
  animation: cardIn 0.45s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
}

@keyframes cardIn {
  to { opacity: 1; transform: translateY(0); }
}

.ts-tech-card::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.ts-tech-card:hover {
  transform: translateY(-3px);
}

.ts-tech-card:hover::after {
  transform: scaleX(1);
}

.ts-tech-icon-wrap {
  width: 48px; height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Mono', monospace;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.ts-tech-name {
  font-family: 'Syne', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(247,245,240,0.5);
  text-align: center;
}

/* scroll phantom (creates scroll height) */
.ts-phantom {
  /* height set in JS */
}

/* ── SCROLL HINT ── */
.ts-scroll-hint {
  position: absolute;
  bottom: 48px;
  right: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.4;
}

.ts-scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, var(--amber));
  animation: scrollLine 1.8s ease-in-out infinite;
}

@keyframes scrollLine {
  0%, 100% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
}

.ts-scroll-label {
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--mid);
  writing-mode: vertical-rl;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .ts-sticky-panel {
    grid-template-columns: 1fr;
    height: auto;
    position: relative;
  }
  .ts-left {
    padding: 48px 24px;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  .ts-right { padding: 40px 24px; min-height: 420px; }
  .ts-panel { padding: 40px 24px; }
  .ts-tech-grid { grid-template-columns: repeat(2, 1fr); }
  .ts-progress { left: 24px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function TechStack() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState("up"); // "up" | "down"
  const [panelStates, setPanelStates] = useState(
    CATEGORIES.map((_, i) => (i === 0 ? "active-still" : "hidden"))
  );
  const [cardKeys, setCardKeys] = useState(0); // force re-mount cards on category change

  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const lastIdx = useRef(0);
  const ticking = useRef(false);

  // ── SCROLL HANDLER ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const totalScroll = container.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(1, scrolled / totalScroll);
        const raw = progress * (CATEGORIES.length - 1);
        const newIdx = Math.round(raw);
        const clamped = Math.max(0, Math.min(CATEGORIES.length - 1, newIdx));

        if (clamped !== lastIdx.current) {
          const dir = clamped > lastIdx.current ? "up" : "down";
          transitionTo(lastIdx.current, clamped, dir);
          lastIdx.current = clamped;
        }
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function transitionTo(from, to, dir) {
    setDirection(dir);
    setActiveIdx(to);
    setCardKeys(k => k + 1);

    setPanelStates(prev => {
      const next = [...prev];
      // leaving animation
      next[from] = dir === "up" ? "leaving-up" : "leaving-down";
      // entering animation
      next[to] = dir === "up" ? "entering-up" : "entering-down";
      return next;
    });

    // after animation, clean up
    setTimeout(() => {
      setPanelStates(prev => {
        const next = [...prev];
        next[from] = "hidden";
        next[to] = "active-still";
        return next;
      });
    }, 580);
  }

  const cat = CATEGORIES[activeIdx];
  const PHANTOM_HEIGHT = `${(CATEGORIES.length - 1) * 100 + 100}vh`;

  return (
    <>
      <style>{css}</style>
      <div className="ts-page">

        {/* phantom height container → makes page scrollable */}
        <div ref={containerRef} className="ts-scroll-container" style={{ height: PHANTOM_HEIGHT }}>

          {/* sticky viewport */}
          <div ref={stickyRef} className="ts-sticky-panel">

            {/* ── LEFT ── */}
            <div className="ts-left">
              <div className="ts-left-top">
                <div className="ts-eyebrow">Tech Stack</div>
                <h2 className="ts-main-title">MY<br />TECH<br />STACK</h2>
                <p className="ts-main-sub">
                  Technologies I use to build digital products — from pixel to production.
                </p>
              </div>

              {/* category nav */}
              <div className="ts-cat-nav">
                {CATEGORIES.map((c, i) => (
                  <div
                    key={c.id}
                    className={`ts-cat-item ${i === activeIdx ? "active" : "inactive"}`}
                  >
                    <div
                      className="ts-cat-bar"
                      style={{ background: c.color }}
                    />
                    <span className="ts-cat-num">0{i + 1}</span>
                    <span
                      className="ts-cat-name"
                      style={i === activeIdx ? { color: c.color } : {}}
                    >
                      {c.label}
                    </span>
                    {/*<span className="ts-cat-arrow">→</span>*/}
                  </div>
                ))}
              </div>

              {/* progress dots */}
              <div className="ts-progress">
                {CATEGORIES.map((c, i) => (
                  <div
                    key={c.id}
                    className={`ts-dot ${i === activeIdx ? "active" : ""}`}
                    style={i === activeIdx ? { background: c.color } : {}}
                  />
                ))}
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="ts-right">
              {CATEGORIES.map((category, ci) => (
                <div
                  key={category.id}
                  className={`ts-panel ${panelStates[ci]}`}
                >
                  <div className="ts-panel-header">
                    <div
                      className="ts-panel-label"
                      style={{ color: category.color }}
                    >
                      {String(ci + 1).padStart(2, "0")} — {category.label}
                    </div>
                    <p className="ts-panel-desc">{category.desc}</p>
                  </div>

                  <div className="ts-tech-grid">
                    {category.techs.map((tech, ti) => (
                      <div
                        key={`${cardKeys}-${tech.name}`}
                        className="ts-tech-card card-in"
                        style={{
                          borderColor: panelStates[ci] === "active-still" || panelStates[ci].startsWith("entering")
                            ? "rgba(255,255,255,0.07)"
                            : "transparent",
                          animationDelay: `${ti * 60}ms`,
                          ["--hover-color"]: category.color,
                        }}
                      >
                        <style>{`
                          .ts-tech-card:hover { border-color: ${category.color}44 !important; }
                          .ts-tech-card::after { background: ${category.color}; }
                        `}</style>

                        <div
                          className="ts-tech-icon-wrap"
                          style={{ background: tech.bg, color: tech.fg }}
                        >
                          {tech.icon && (() => {
                            const Icon = tech.icon;
                            return <Icon size={22} />;
                          })()}
                        </div>
                        <div className="ts-tech-name">{tech.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* scroll hint — only shown on first category */}
              {activeIdx === 0 && (
                <div className="ts-scroll-hint">
                  <div className="ts-scroll-line" />
                  <span className="ts-scroll-label">scroll</span>
                </div>
              )}
            </div>

          </div>{/* /sticky */}
        </div>{/* /scroll-container */}
      </div>
    </>
  );
}