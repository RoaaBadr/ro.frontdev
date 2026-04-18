import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectData from '../../data/projects.json';

const projects = projectData.projects;
const filters = ['All Projects', 'Web Apps', 'UI/UX Design'];

export default function Works() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Projects');

const filteredProjects = projects.filter((p) => {
  if (activeFilter === 'All Projects') return true;
  if (activeFilter === 'Web Apps') return p.type === 'Web Apps';
  if (activeFilter === 'UI/UX Design') return p.type === 'UI/UX Design';
  return true;
});

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
        {filteredProjects.map((p) => (
          <div
            key={p.title}
            className={`work-card ${activeFilter}`}
            onClick={() => navigate(`/project/${p.id}`)}
          >
            {/* Update device mockup with real images */}
            <div className="work-img" style={{ background: p.bg }}>

              <img src={p.image} alt={p.title} className="work-img-real" />

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
