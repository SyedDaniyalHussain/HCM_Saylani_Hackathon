export default function SectionTitle({ title, subtitle, action, onAction }) {
  return <div className="section-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button className="btn btn-secondary btn-small" onClick={onAction}>{action}</button>}</div>;
}
