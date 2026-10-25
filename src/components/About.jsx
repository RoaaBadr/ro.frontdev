export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-bg-text">ABOUT</div>
      <div className="about-left reveal">
        <div className="section-label">About</div>
        <h2 className="about-heading">
          Hi, I’m<br /><span>Roaa</span>
        </h2>
      </div>
      <div className="about-right reveal reveal-delay-2">
        <p>
          I’m a Junior Frontend Developer based in Giza, Egypt. I studied
          Computer Science, then completed the 9-month Web &amp; UI Development
          diploma at ITI, where I started building React applications connected
          to real REST APIs.
        </p>
        <p>
          I enjoy turning Figma designs into responsive, easy-to-use
          interfaces. In ShipConnect, a logistics platform, I built the
          dashboard and the authentication flow. In Nafsi, a mental health
          support platform, I built the frontend, and the project won 3rd place
          nationally in the Entrepreneurship Track.
        </p>
        <p>
          I’m looking for a junior frontend role in a product team, where I can
          learn from experienced developers and take ownership of real
          features.
        </p>
      </div>
    </section>
  );
}