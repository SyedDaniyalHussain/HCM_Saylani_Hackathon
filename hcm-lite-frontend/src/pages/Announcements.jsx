import { useState } from "react";
import { Megaphone, Plus, CalendarDays, ArrowUpRight, Search, Pin, Send } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import Modal from "../components/Modal";
import { readStore, writeStore, seedAnnouncements } from "../data";

const blank={title:"",category:"Company",date:"",body:""};
export default function Announcements(){
 const [items,setItems]=useState(()=>readStore("hcm_announcements",seedAnnouncements));
 const [query,setQuery]=useState("");
 const [show,setShow]=useState(false);
 const [form,setForm]=useState(blank);
 const [notice,setNotice]=useState("");
 const save=e=>{e.preventDefault();const next=[{...form,id:Date.now()},...items];setItems(next);writeStore("hcm_announcements",next);setShow(false);setForm(blank);setNotice("Announcement published in this demo.");setTimeout(()=>setNotice(""),2500);};
 const filtered=items.filter(x=>`${x.title} ${x.body} ${x.category}`.toLowerCase().includes(query.toLowerCase()));
 return <div className="page-stack">
 {notice&&<div className="toast-message">{notice}</div>}
 <div className="page-toolbar"><div className="toolbar-summary"><div className="toolbar-icon"><Megaphone size={20}/></div><div><strong>Company bulletin</strong><span>Share updates and important dates with your team.</span></div></div><button className="btn btn-primary" onClick={()=>setShow(true)}><Plus size={16}/> New announcement</button></div>
 <label className="table-search announcement-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search announcements..."/></label>
 <div className="announcement-grid">{filtered.map((item,i)=><article className={`announcement-card announcement-accent-${i%3}`} key={item.id}><div className="announcement-card-top"><span className="announcement-category"><Pin size={13}/>{item.category}</span><span className="announcement-date"><CalendarDays size={14}/>{new Date(`${item.date}T12:00:00`).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}</span></div><h2>{item.title}</h2><p>{item.body}</p><div className="announcement-card-bottom"><div className="avatar avatar-purple">DK</div><span><strong>Daniel Kim</strong><small>People Operations</small></span><span className="announcement-read">Team update <ArrowUpRight size={14}/></span></div></article>)}
 {filtered.length===0&&<div className="empty-state"><Megaphone size={24}/><strong>No announcements found</strong><span>Try another search or create an announcement.</span></div>}</div>
 {show&&<Modal title="New announcement" subtitle="Share an update with your workspace." onClose={()=>setShow(false)}><form className="modal-form" onSubmit={save}><label>Announcement title<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Team update"/></label><div className="form-two"><label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{["Company","Benefits","Culture","Policy","Events"].map(x=><option key={x}>{x}</option>)}</select></label><label>Date<input required type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label></div><label>Message<textarea required rows="5" value={form.body} onChange={e=>setForm({...form,body:e.target.value})} placeholder="Write your announcement..."/></label><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={()=>setShow(false)}>Cancel</button><button className="btn btn-primary"><Send size={15}/> Publish</button></div></form></Modal>}
 </div>;
}
