import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "frontend",
    num: "01",
    label: "Frontend",
    accent: "#F5A623",
    desc: "Crafting the interfaces people actually touch — fast, precise, beautiful.",
    techs: [
      { name: "JavaScript", abbr: "JS",  bg: "#F7DF1E", fg: "#111" },
      { name: "React.js",   abbr: "⚛",   bg: "#20232a", fg: "#61DAFB" },
      { name: "Next.js",    abbr: "N↗",  bg: "#111",    fg: "#fff" },
      { name: "TypeScript", abbr: "TS",  bg: "#3178C6", fg: "#fff" },
      { name: "Tailwind",   abbr: "TW",  bg: "#0EA5E9", fg: "#fff" },
      { name: "Framer",     abbr: "Fr",  bg: "#0055FF", fg: "#fff" },
    ],
  },
  {
    id: "mobile",
    num: "02",
    label: "Mobile",
    accent: "#F97316",
    desc: "Cross-platform apps that feel native — smooth gestures, real performance.",
    techs: [
      { name: "React Native", abbr: "RN", bg: "#20232a", fg: "#61DAFB" },
      { name: "Expo",         abbr: "EX", bg: "#000",    fg: "#fff" },
      { name: "Reanimated",   abbr: "RA", bg: "#2D2D2D", fg: "#F5A623" },
      { name: "Zustand",      abbr: "ZS", bg: "#3D3830", fg: "#fff" },
      { name: "MMKV",         abbr: "MM", bg: "#1a1a1a", fg: "#aaa" },
    ],
  },
  {
    id: "backend",
    num: "03",
    label: "Backend",
    accent: "#4ADE80",
    desc: "Reliable, scalable server logic and data pipelines that never sleep.",
    techs: [
      { name: "Node.js",  abbr: "NO", bg: "#1a3a1a", fg: "#4ADE80" },
      { name: "Firebase", abbr: "🔥", bg: "#1c1c1c", fg: "#FFA000" },
      { name: "Supabase", abbr: "SB", bg: "#0a1f12", fg: "#3ECF8E" },
      { name: "MongoDB",  abbr: "MG", bg: "#0a2a1a", fg: "#4ADE80" },
      { name: "REST",     abbr: "AP", bg: "#1c1c1c", fg: "#aaa" },
      { name: "GraphQL",  abbr: "GQ", bg: "#1a0a1a", fg: "#E10098" },
    ],
  },
  {
    id: "tools",
    num: "04",
    label: "Tools",
    accent: "#A78BFA",
    desc: "The design, workflow and DevOps tools that hold it all together.",
    techs: [
      { name: "Figma",   abbr: "FG", bg: "#2a1510", fg: "#F24E1E" },
      { name: "Git",     abbr: "GT", bg: "#2a1510", fg: "#F05032" },
      { name: "VS Code", abbr: "VS", bg: "#001a2a", fg: "#007ACC" },
      { name: "Vercel",  abbr: "VC", bg: "#111",    fg: "#fff" },
      { name: "Vite",    abbr: "VT", bg: "#0a0a2a", fg: "#646CFF" },
    ],
  },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --black:  #0A0A0A;
  --white:  #F7F5F0;
  --mid:    #4A4845;
  --border: rgba(255,255,255,0.06);
}

.ts-wrap {
  background: var(--black);
  font-family: 'DM Sans', sans-serif;
  color: var(--white);
  padding: 0 0 140px;
}

/* ── SECTION HEADER ── */
.ts-header {
  padding: 100px 64px 72px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.ts-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #F5A623;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.ts-eyebrow::before {
  content: '';
  display: block;
  width: 20px;
  height: 1px;
  background: #F5A623;
}

.ts-big-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(64px, 8vw, 112px);
  line-height: 0.9;
  letter-spacing: -0.01em;
  color: var(--white);
}

.ts-header-right {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--mid);
  font-family: 'DM Mono', monospace;
  font-weight: 300;
  padding-bottom: 10px;
}

/* ── LAYOUT ── */
.ts-body {
  display: grid;
  grid-template-columns: 260px 1fr;
  padding: 0 64px;
  align-items: start;
  gap: 0;
}

/* ── STICKY SIDEBAR ── */
.ts-sidebar {
  position: sticky;
  top: 40px;
  padding-right: 40px;
}

.ts-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
  transition: opacity 0.4s ease;
  position: relative;
}
.ts-sidebar-item:first-child { border-top: 1px solid var(--border); }
.ts-sidebar-item.dim { opacity: 0.18; }

.ts-sidebar-tick {
  width: 2px;
  height: 26px;
  border-radius: 2px;
  flex-shrink: 0;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1), background 0.3s;
}
.ts-sidebar-item.lit .ts-sidebar-tick { transform: scaleY(1); }

.ts-sidebar-num {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.12em;
  color: var(--mid);
  min-width: 20px;
  transition: color 0.3s;
}
.ts-sidebar-item.lit .ts-sidebar-num { color: inherit; }

.ts-sidebar-name {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: rgba(247,245,240,0.25);
  transition: color 0.35s;
}
.ts-sidebar-item.lit .ts-sidebar-name { color: var(--white); }

/* ── RIGHT: stacked category blocks ── */
.ts-categories {
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

/* ── CATEGORY BLOCK ── */
.ts-cat-block {
  padding: 0 0 96px 64px;
  position: relative;
}

/* timeline dot */
.ts-cat-block::before {
  content: '';
  position: absolute;
  left: -5px; top: 8px;
  width: 9px; height: 9px;
  border-radius: 50%;
  background: #1a1a1a;
  border: 1px solid rgba(255,255,255,0.12);
  transition: background 0.45s, box-shadow 0.45s;
}
.ts-cat-block.lit::before {
  border-color: transparent;
}

.ts-cat-label-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
}

