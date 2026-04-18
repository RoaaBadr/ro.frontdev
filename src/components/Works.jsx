import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectData from '../../data/projects.json';

const projects = projectData.projects;
const filters = ['All Projects', 'Web Apps', 'UI/UX Design'];

export default function Works() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Projects');

  return (
    <section className="works" id="works">
      <div className="section-header reveal">
        <h2 className="section-title">Selected Works</h2>
        {/* <span className="section-sub">2023 — 2025</span> */}
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
        {(projects || []).map((p) => (
          <div
            key={p.title}
            className={`work-card reveal ${p.delay}`}
            onClick={() => navigate(`/project/${p.id}`)}
          >
            {/* The device mockup */}
            <div className="work-img" style={{ background: p.bg }}>
              <div className="work-img-inner" style={{ background: p.innerBg }}>
                <div
                  className="work-device"
                  // style={p.deviceRotate ? { transform: p.deviceRotate } : undefined}
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

              <span className="work-link">
                View Case Study →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
