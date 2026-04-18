import { useState, useEffect } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { RiBehanceFill } from "react-icons/ri";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');

  .nav-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--black);
    display: flex;
    flex-direction: column;
    color: inherit;
  }

  /* ── NAV ── */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 72px;
    transition: background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease;
  }

  .navbar.scrolled {
    background: rgba(10, 10, 10, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    /* border-bottom: 1px solid rgba(245, 166, 35, 0.12); */
  }

  /* 🔥 TEXT SWITCHES HERE */
.navbar.scrolled .logo-name {
  color: var(--white);
}

.navbar.scrolled .nav-link {
  color: rgba(247, 245, 240, 0.6);
}

.navbar.scrolled .nav-link:hover,
.navbar.scrolled .nav-link.active {
  color: var(--white);
}

.navbar.scrolled .nav-icon-btn {
  color: rgba(247,245,240,0.6);
}

  /* ── LOGO ── */
  .logo {
    display: flex;
    align-items: center;
    gap: 0;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    position: relative;
  }

  .logo-bracket {
    font-family: 'DM Mono', monospace;
    font-weight: 300;
    font-size: 20px;
    color: var(--amber);
    line-height: 1;
    transition: color 0.25s;
    letter-spacing: -0.04em;
  }

  .logo-name {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 17px;
    color: var(--black);
    letter-spacing: 0.04em;
    padding: 0 3px;
    transition: color 0.25s;
  }

  .logo-slash {
    font-family: 'DM Mono', monospace;
    font-weight: 300;
    font-size: 20px;
    color: var(--amber);
    line-height: 1;
    letter-spacing: -0.06em;
    position: relative;
    transition: color 0.25s;
  }

  .logo-cursor {
    display: inline-block;
    width: 2px;
    height: 16px;
    background: var(--amber);
    margin-left: 2px;
    vertical-align: middle;
    animation: blink 1.1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .logo:hover .logo-name { color: var(--amber); }
  .logo:hover .logo-bracket,
  .logo:hover .logo-slash { color: var(--white); }

  /* ── NAV LINKS ── */
  .nav-center {
    display: flex;
    align-items: center;
    gap: 40px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .nav-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(15, 15, 14, 0.5);
    text-decoration: none;
    cursor: pointer;
    position: relative;
    padding-bottom: 3px;
    transition: color 0.25s;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: var(--amber);
    transition: width 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--black);
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    width: 100%;
  }

  /* ── NAV RIGHT ── */
  .nav-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .nav-icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.72);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    transition: color 0.25s, transform 0.25s;
  }

  .nav-icon-btn:hover {
    color: var(--amber);
    transform: translateY(-1px);
  }

  .nav-cta {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--black);
    background: var(--amber);
    border: none;
    padding: 10px 22px;
    cursor: pointer;
    transition: background 0.25s, transform 0.25s, gap 0.25s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-cta:hover {
    background: var(--amber-dark);
    transform: translateY(-1px);
    gap: 13px;
  }

  /* ── HAMBURGER ── */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    z-index: 200;
  }

  .hamburger span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: var(--white);
    transition: transform 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.25s;
    transform-origin: center;
  }

  .hamburger.open span:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }
  .hamburger.open span:nth-child(2) {
    opacity: 0; transform: scaleX(0);
  }
  .hamburger.open span:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }

  /* ── MOBILE DRAWER ── */
  .mobile-drawer {
    position: fixed;
    inset: 0;
    background: var(--black);
    z-index: 90;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transform: translateY(-100%);
    transition: transform 0.55s cubic-bezier(0.23,1,0.32,1);
  }

  .mobile-drawer.open {
    transform: translateY(0);
  }

  .mobile-drawer-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(245,166,35,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,166,35,0.04) 1px, transparent 1px);
    background-size: 52px 52px;
    pointer-events: none;
  }

  .mobile-nav-link {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 10vw, 80px);
    color: rgba(247,245,240,0.15);
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: color 0.25s, transform 0.25s;
    line-height: 1.05;
    position: relative;
  }

  .mobile-nav-link:hover {
    color: var(--white);
    transform: translateX(12px);
  }

  .mobile-nav-link:hover .mobile-link-num {
    color: var(--amber);
  }

  .mobile-link-num {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 300;
    color: transparent;
    letter-spacing: 0.1em;
    vertical-align: super;
    margin-right: 8px;
    transition: color 0.25s;
  }

  .mobile-drawer-footer {
    position: absolute;
    bottom: 36px;
    left: 48px;
    right: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 20px;
  }

  .mobile-footer-email {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 300;
    color: var(--mid);
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.25s;
  }

  .mobile-footer-email:hover { color: var(--amber); }

  .mobile-footer-icons {
    display: flex;
    gap: 16px;
  }

  .mobile-footer-icons a {
    color: var(--mid);
    transition: color 0.25s;
  }

  .mobile-footer-icons a:hover { color: var(--amber); }



  /* ── RESPONSIVE ── */
 @media (max-width: 480px) {
    .navbar {
      padding: 0 16px;
      height: 60px;
    }

    /* smaller logo */
    .logo-bracket,
    .logo-slash {
      font-size: 16px;
    }

    .logo-name {
      font-size: 14px;
    }

    .logo-cursor {
      height: 12px;
    }

    /* smaller icons */
    .nav-right {
      gap: 10px;
    }

    .nav-icon-btn {
      padding: 4px;
    }

    .nav-icon-btn svg {
      width: 14px;
      height: 14px;
    }

    .hamburger {
      display: flex;
    }
  }
