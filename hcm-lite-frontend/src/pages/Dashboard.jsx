import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UsersRound, UserCheck, CalendarDays, Wallet, ArrowUpRight, Plus, Download, Clock3, CircleCheck, CircleX, MoreHorizontal, Sparkles, ChevronRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import StatCard from "../components/StatCard";
import SectionTitle from "../components/SectionTitle";
import StatusBadge from "../components/StatusBadge";
import { readStore, seedEmployees, seedLeaves, seedAttendance, money } from "../data";

const headcount = [
  { month: "May", employees: 62, hires: 4 }, { month: "Jun", employees: 66, hires: 5 },
  { month: "Jul", employees: 70, hires: 3 }, { month: "Aug", employees: 73, hires: 6 },
  { month: "Sep", employees: 78, hires: 4 }, { month: "Oct", employees: 84, hires: 7 }
];
const departmentData = [
  { name: "Engineering", value: 32 }, { name: "Design", value: 18 }, { name: "Marketing", value: 14 },
  { name: "Finance", value: 12 }, { name: "People", value: 8 }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const employees = readStore("hcm_employees", seedEmployees);
  const leaves = readStore("hcm_leaves", seedLeaves);
  const attendance = readStore("hcm_attendance", seedAttendance);
  const activeCount = useMemo(() => employees.filter(e => e.status === "Active").length, [employees]);
  const pending = leaves.filter(l => l.status === "Pending");
  const present = attendance.filter(a => a.status === "Present").length;
  return (
    <div className="page-stack">
      <div className="welcome-banner">
        <div className="welcome-copy"><div className="eyebrow"><span className="eyebrow-dot" /> MONDAY, OCTOBER 26, 2026</div><h2>Good morning, Daniel <span>✦</span></h2><p>Your team is growing. Here's your people overview for today.</p><div className="welcome-actions"><button className="btn btn-white" onClick={() => navigate("/employees")}><UsersRound size={16} /> View team <ArrowUpRight size={15} /></button><button className="banner-link" onClick={() => navigate("/reports")}>Explore reports <ChevronRight size={15} /></button></div></div>
        <div className="welcome-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-glow" /><div className="art-card art-card-back"><span className="mini-dot" /><span className="art-line long" /><span className="art-line short" /></div><div className="art-card art-card-front"><div className="art-avatars"><span>AK</span><span>HA</span><span>MN</span><span>+8</span></div><strong>People first.</strong><small>Better work, together.</small><div className="art-progress"><i /></div></div><div className="art-spark">✦</div></div>
      </div>

      <div className="stat-grid">
        <StatCard label="Total employees" value={String(employees.length + 76)} change="+12.8%" note="vs. last month" icon={UsersRound} tone="violet" />
        <StatCard label="Active employees" value={String(activeCount + 73)} change="+4.2%" note="vs. last month" icon={UserCheck} tone="mint" />
        <StatCard label="Present today" value={`${Math.min(96, Math.round((present + 67) / (employees.length + 76) * 100))}%`} change="+2.4%" note="vs. last week" icon={Clock3} tone="blue" />
        <StatCard label="Pending requests" value={String(pending.length + 5)} change="-8.1%" note="vs. last month" icon={CalendarDays} tone="orange" trend="down" />
      </div>

      <div className="dashboard-grid">
        <section className="panel headcount-panel">
          <SectionTitle title="Headcount overview" subtitle="Your team's growth over the last 6 months" action="View report" onAction={() => navigate("/reports")} />
          <div className="chart-legend"><span><i className="legend-dot violet-dot" /> Total employees</span><span><i className="legend-dot mint-dot" /> New hires</span><span className="chart-period">Last 6 months⌄</span></div>
          <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={headcount} margin={{ top: 8, right: 6, left: -20, bottom: 0 }}><defs><linearGradient id="employeeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8270ed" stopOpacity={0.22} /><stop offset="95%" stopColor="#8270ed" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid stroke="#edf0f6" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8991a5", fontSize: 12 }} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#8991a5", fontSize: 11 }} domain={[50, 90]} ticks={[50,60,70,80,90]} /><Tooltip contentStyle={{ border: "1px solid #ececf5", borderRadius: 12, boxShadow: "0 8px 24px #25244a12" }} /><Area type="monotone" dataKey="employees" stroke="#8270ed" strokeWidth={2.5} fill="url(#employeeFill)" activeDot={{ r: 5 }} /></AreaChart></ResponsiveContainer></div>
        </section>

        <section className="panel department-panel">
          <SectionTitle title="Team distribution" subtitle="Employees by department" action="View all" onAction={() => navigate("/employees")} />
          <div className="department-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={departmentData} layout="vertical" margin={{ top: 0, right: 4, left: 4, bottom: 0 }}><XAxis type="number" hide /><YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={91} tick={{ fill: "#6f778b", fontSize: 11 }} /><Tooltip cursor={{ fill: "#f7f6ff" }} /><Bar dataKey="value" fill="#8b7bf0" radius={[0,5,5,0]} barSize={10} /></BarChart></ResponsiveContainer></div>
          <div className="department-foot"><span><i className="legend-dot violet-dot" /> 84 total team members</span><span className="department-change">+6 this month</span></div>
        </section>
      </div>

      <div className="dashboard-grid lower-grid">
        <section className="panel requests-panel">
          <SectionTitle title="Leave requests" subtitle="Review requests that need your attention" action="View all" onAction={() => navigate("/leaves")} />
          <div className="request-list">{leaves.slice(0, 3).map((leave, i) => <div className="request-row" key={leave.id}><div className={`avatar request-avatar avatar-${i}`}>{leave.employee.split(" ").map(n => n[0]).join("")}</div><div className="request-info"><strong>{leave.employee}</strong><span>{leave.type} · {leave.days} {leave.days === 1 ? "day" : "days"}</span></div><div className="request-actions">{leave.status === "Pending" ? <><button className="round-action approve" title="Approve request" onClick={() => navigate("/leaves")}><CircleCheck size={17} /></button><button className="round-action reject" title="Review request" onClick={() => navigate("/leaves")}><CircleX size={17} /></button></> : <StatusBadge status={leave.status} />}</div></div>)}</div>
          <button className="text-link full-link" onClick={() => navigate("/leaves")}>Manage leave requests <ArrowUpRight size={14} /></button>
        </section>
        <section className="panel activity-panel">
          <SectionTitle title="Recent activity" subtitle="The latest updates across your workspace" />
          <div className="activity-list">
            <div className="activity-item"><div className="activity-icon activity-violet"><UsersRound size={16} /></div><div><p><strong>New employee onboarded</strong><span> Zainab Malik joined Engineering</span></p><small>35 minutes ago</small></div></div>
            <div className="activity-item"><div className="activity-icon activity-green"><CircleCheck size={16} /></div><div><p><strong>Leave request approved</strong><span> Ayesha Khan's leave was approved</span></p><small>2 hours ago</small></div></div>
            <div className="activity-item"><div className="activity-icon activity-orange"><Wallet size={16} /></div><div><p><strong>Payroll draft is ready</strong><span> October payroll summary updated</span></p><small>Yesterday at 4:20 PM</small></div></div>
          </div>
          <button className="text-link full-link" onClick={() => navigate("/reports")}>View activity log <ArrowUpRight size={14} /></button>
        </section>
      </div>
      <div className="bottom-tip"><div className="tip-icon"><Sparkles size={17} /></div><div><strong>Make people operations feel effortless</strong><p>Explore your AI assistant for quick answers about your team and HR workflows.</p></div><button className="btn btn-secondary btn-small" onClick={() => navigate("/assistant")}>Try AI assistant <ArrowUpRight size={14} /></button></div>
    </div>
  );
}
