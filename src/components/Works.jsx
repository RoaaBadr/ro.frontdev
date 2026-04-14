import { useState } from 'react';

const projects = [
  {
    title: 'Nova Financial',
    desc: 'Data visualization platform designed for high-net-worth individual management with surgical UI precision.',
    tags: ['Next.js', 'D3.js'],
    delay: '',
    bg: '#F5A623',
    innerBg: 'linear-gradient(145deg,#1a1208,#3a2a0a)',
    barColor: '#F5A623',
    screenBg: 'linear-gradient(180deg,#1c1c1e,#2c2c2e)',
    blocks: ['#333', '#2a2a2a', '#444', '#383838'],
  },
  {
    title: 'Archway Studio',
    desc: 'Architectural portfolio and booking platform built with editorial precision and spatial awareness.',
    tags: ['Next.js', 'D3.js'],
    delay: 'reveal-delay-2',
    bg: '#D0C8BC',
    innerBg: 'linear-gradient(145deg,#2a2520,#3d3530)',
    barColor: '#333',
    screenBg: 'linear-gradient(180deg,#e8e4de,#d4cfc8)',
    blocks: ['#b0a898', '#c8c0b4', '#a09888', '#bab0a4'],
    deviceRotate: 'perspective(800px) rotateY(5deg) rotateX(3deg)',
  },
  {
    title: 'DevTrack Pro',
    desc: 'Developer productivity dashboard with real-time collaboration, task tracking, and sprint analytics.',
    tags: ['React', 'Firebase'],
    delay: 'reveal-delay-1',
    bg: '#2D2D2D',
    innerBg: 'linear-gradient(145deg,#0a0f1a,#1a2030)',
    barColor: '#238636',
    screenBg: 'linear-gradient(180deg,#0d1117,#161b22)',
    blocks: ['#21262d', '#161b22', '#1c2128', '#21262d'],
  },
  {
    title: 'Bloom — Wellness App',
    desc: 'Mobile-first wellness tracking application with warm editorial design and mindful micro-interactions.',
    tags: ['Expo', 'React Native'],
    delay: 'reveal-delay-3',
    bg: '#E8D5C4',
    innerBg: 'linear-gradient(145deg,#1a1010,#2a1818)',
    barColor: '#c8785a',
    screenBg: 'linear-gradient(180deg,#fdf6ef,#f0e8dc)',
    blocks: ['#e8d4c0', '#ddc8b0', '#e4ceb8', '#d8c4a8'],
    deviceRotate: 'perspective(800px) rotateY(5deg) rotateX(3deg)',
  },
];

const filters = ['All Projects', 'Web Apps', 'UI/UX Design'];

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('All Projects');

  return (
    <section className="works" id="works">
      <div className="section-header reveal">
        <h2 className="section-title">Selected Works</h2>
        <span className="section-sub">2023 — 2025</span>
      </div>

      <div className="works-filter reveal">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn${activeFilter === f ? ' active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="works-grid">
        {projects.map((p) => (
          <div key={p.title} className={`work-card reveal ${p.delay}`}>
            <div className="work-img" style={{ background: p.bg }}>
              <div className="work-img-inner" style={{ background: p.innerBg }}>
                <div
                  className="work-device"
                  style={p.deviceRotate ? { transform: p.deviceRotate } : undefined}
                >
                  <div className="work-device-bar">
                    <div className="work-device-dot" style={{ background: '#ff5f57' }} />
                    <div className="work-device-dot" style={{ background: '#febc2e' }} />
                    <div className="work-device-dot" style={{ background: '#28c840' }} />
                  </div>

                  <div className="work-device-screen" style={{ background: p.screenBg }}>
                    <div
                      className="work-device-block"
                      style={{
                        gridColumn: '1/-1',
                        background: p.barColor,
                        borderRadius: 3,
                        height: 24,
                      }}
                    />
                    {p.blocks.map((bg, i) => (
                      <div
                        key={i}
                        className="work-device-block"
                        style={{ background: bg }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="work-overlay">
                <div className="work-view-btn">View Case Study →</div>
              </div>
            </div>

            <div className="work-info">
              <div className="work-tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="work-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="work-title">{p.title}</div>
              <div className="work-desc">{p.desc}</div>
              <a href="#" className="work-link">View Case Study →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
