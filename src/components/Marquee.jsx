const items = [
  'UI/UX Interfaces',
  'Responsive Design',
  'Frontend Development',
  'React',
  'UI Design',
  'Next.js',
  'Motion Design',
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="marquee-item" key={i}>
            {item} <span className="marquee-sep">◈</span>
          </div>
        ))}
      </div>
    </div>
  );
}