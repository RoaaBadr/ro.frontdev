import '../css/Hero.css';
import { FiChevronsDown } from "react-icons/fi";
import { useEffect, useState } from "react";

function Hero() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(() => setShow(true), 100);
    }, []);

    return (
        <section className="hero">
            <div className="hero-left">
                <div className={`hero-greeting reveal ${show ? 'visible' : ''}`} id="hg"><b>Hello,</b> I am</div>
                <h1 className={`hero-title reveal ${show ? 'visible' : ''}`} id="ht">
                    FRONT <em>end</em><br />
                    DEVELOPER<span className="hero-dot">.</span>
                </h1>
            </div>
            <div className={`hero-right reveal ${show ? 'visible' : ''}`} id="hr">
                <p className="hero-desc">I like building websites that look good and feel easy to use. I care about the design, the details, and how everything works together.</p>
                <div className="hero-btns">
                    <a href="#works" className="btn-primary">View My Work <FiChevronsDown/></a>
                    <a href="#" className="btn-outline">Download CV</a>
                </div>
            </div>
        </section>
    );
}
export default Hero