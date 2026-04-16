import { useState, useEffect, useRef } from "react";
import { IoLogoJavascript, IoLogoCss3, IoLogoVercel, IoLogoReact } from "react-icons/io5";
import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiSass,
  SiNodedotjs, SiGoogleauthenticator, SiFigma, SiVitess,
} from "react-icons/si";
import { TbApi, TbBrandGit } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

/* ─────────────────────────────────────────────
   DATA  (uses your real icons)
───────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "frontend",
    num: "01",
    label: "Frontend",
    accent: "#F5A623",
    desc: "Building the interfaces people interact with — fast, accessible, beautiful.",
    techs: [
      { name: "JavaScript", Icon: IoLogoJavascript, bg: "#F7DF1E", fg: "#000" },
      { name: "React.js",   Icon: IoLogoReact,      bg: "#20232a", fg: "#61DAFB" },
      { name: "Next.js",    Icon: SiNextdotjs,      bg: "#111",    fg: "#fff" },
      { name: "TypeScript", Icon: SiTypescript,     bg: "#3178C6", fg: "#fff" },
      { name: "Tailwind",   Icon: SiTailwindcss,    bg: "#0EA5E9", fg: "#fff" },
      { name: "Sass",       Icon: SiSass,           bg: "#CC6699", fg: "#fff" },
    ],
  },
  {
    id: "backend",
    num: "02",
    label: "Backend",
    accent: "#7BC67E",
    desc: "Scalable server-side systems and real-time data pipelines.",
    techs: [
      { name: "Node.js",  Icon: SiNodedotjs,            bg: "#1a3a1a", fg: "#7BC67E" },
      { name: "JWT Auth", Icon: SiGoogleauthenticator,   bg: "#1c1c1c", fg: "#FFA000" },
      { name: "REST API", Icon: TbApi,                  bg: "#2D2D2D", fg: "#F5A623" },
    ],
  },
  {
    id: "tools",
    num: "03",
    label: "Tools",
    accent: "#E8845A",
    desc: "The workflow, design, and DevOps tools that keep everything running.",
    techs: [
      { name: "Figma",   Icon: SiFigma,     bg: "#2a1510", fg: "#F24E1E" },
      { name: "Git",     Icon: TbBrandGit,  bg: "#2a1510", fg: "#F05032" },
      { name: "VS Code", Icon: VscVscode,   bg: "#001a2a", fg: "#007ACC" },
      { name: "Vercel",  Icon: IoLogoVercel,bg: "#111",    fg: "#fff" },
      { name: "Vite",    Icon: SiVitess,    bg: "#0a0a2a", fg: "#646CFF" },
    ],
  },
];

/* ─────────────────────────────────────────────
   STYLES  — scoped with .ts- prefix, no conflicts
───────────────────────────────────────────── */
const css = `
/* ── TechStack section wrapper ── */
.ts-section {
  background: var(--black);
  color: var(--white);
  padding: 140px 64px;
  font-family: 'DM Sans', sans-serif;
}

/* ── Section header ── */
.ts-hd {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 80px;
}

.ts-hd-left {}

.ts-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 14px;
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

.ts-big-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(56px, 7vw, 100px);
  line-height: 0.9;
  letter-spacing: -0.01em;
  color: var(--white);
}

.ts-hd-right {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--mid);
  padding-bottom: 8px;
  text-align: right;
  line-height: 1.7;
}

/* ── Body: sidebar (sticky) + scrollable blocks ── */
.ts-body {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 0;
  align-items: start;
}

/* ── Sticky sidebar ── */
.ts-sidebar {
  position: sticky;
  top: 100px;
  padding-right: 40px;
}

.ts-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: opacity 0.4s ease;
  position: relative;
}
.ts-sidebar-item:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
.ts-sidebar-item.ts-dim { opacity: 0.18; }

.ts-sidebar-tick {
  width: 2px;
  height: 24px;
  border-radius: 2px;
  flex-shrink: 0;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1), background 0.3s;
}
.ts-sidebar-item.ts-lit .ts-sidebar-tick { transform: scaleY(1); }

.ts-sidebar-num {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.12em;
  color: var(--mid);
  min-width: 20px;
  transition: color 0.3s;
}

.ts-sidebar-name {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 17px;
  letter-spacing: -0.01em;
  color: rgba(247,245,240,0.22);
  transition: color 0.35s;
}
.ts-sidebar-item.ts-lit .ts-sidebar-name { color: var(--white); }

/* progress dots */
.ts-dots {
  display: flex;
  gap: 7px;
  align-items: center;
  margin-top: 28px;
}
.ts-dot {
  height: 5px;
  border-radius: 3px;
  background: rgba(255,255,255,0.12);
  transition: width 0.35s cubic-bezier(0.34,1.2,0.64,1), background 0.3s;
  width: 5px;
}
.ts-dot.ts-dot-active {
  width: 18px;
}

/* ── Right: stacked category blocks ── */
.ts-blocks {
  border-left: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
}

/* ── Single category block ── */
.ts-block {
  padding: 0 0 88px 56px;
  position: relative;
}

/* timeline dot */
.ts-block-dot {
  position: absolute;
  left: -5px;
  top: 10px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #1e1e1e;
  border: 1px solid rgba(255,255,255,0.1);
  transition: background 0.45s, box-shadow 0.45s, border-color 0.45s;
  z-index: 1;
}
.ts-block.ts-block-lit .ts-block-dot {
  border-color: transparent;
}

/* block label row */
.ts-block-label-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 10px;
}

.ts-block-num {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.2em;
  color: var(--mid);
}

.ts-block-label {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(28px, 3.2vw, 42px);
  letter-spacing: -0.02em;
  line-height: 1;
  color: rgba(247,245,240,0.1);
  transition: color 0.5s ease;
}
.ts-block.ts-block-lit .ts-block-label {
  /* color set inline per accent */
}

.ts-block-desc {
  font-size: 13px;
  color: var(--mid);
  line-height: 1.8;
  max-width: 380px;
  margin-bottom: 36px;
  letter-spacing: 0.01em;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s 0.12s ease, transform 0.5s 0.12s ease;
}
.ts-block.ts-block-lit .ts-block-desc {
  opacity: 1;
  transform: translateY(0);
}

/* ── Tech cards grid ── */
.ts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

/* ── Single tech card ── */
.ts-card {
  border: 1px solid rgba(255,255,255,0.06);
  padding: 22px 14px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px) scale(0.96);
  transition:
    opacity 0.45s ease,
    transform 0.45s cubic-bezier(0.34,1.2,0.64,1),
    border-color 0.25s,
    box-shadow 0.3s;
}
.ts-card.ts-card-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.ts-card:hover {
  transform: translateY(-4px) scale(1) !important;
}

/* accent bottom bar */
.ts-card-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s ease;
}
.ts-card:hover .ts-card-bar { transform: scaleX(1); }

.ts-card-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ts-card-name {
  font-family: 'Syne', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(247,245,240,0.4);
  text-align: center;
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .ts-section { padding: 100px 40px; }
  .ts-body { grid-template-columns: 200px 1fr; }
  .ts-block { padding: 0 0 72px 40px; }
  .ts-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 680px) {
  .ts-section { padding: 80px 24px; }
  .ts-hd { flex-direction: column; align-items: flex-start; gap: 12px; margin-bottom: 52px; }
  .ts-hd-right { text-align: left; }
  .ts-body { grid-template-columns: 1fr; }
  .ts-sidebar { display: none; }
  .ts-blocks { border-left: none; }
  .ts-block { padding: 0 0 64px 0; }
  .ts-block-dot { display: none; }
  .ts-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 400px) {
  .ts-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
  .ts-card { padding: 18px 10px 14px; }
}
`;

