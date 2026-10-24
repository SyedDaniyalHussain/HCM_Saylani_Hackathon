import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatCard({ label, value, change, note, icon: Icon, tone = "violet", trend = "up" }) {
  return (
    <article className="stat-card">
      <div className="stat-card-top"><span>{label}</span><div className={`stat-icon ${tone}`}><Icon size={19} /></div></div>
      <div className="stat-value">{value}</div>
      <div className="stat-foot"><span className={`trend ${trend}`}>{trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{change}</span><span>{note}</span></div>
    </article>
  );
}
