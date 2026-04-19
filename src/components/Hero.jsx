import { GoArrowUpRight } from "react-icons/go";
export default function Hero({ visible }) {
  return (
    <section className="hero">
      <div className="hero-content">

        <div className="hero-wrap">
          <div className={`hero-greeting${visible ? ' visible' : ''}`}>
            <b>Hello,</b> I am
          </div>

          <h1 className={`hero-title${visible ? ' visible' : ''}`}>
            FRONT <em>end</em><br />DEVELOPER
            <span className="hero-dot">.</span>
          </h1>
        </div>

        <p className={`hero-desc${visible ? ' visible' : ''}`}>
          CS graduate with a passion for front-end development and thoughtful
          design. I build calm, well-crafted websites where every detail - layout,
          typography, and interaction - feels considered and intentional.
        </p>

        <div className={`hero-btns${visible ? ' visible' : ''}`}>
          <a href="#works" className="btn-primary">View My Work</a>
          <a href="/Roaa_Mohamed_CV_2025.pdf" rel="noreferrer" target="_blank" className="btn-outline">Resume <GoArrowUpRight/></a>
          {/* <a href="/Roaa_Mohamed_CV_2025.pdf" download className="btn-outline">Download CV</a> */}
        </div>

      </div>
    </section>
  );
}
