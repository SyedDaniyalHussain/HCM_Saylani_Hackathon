import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, UsersRound, CalendarCheck, CalendarDays, WalletCards,
  ChartNoAxesCombined, Megaphone, Settings, Sparkles, ChevronLeft, BriefcaseBusiness
} from "lucide-react";

const groups = [
  { label: "WORKSPACE", items: [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/employees", label: "Employees", icon: UsersRound },
    { to: "/attendance", label: "Attendance", icon: CalendarCheck },
    { to: "/leaves", label: "Leave management", icon: CalendarDays },
    { to: "/payroll", label: "Payroll", icon: WalletCards }
  ]},
  { label: "INSIGHTS", items: [
    { to: "/reports", label: "Reports & analytics", icon: ChartNoAxesCombined },
    { to: "/announcements", label: "Announcements", icon: Megaphone }
  ]},
  { label: "TOOLS", items: [
    { to: "/assistant", label: "AI assistant", icon: Sparkles },
    { to: "/settings", label: "Settings", icon: Settings }
  ]}
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><BriefcaseBusiness size={21} /></div>
        <div><div className="brand-name">hcm<span>lite</span></div><div className="brand-caption">PEOPLE OPERATIONS</div></div>
        <button className="icon-button sidebar-collapse" aria-label="Sidebar menu"><ChevronLeft size={17} /></button>
      </div>
      <div className="workspace-switch">
        <div className="workspace-icon">N</div>
        <div className="workspace-copy"><strong>Northstar Studio</strong><span>Workspace</span></div>
        <span className="switch-dots">•••</span>
      </div>
      <nav className="side-nav">
        {groups.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="nav-label">{group.label}</div>
            {group.items.map(({ to, label, icon: Icon, end }) => (
              <NavLink to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} key={to}>
                <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
                {to === "/assistant" && <span className="new-pill">NEW</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card"><div className="help-icon"><Sparkles size={17} /></div><strong>Need a hand?</strong><p>Visit our help center to get the most out of HCM Lite.</p><button onClick={() => window.alert("Help center demo")}>Visit help center <span>↗</span></button></div>
        <div className="sidebar-user"><div className="avatar avatar-purple">DK</div><div className="sidebar-user-copy"><strong>Daniel Kim</strong><span>Admin account</span></div><button className="more-button" aria-label="Account options">•••</button></div>
      </div>
    </aside>
  );
}
