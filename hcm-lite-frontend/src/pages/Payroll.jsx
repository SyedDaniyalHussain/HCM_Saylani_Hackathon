import { useMemo, useState } from "react";
import { WalletCards, Download, Search, CalendarDays, CircleCheck, Clock3, FileText } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import StatusBadge from "../components/StatusBadge";
import { readStore, seedEmployees, money } from "../data";

export default function Payroll() {
  const employees = readStore("hcm_employees",seedEmployees);
  const [query,setQuery] = useState("");
  const [period,setPeriod] = useState("October 2026");
  const active = employees.filter(e=>e.status==="Active");
  const total = active.reduce((n,e)=>n+(Number(e.salary)||0),0)+12800000;
  const rows = useMemo(()=>employees.filter(e=>`${e.name} ${e.role} ${e.department}`.toLowerCase().includes(query.toLowerCase())),[employees,query]);
  const download=()=>{const csv=[["Employee ID","Employee","Department","Monthly salary","Status"],...rows.map(e=>[e.id,e.name,e.department,e.salary,e.status])].map(r=>r.join(",")).join("\n");const url=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));const a=document.createElement("a");a.href=url;a.download="payroll-summary.csv";a.click();URL.revokeObjectURL(url);};
  return <div className="page-stack">
    <div className="payroll-banner"><div><div className="eyebrow"><span className="eyebrow-dot"/> PAYROLL OVERVIEW</div><h2>{period} payroll</h2><p>Review salary totals and employee compensation.</p></div><div className="payroll-banner-actions"><label className="period-select"><CalendarDays size={16}/><select value={period} onChange={e=>setPeriod(e.target.value)}>{["October 2026","September 2026","August 2026","July 2026"].map(x=><option key={x}>{x}</option>)}</select></label><button className="btn btn-white" onClick={download}><Download size={16}/> Export payroll</button></div></div>
    <div className="stat-grid compact-stats"><div className="mini-stat"><div className="stat-icon violet"><WalletCards size={18}/></div><span>Estimated payroll</span><strong>{money(total)}</strong><small>Monthly salary estimate</small></div><div className="mini-stat"><div className="stat-icon mint"><UsersRoundFallback/></div><span>Employees on payroll</span><strong>{active.length+73}</strong><small>Active employees</small></div><div className="mini-stat"><div className="stat-icon blue"><CircleCheck size={18}/></div><span>Payroll status</span><strong className="status-word">In review</strong><small>Demo payroll cycle</small></div><div className="mini-stat"><div className="stat-icon orange"><Clock3 size={18}/></div><span>Next payday</span><strong>31 Oct</strong><small>Estimated date</small></div></div>
    <section className="panel table-panel"><SectionTitle title="Employee salary overview" subtitle="Monthly salary details for the selected payroll period."/><div className="table-toolbar"><label className="table-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search employees..."/></label><button className="btn btn-secondary btn-small" onClick={download}><Download size={15}/> Export CSV</button></div><div className="table-scroll"><table className="data-table"><thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>BASE SALARY / MONTH</th><th>ANNUAL ESTIMATE</th><th>EMPLOYMENT STATUS</th></tr></thead><tbody>{rows.map((e,i)=><tr key={e.id}><td><div className="employee-cell"><div className={`avatar avatar-${i%5}`}>{e.avatar}</div><div><strong>{e.name}</strong><span>{e.role}</span></div></div></td><td>{e.department}</td><td className="salary-cell">{money(Number(e.salary)||0)}</td><td>{money((Number(e.salary)||0)*12)}</td><td><StatusBadge status={e.status}/></td></tr>)}</tbody></table></div><div className="table-footer"><span>{rows.length} employee records</span><span className="demo-note">Illustrative amounts · Not a real payroll system</span></div></section>
    <div className="bottom-tip"><div className="tip-icon"><FileText size={17}/></div><div><strong>Payroll is a demo view</strong><p>No bank transfers, tax calculations, or payslips are processed by this frontend.</p></div></div>
  </div>;
}
function UsersRoundFallback(){return <WalletCards size={18}/>}
