import '../css/Hero.css';
import { FiChevronsDown } from "react-icons/fi";

function Hero () {
  return (
    <section className="hero">
      <div className="container">
        {/** Right Side */}
        <p>Hello, I am a</p>
        <h1>FRONT <span>end</span> DEVELOPER.</h1>

        {/** Left Side */}
        <p>I like building websites that look good and feel easy to use. 
            I care about the design, the details, and how everything 
            works together.
        </p>
        <button><a href="#projects">View Projects</a> <FiChevronsDown /></button>
        <button><a href="https://example.com/cv.pdf" target="_blank" rel="noopener noreferrer">Download CV</a></button>
      </div>
    </section>
  );
}
export default Hero