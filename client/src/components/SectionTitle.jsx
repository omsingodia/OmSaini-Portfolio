export default function SectionTitle({ eyebrow, title, intro }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}