.ts-cat-num-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.2em;
  color: var(--mid);
}

.ts-cat-label {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(30px, 3.5vw, 44px);
  letter-spacing: -0.02em;
  line-height: 1;
  color: rgba(247,245,240,0.12);
  transition: color 0.5s ease;
}
.ts-cat-block.lit .ts-cat-label { color: var(--white); }

.ts-cat-desc {
  font-size: 13px;
  color: var(--mid);
  line-height: 1.8;
  max-width: 380px;
  margin-bottom: 40px;
  letter-spacing: 0.01em;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s 0.15s ease, transform 0.5s 0.15s ease;
}
.ts-cat-block.lit .ts-cat-desc {
  opacity: 1;
  transform: translateY(0);
}

/* ── CARDS GRID ── */
.ts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

/* ── SINGLE CARD ── */
.ts-card {
  border: 1px solid var(--border);
  padding: 22px 14px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(28px) scale(0.96);
  transition:
    opacity 0.5s ease,
    transform 0.5s cubic-bezier(0.34,1.2,0.64,1),
    border-color 0.25s,
    box-shadow 0.3s;
}
.ts-card.card-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.ts-card:hover {
  transform: translateY(-4px) scale(1) !important;
}

/* accent bottom bar */
.ts-card::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s ease;
}
.ts-card:hover::after { transform: scaleX(1); }

.ts-card-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  font-weight: 400;
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

/* ── MOBILE ── */
@media (max-width: 800px) {
  .ts-header { padding: 72px 24px 52px; flex-direction: column; align-items: flex-start; gap: 12px; }
  .ts-body { grid-template-columns: 1fr; padding: 0 24px; }
  .ts-sidebar { display: none; }
  .ts-categories { border-left: none; }
  .ts-cat-block { padding: 0 0 64px 0; }
  .ts-cat-block::before { display: none; }
  .ts-grid { grid-template-columns: repeat(2, 1fr); }
}
`;

/* ─────────────────────────────────────────────
   TECH CARD — individual card with stagger
───────────────────────────────────────────── */
function TechCard({ tech, accent, index, parentLit }) {
  const [vis, setVis] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (parentLit) {
      timerRef.current = setTimeout(() => setVis(true), index * 65 + 100);
    } else {
      // fade out slightly delayed when leaving
      timerRef.current = setTimeout(() => setVis(false), index * 30);
    }
    return () => clearTimeout(timerRef.current);
  }, [parentLit, index]);

  return (
    <div
      className={`ts-card${vis ? " card-visible" : ""}`}
      style={{
        // per-card dynamic styles injected via data attrs to avoid style tag spam
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accent + "44";
        e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* accent bottom bar color via inline pseudo-element workaround */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0,
        height:"2px", background: accent,
        transform: "scaleX(0)", transformOrigin:"left",
        transition:"transform 0.35s ease",
        pointerEvents:"none",
      }}
        className="ts-card-bar"
      />
      <div
        className="ts-card-icon"
        style={{ background: tech.bg, color: tech.fg }}
      >
        {tech.abbr}
      </div>
      <div className="ts-card-name">{tech.name}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY BLOCK — intersection observer
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
      { threshold: 0.15, rootMargin: "-5% 0px -35% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ts-cat-block${lit ? " lit" : ""}`}
    >
      {/* glowing dot — colored inline */}
      <style>{`
        .ts-cat-block-${cat.id}::before {
          background: ${lit ? cat.accent : "#1a1a1a"};
          box-shadow: ${lit ? `0 0 14px ${cat.accent}` : "none"};
        }
      `}</style>

      {/* We override the dot color via a sibling span instead */}
      <span style={{
        position:"absolute", left:"-5px", top:"8px",
        width:"9px", height:"9px", borderRadius:"50%",
        background: lit ? cat.accent : "#1e1e1e",
        boxShadow: lit ? `0 0 14px ${cat.accent}88` : "none",
        border: lit ? "none" : "1px solid rgba(255,255,255,0.1)",
        transition:"background 0.45s, box-shadow 0.45s, border 0.45s",
        zIndex:1,
        display:"block",
      }} />

      <div className="ts-cat-label-row">
        <span className="ts-cat-num-tag">{cat.num}</span>
        <span
          className="ts-cat-label"
          style={lit ? { color: cat.accent } : {}}
        >
          {cat.label}
        </span>
      </div>

      <p className="ts-cat-desc">{cat.desc}</p>

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

  return (
    <>
      <style>{css}</style>
      {/* hover bar handler for cards */}
      <style>{`
        .ts-card:hover .ts-card-bar { transform: scaleX(1) !important; }
      `}</style>

      <section className="ts-wrap">

        {/* HEADER */}
        <div className="ts-header">
          <div>
            <div className="ts-eyebrow">Tech Stack</div>
            <h2 className="ts-big-title">MY TECH<br/>STACK</h2>
          </div>
          <div className="ts-header-right">Technologies I use<br/>to build digital products</div>
        </div>

        {/* BODY */}
        <div className="ts-body">

          {/* STICKY SIDEBAR */}
          <div className="ts-sidebar">
            {CATEGORIES.map(cat => {
              const isLit = cat.id === activeId;
              return (
                <div
                  key={cat.id}
                  className={`ts-sidebar-item${isLit ? " lit" : " dim"}`}
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
          </div>

          {/* SCROLLABLE BLOCKS */}
          <div className="ts-categories">
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