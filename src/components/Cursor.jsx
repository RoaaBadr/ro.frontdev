import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let animId;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px';
        cursorRef.current.style.top = my + 'px';
      }
    };

    const animRing = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      animId = requestAnimationFrame(animRing);
    };

    animRing();
    document.addEventListener('mousemove', onMove);

    const isHoverable = (el) =>
      el.matches('a, button, .work-card, .tech-card') ||
      el.closest('a, button, .work-card, .tech-card');

    const onMouseOver = (e) => {
      if (e.target instanceof Element && isHoverable(e.target)) {
        setHovered(true);
      }
    };

    const onMouseOut = (e) => {
      if (e.target instanceof Element && isHoverable(e.target)) {
        setHovered(false);
      }
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`cursor${hovered ? ' hovered' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring${hovered ? ' hovered' : ''}`}
      />
    </>
  );
}

