import { useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal, Download, MoreHorizontal, Mail, Phone, Pencil, Trash2, UsersRound } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import { readStore, writeStore, seedEmployees, money } from "../data";

const blank = { name: "", role: "", department: "Engineering", email: "", phone: "", status: "Active", joined: new Date().toISOString().slice(0,10), salary: "" };
export default function Employees() {
  const [employees, setEmployees] = useState(() => readStore("hcm_employees", seedEmployees));
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [menuId, setMenuId] = useState(null);
  const [notice, setNotice] = useState("");
  const update = (next) => { setEmployees(next); writeStore("hcm_employees", next); };
  const filtered = useMemo(() => employees.filter(e => {
    const match = `${e.name} ${e.role} ${e.department} ${e.email} ${e.id}`.toLowerCase().includes(query.toLowerCase());
    return match && (filter === "All" || e.status === filter);
  }), [employees, query, filter]);
  const openAdd = () => { setEditing(null); setForm(blank); setShowModal(true); };
  const openEdit = (employee) => { setEditing(employee.id); setForm({ ...employee }); setShowModal(true); setMenuId(null); };
  const save = (e) => {
    e.preventDefault();
    if (editing) update(employees.map(item => item.id === editing ? { ...item, ...form, salary: Number(form.salary) || 0 } : item));
    else {
      const maxId = Math.max(1000, ...employees.map(x => Number(x.id.split("-")[1]) || 1000));
      const id = `EMP-${maxId + 1}`;
      update([{ ...form, id, salary: Number(form.salary) || 0, avatar: form.name.split(" ").map(x => x[0]).join("").slice(0,2).toUpperCase() }, ...employees]);
    }
    setShowModal(false); setNotice(editing ? "Employee details updated." : "Employee added successfully."); setTimeout(() => setNotice(""), 2600);
  };
  const remove = (id) => { if (window.confirm("Delete this employee from the demo list?")) update(employees.filter(e => e.id !== id)); setMenuId(null); };
  const exportCsv = () => {
    const header = ["ID","Name","Role","Department","Email","Status","Salary"];
    const rows = filtered.map(e => [e.id,e.name,e.role,e.department,e.email,e.status,e.salary]);
    const csv = [header,...rows].map(row => row.map(v => `"${String(v ?? "").replaceAll('"','""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a"); a.href = url; a.download = "hcm-employees.csv"; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <div className="page-stack">
      {notice && <div className="toast-message">{notice}</div>}
      <div className="page-toolbar"><div className="toolbar-summary"><div className="toolbar-icon"><UsersRound size={20} /></div><div><strong>{employees.length} employees</strong><span>Manage your employee directory</span></div></div><div className="toolbar-actions"><button className="btn btn-secondary" onClick={exportCsv}><Download size={16} /> Export</button><button className="btn btn-primary" onClick={openAdd}><Plus size={17} /> Add employee</button></div></div>
      <section className="panel table-panel">
        <div className="table-toolbar"><label className="table-search"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search employees..." /></label><div className="filter-group"><SlidersHorizontal size={16} /><select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter by status"><option>All</option><option>Active</option><option>On leave</option><option>Inactive</option></select></div></div>
        <div className="table-scroll"><table className="data-table"><thead><tr><th>EMPLOYEE</th><th>EMPLOYEE ID</th><th>DEPARTMENT</th><th>STATUS</th><th>JOINED DATE</th><th>SALARY</th><th></th></tr></thead><tbody>
          {filtered.map((e,i) => <tr key={e.id}><td><div className="employee-cell"><div className={`avatar avatar-${i % 5}`}>{e.avatar || e.name.split(" ").map(x => x[0]).join("")}</div><div><strong>{e.name}</strong><span>{e.role}</span></div></div></td><td><span className="employee-id">{e.id}</span></td><td>{e.department}</td><td><StatusBadge status={e.status} /></td><td>{new Date(`${e.joined}T12:00:00`).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}</td><td className="salary-cell">{money(Number(e.salary) || 0)}</td><td className="action-cell"><button className="icon-button row-more" onClick={() => setMenuId(menuId === e.id ? null : e.id)} aria-label={`Actions for ${e.name}`}><MoreHorizontal size={19} /></button>{menuId === e.id && <div className="row-menu"><button onClick={() => openEdit(e)}><Pencil size={14} /> Edit details</button><button className="danger-text" onClick={() => remove(e.id)}><Trash2 size={14} /> Delete employee</button></div>}</td></tr>)}
          {filtered.length === 0 && <tr><td colSpan="7"><div className="empty-state"><UsersRound size={24} /><strong>No employees found</strong><span>Try another search or add a new employee.</span></div></td></tr>}
        </tbody></table></div>
        <div className="table-footer"><span>Showing <strong>{filtered.length ? 1 : 0}–{filtered.length}</strong> of <strong>{filtered.length}</strong> employees</span><span className="demo-note">Demo data · Saved in this browser</span></div>
      </section>
      <div className="bottom-tip"><div className="tip-icon"><Mail size={17} /></div><div><strong>Keep your directory up to date</strong><p>Employee details you add here are saved locally in this browser.</p></div><button className="btn btn-secondary btn-small" onClick={exportCsv}>Export CSV <Download size={14} /></button></div>
      {showModal && <Modal title={editing ? "Edit employee" : "Add employee"} subtitle="Fill in the details below." onClose={() => setShowModal(false)}>
        <form className="modal-form" onSubmit={save}>
          <label>Full name<input required value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="e.g. Sana Ahmed" /></label>
          <label>Job title<input required value={form.role} onChange={e => setForm({...form,role:e.target.value})} placeholder="e.g. Product Designer" /></label>
          <label>Department<select value={form.department} onChange={e => setForm({...form,department:e.target.value})}>{["Engineering","Design","People","Finance","Marketing","Operations","Sales"].map(x => <option key={x}>{x}</option>)}</select></label>
          <label>Email address<input required type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="name@company.com" /></label>
          <label>Phone number<input value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="+92 300 0000000" /></label>
          <div className="form-two"><label>Monthly salary (PKR)<input required min="0" type="number" value={form.salary} onChange={e => setForm({...form,salary:e.target.value})} placeholder="150000" /></label><label>Status<select value={form.status} onChange={e => setForm({...form,status:e.target.value})}>{["Active","On leave","Inactive"].map(x => <option key={x}>{x}</option>)}</select></label></div>
          <label>Joining date<input required type="date" value={form.joined} onChange={e => setForm({...form,joined:e.target.value})} /></label>
          <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn btn-primary" type="submit">{editing ? "Save changes" : "Add employee"}</button></div>
        </form>
      </Modal>}
    </div>
  );
}
