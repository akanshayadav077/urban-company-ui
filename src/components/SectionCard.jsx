export default function SectionCard({ title, subtitle, children, className = '' }) {
  return (
    <section className={`section-card ${className}`}>
      <header className="section-header">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      {children}
    </section>
  );
}