/* ─────────────────────────────────────────────
   TECH CARD  — staggered reveal
───────────────────────────────────────────── */
function TechCard({ tech, accent, index, parentLit }) {
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    if (parentLit) {
      timer.current = setTimeout(() => setVisible(true), index * 65 + 80);
    } else {
      timer.current = setTimeout(() => setVisible(false), index * 25);
    }
    return () => clearTimeout(timer.current);
  }, [parentLit, index]);

  const { Icon } = tech;

  return (
    <div
      className={`ts-card${visible ? " ts-card-in" : ""}`}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accent + "44";
        e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div
        className="ts-card-bar"
        style={{ background: accent }}
      />
      <div
        className="ts-card-icon"
        style={{ background: tech.bg, color: tech.fg }}
      >
        {Icon && <Icon size={22} />}
      </div>
      <div className="ts-card-name">{tech.name}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY BLOCK  — IntersectionObserver
───────────────────────────────────────────── */
function CatBlock({ cat, onActive }) {
  const ref = useRef(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const isLit = entry.isIntersecting;
        setLit(isLit);
        if (isLit) onActive(cat.id);
      },
      { threshold: 0.18, rootMargin: "-8% 0px -32% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ts-block${lit ? " ts-block-lit" : ""}`}>
      {/* animated timeline dot */}
      <span
        className="ts-block-dot"
        style={
          lit
            ? { background: cat.accent, boxShadow: `0 0 14px ${cat.accent}99`, borderColor: "transparent" }
            : {}
        }
      />

      <div className="ts-block-label-row">
        <span className="ts-block-num">{cat.num}</span>
        <span
          className="ts-block-label"
          style={{ color: lit ? cat.accent : "rgba(247,245,240,0.1)" }}
        >
          {cat.label}
        </span>
      </div>

      <p className="ts-block-desc">{cat.desc}</p>

      <div className="ts-grid">
        {cat.techs.map((tech, ti) => (
          <TechCard
            key={tech.name}
            tech={tech}
            accent={cat.accent}
            index={ti}
            parentLit={lit}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function TechStack() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const activeIdx = CATEGORIES.findIndex(c => c.id === activeId);

  return (
    <>
      <style>{css}</style>
      <section className="ts-section">

        {/* HEADER */}
        <div className="ts-hd">
          <div className="ts-hd-left">
            <div className="ts-eyebrow">Tech Stack</div>
            <h2 className="ts-big-title">MY TECH<br />STACK</h2>
          </div>
          <div className="ts-hd-right">
            Technologies I use<br />to build digital products
          </div>
        </div>

        {/* BODY */}
        <div className="ts-body">

          {/* STICKY SIDEBAR */}
          <div className="ts-sidebar">
            {CATEGORIES.map((cat, i) => {
              const isLit = cat.id === activeId;
              return (
                <div
                  key={cat.id}
                  className={`ts-sidebar-item${isLit ? " ts-lit" : " ts-dim"}`}
                >
                  <div
                    className="ts-sidebar-tick"
                    style={isLit ? { background: cat.accent } : {}}
                  />
                  <span
                    className="ts-sidebar-num"
                    style={isLit ? { color: cat.accent } : {}}
                  >
                    {cat.num}
                  </span>
                  <span className="ts-sidebar-name">{cat.label}</span>
                </div>
              );
            })}

            {/* progress dots */}
            <div className="ts-dots">
              {CATEGORIES.map((cat, i) => (
                <div
                  key={cat.id}
                  className={`ts-dot${i === activeIdx ? " ts-dot-active" : ""}`}
                  style={i === activeIdx ? { background: cat.accent } : {}}
                />
              ))}
            </div>
          </div>

          {/* SCROLLABLE BLOCKS */}
          <div className="ts-blocks">
            {CATEGORIES.map(cat => (
              <CatBlock
                key={cat.id}
                cat={cat}
                onActive={setActiveId}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}