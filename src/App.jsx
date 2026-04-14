import { useEffect, useState } from 'react';
import Cursor from './components/Cursor';
import Splash from './components/Splash';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import TechStack from './components/TechStack';
import Works from './components/Works';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  const [splashHiding, setSplashHiding] = useState(false);
  const [siteVisible, setSiteVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [splashGone, setSplashGone] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setSplashHiding(true);

      const removeTimer = setTimeout(() => {
        setSplashGone(true);
        setSiteVisible(true);
        setHeroVisible(true);
        initScrollReveal();
      }, 900);

      return () => clearTimeout(removeTimer);
    }, 3200);

    return () => clearTimeout(hideTimer);
  }, []);

  const initScrollReveal = () => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  };

  return (
    <>
      <Cursor />
      {!splashGone && <Splash hiding={splashHiding} />}

      <div id="site" className={siteVisible ? 'visible' : ''}>
        <Nav />
        <Hero visible={heroVisible} />
        <Marquee />
        <About />
        <TechStack />
        <Works />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
