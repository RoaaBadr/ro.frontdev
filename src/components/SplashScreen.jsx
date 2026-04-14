import { useEffect, useState } from "react";
import '../css/SplashScreen.css';

export default function SplashScreen({ onFinish }) {
  const [count, setCount] = useState(0);
  const [hide, setHide] = useState(false);

useEffect(() => {
    // Counter animation
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = Math.min(prev + 2, 100);
        if (next === 100) clearInterval(interval);
        return next;
      });
    }, 30);

    // Splash timing
    const timer = setTimeout(() => {
      setHide(true);

      setTimeout(() => {
        onFinish(); // tell App to show main content
      }, 900);
    }, 3200);

        return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className={`splash ${hide ? "hide" : ""}`}>

      <div id="splash">
        <div className="splash-grid"></div>
        <div className="splash-text-wrap">
          <div className="splash-hello">Portfolio — 2025</div>
          <div className="splash-name">ROA<span>A</span></div>
          <div className="splash-role">Frontend Developer &amp; UI Designer</div>
        </div>
        <div className="splash-progress">
          <div className="splash-bar-bg"><div className="splash-bar-fill"></div></div>
          <div className="splash-num" id="splashNum">000</div>
        </div>
      </div>

    </div>
  );
}