`;

const NAV_LINKS = ["About", "Work", "Stack", "Contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [_, setActive] = useState("Work");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <style>{styles}</style>
      <div className="nav-root">

        {/* ── NAVBAR ── */}
        <nav className={`navbar${scrolled ? " scrolled" : ""}`}>

          {/* LOGO */}
          <a className="logo" href="#" onClick={() => setMenuOpen(false)}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">Roaa</span>
            <span className="logo-slash">/&gt;</span>
            <span className="logo-cursor" />
          </a>

          {/* CENTER LINKS */}
          {/* <div className="nav-center">
            {NAV_LINKS.map((link) => (
              <span
                key={link}
                className={`nav-link${active === link ? " active" : ""}`}
                onClick={() => setActive(link)}
              >
                {link}
              </span>
            ))}
          </div> */}

          {/* RIGHT */}
          <div className="nav-right">
            {/* Behance */}
            <a href="https://behance.com/roaa-badr" className="nav-icon-btn" title="Behance" aria-label="Behance">
              <RiBehanceFill size={20} className=""/>
            </a>
            {/* GitHub */}
            <a href="https://github.com/RoaaBadr" className="nav-icon-btn" title="GitHub" aria-label="GitHub">
              <FiGithub size={17} className=""/>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/in/roaa-badr/" className="nav-icon-btn" title="LinkedIn" aria-label="LinkedIn">
              <FiLinkedin size={17} className=""/>
            </a>
            {/* CTA */}
            {/* <button className="nav-cta" onClick={() => setActive("Contact")}>
              Hire me →
            </button> */}
            {/* Hamburger */}
            {/* <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button> */}
          </div>
        </nav>

        {/* ── MOBILE DRAWER ── */}
        <div className={`mobile-drawer${menuOpen ? " open" : ""}`}>
          <div className="mobile-drawer-grid" />
          {NAV_LINKS.map((link, i) => (
            <span
              key={link}
              className="mobile-nav-link"
              onClick={() => { setActive(link); setMenuOpen(false); }}
            >
              <span className="mobile-link-num">0{i + 1}</span>
              {link}
            </span>
          ))}
          <div className="mobile-drawer-footer">
            <a href="mailto:hello@roaa.dev" className="mobile-footer-email">
              hello@roaa.dev
            </a>
            <div className="mobile-footer-icons">
              <a href="#" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" aria-label="Dribbble">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72" />
                  <path d="M19.13 13.69a17.8 17.8 0 0 1-12.41 1.72" />
                  <path d="M2.17 10.28a17.8 17.8 0 0 1 12.6 3.94" />
                </svg>
              </a>
            </div>
          </div>
        </div>



      </div>
    </>
  );
}