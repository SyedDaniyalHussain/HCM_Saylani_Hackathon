import { Bell, Search, ChevronDown, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const pageTitles = {
  "/": ["Dashboard", "Here's what's happening with your team today."],
  "/employees": ["Employees", "Manage your people, all in one place."],
  "/attendance": ["Attendance", "Track attendance and daily working hours."],
  "/leaves": ["Leave management", "Review requests and keep time off organized."],
  "/payroll": ["Payroll", "Review payroll information and salary summaries."],
  "/reports": ["Reports & analytics", "Understand your people operations at a glance."],
  "/announcements": ["Announcements", "Keep everyone informed and connected."],
  "/assistant": ["AI assistant", "Your helpful companion for people operations."],
  "/settings": ["Settings", "Manage your workspace preferences."]
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, subtitle] = pageTitles[location.pathname] || pageTitles["/"];
  return (
    <header className="top-header">
      <div className="page-heading"><div className="breadcrumb">Workspace <span>/</span> <strong>{title}</strong></div><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="header-actions">
        <label className="global-search"><Search size={17} /><input placeholder="Search anything..." onKeyDown={(e) => { if (e.key === "Enter" && e.currentTarget.value.trim()) navigate("/employees"); }} /><kbd>⌘ K</kbd></label>
        <button className="icon-button notification-button" aria-label="Notifications" onClick={() => window.alert("You're all caught up!") }><Bell size={19} /><i /></button>
        <div className="header-divider" />
        <button className="header-profile" onClick={() => navigate("/settings")}><div className="avatar avatar-purple">DK</div><span><strong>Daniel Kim</strong><small>Administrator</small></span><ChevronDown size={15} /></button>
      </div>
    </header>
  );
}
