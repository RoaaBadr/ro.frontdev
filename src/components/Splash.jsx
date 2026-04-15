import { useEffect, useState } from 'react';

export default function Splash({ hiding }) {
  const [count, setCount] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = Math.min(prev + 2, 100);
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="splash" className={hiding ? 'hide' : ''}>
      <div className="splash-grid" />
      <div className="splash-text-wrap">
        <div className="splash-hello">Portfolio — 2025</div>
        <div className="splash-name">
          ROA<span>A</span>
        </div>
        <div className="splash-role">Frontend Developer &amp; UI Designer</div>
      </div>
      {/* 
      // progress bar removed for cleaner look, can be re-added if needed
      
      <div className="splash-progress">
        <div className="splash-bar-bg">
          <div className="splash-bar-fill" />
        </div>
        <div className="splash-num">
          {String(count).padStart(3, '0')}
        </div>
      </div>*/}
    </div> 
  );
}
