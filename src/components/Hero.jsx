export default function Hero({ visible }) {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className={`hero-greeting${visible ? ' visible' : ''}`}>
          <b>Hello,</b> I am
        </div>
        <h1 className={`hero-title${visible ? ' visible' : ''}`}>
          FRONT <em>end</em><br />DEVELOPER
          <span className="hero-dot">.</span>
        </h1>
      </div>
      <div className={`hero-right${visible ? ' visible' : ''}`}>
        <p className="hero-desc">
          I like building websites that look good and feel easy to use. I care about the design, the details, and how everything works together.
        </p>
        <div className="hero-btns">
          <a href="#works" className="btn-primary">View My Work →</a>
          <a href="#" className="btn-outline">Download CV</a>
        </div>
      </div>
    </section>
  );
}
