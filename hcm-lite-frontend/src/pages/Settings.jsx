import { useState } from "react";
import { Settings as SettingsIcon, UserRound, Bell, ShieldCheck, Palette, Save, RotateCcw } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { readStore, writeStore } from "../data";

const initial={workspace:"Northstar Studio",email:"admin@northstar.example",timezone:"Asia/Karachi",weekStart:"Monday",emailNotifications:true,leaveAlerts:true,weeklySummary:false,density:"Comfortable"};
export default function Settings(){
 const [settings,setSettings]=useState(()=>readStore("hcm_settings",initial));
 const [notice,setNotice]=useState("");
 const update=(key,value)=>setSettings(s=>({...s,[key]:value}));
 const save=()=>{writeStore("hcm_settings",settings);setNotice("Settings saved in this browser.");setTimeout(()=>setNotice(""),2500);};
 const reset=()=>{setSettings(initial);writeStore("hcm_settings",initial);setNotice("Settings reset to defaults.");setTimeout(()=>setNotice(""),2500);};
 return <div className="page-stack">
 {notice&&<div className="toast-message">{notice}</div>}
 <div className="settings-layout"><nav className="settings-nav"><button className="settings-nav-item active"><UserRound size={17}/> General</button><button className="settings-nav-item" onClick={()=>document.getElementById("notifications")?.scrollIntoView({behavior:"smooth"})}><Bell size={17}/> Notifications</button><button className="settings-nav-item" onClick={()=>document.getElementById("preferences")?.scrollIntoView({behavior:"smooth"})}><Palette size={17}/> Preferences</button><button className="settings-nav-item" onClick={()=>window.alert("Security controls are not connected in this frontend demo.")}><ShieldCheck size={17}/> Security</button></nav>
 <div className="settings-content">
 <section className="panel settings-panel"><SectionTitle title="Workspace settings" subtitle="Manage basic information about your workspace."/><div className="settings-form"><label>Workspace name<input value={settings.workspace} onChange={e=>update("workspace",e.target.value)}/></label><label>Admin email<input type="email" value={settings.email} onChange={e=>update("email",e.target.value)}/></label><label>Timezone<select value={settings.timezone} onChange={e=>update("timezone",e.target.value)}>{["Asia/Karachi","Asia/Dubai","Europe/London","America/New_York","UTC"].map(x=><option key={x}>{x}</option>)}</select></label><label>First day of the week<select value={settings.weekStart} onChange={e=>update("weekStart",e.target.value)}><option>Monday</option><option>Sunday</option></select></label></div></section>
 <section className="panel settings-panel" id="notifications"><SectionTitle title="Notifications" subtitle="Choose the updates you want to receive."/>{[["emailNotifications","Email notifications","Receive general workspace updates by email."],["leaveAlerts","Leave request alerts","Get notified when a leave request needs review."],["weeklySummary","Weekly summary","Receive a weekly overview of people operations."]].map(([key,title,desc])=><div className="setting-toggle-row" key={key}><div><strong>{title}</strong><p>{desc}</p></div><button role="switch" aria-checked={settings[key]} className={`toggle-switch ${settings[key]?"on":""}`} onClick={()=>update(key,!settings[key])}><i/></button></div>)}</section>
 <section className="panel settings-panel" id="preferences"><SectionTitle title="Display preferences" subtitle="Adjust how the workspace feels to you."/><label className="settings-inline-label">Interface density<select value={settings.density} onChange={e=>update("density",e.target.value)}><option>Comfortable</option><option>Compact</option></select></label><div className="settings-info"><ShieldCheck size={18}/><span>These are local demo settings. Authentication and organization-wide controls require a backend.</span></div></section>
 <div className="settings-footer"><button className="btn btn-secondary" onClick={reset}><RotateCcw size={15}/> Reset defaults</button><button className="btn btn-primary" onClick={save}><Save size={15}/> Save changes</button></div>
 </div></div>
 </div>;
}
