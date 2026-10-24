import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, UserRound, RotateCcw, Lightbulb, UsersRound, CalendarDays, WalletCards } from "lucide-react";
import { readStore, seedEmployees, seedLeaves, money } from "../data";

const starters=["How many active employees do we have?","Summarize pending leave requests","What is the monthly salary total?"];
function answerFor(q){
 const employees=readStore("hcm_employees",seedEmployees), leaves=readStore("hcm_leaves",seedLeaves);
 const active=employees.filter(e=>e.status==="Active");
 const pending=leaves.filter(l=>l.status==="Pending");
 const salary=active.reduce((s,e)=>s+(Number(e.salary)||0),0);
 const text=q.toLowerCase();
 if(text.includes("active")||text.includes("employee")||text.includes("headcount")) return `There are ${active.length} active employees in the current demo directory, out of ${employees.length} listed employee records. The largest listed department is Engineering.`;
 if(text.includes("leave")||text.includes("time off")||text.includes("request")) return pending.length?`There are ${pending.length} pending leave request(s): ${pending.map(l=>`${l.employee} (${l.type}, ${l.days} day${l.days===1?"":"s"})`).join("; ")}. You can review these in Leave management.`:"There are no pending leave requests in the current demo data.";
 if(text.includes("salary")||text.includes("payroll")||text.includes("cost")) return `The monthly salary sum for active employees in the current demo directory is ${money(salary)}. This is an illustrative total only and does not include taxes, benefits, or payroll adjustments.`;
 if(text.includes("attendance")||text.includes("present")) return "Open Attendance to review today's sample check-in records and update each employee's status. The attendance data in this demo is editable and stored locally in your browser.";
 if(text.includes("help")||text.includes("what can you")) return "I can answer basic questions using this frontend's sample employee, leave, and salary data. Try asking about active employees, pending leave requests, salary totals, or attendance.";
 return "I can help with simple questions about the demo data, such as employee counts, pending leave requests, monthly salary totals, and attendance. This assistant runs locally with predefined logic; it is not connected to a real AI model or backend.";
}
export default function Assistant(){
 const [messages,setMessages]=useState([{role:"assistant",text:"Hi Daniel! 👋 I'm your HCM assistant. Ask me a question about your team's demo data, or choose a suggestion below to get started."}]);
 const [input,setInput]=useState("");
 const [thinking,setThinking]=useState(false);
 const endRef=useRef(null);
 useEffect(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),[messages]);
 const send=(value=input)=>{const q=value.trim();if(!q||thinking)return;setMessages(m=>[...m,{role:"user",text:q}]);setInput("");setThinking(true);window.setTimeout(()=>{setMessages(m=>[...m,{role:"assistant",text:answerFor(q)}]);setThinking(false);},350);};
 const reset=()=>setMessages([{role:"assistant",text:"Chat cleared. What would you like to know about your team?"}]);
 return <div className="assistant-layout">
  <section className="panel assistant-chat"><div className="chat-header"><div className="assistant-avatar"><Sparkles size={20}/></div><div><strong>HCM AI assistant</strong><span><i className="online-dot"/> Demo assistant · Ready to help</span></div><button className="icon-button" onClick={reset} title="Clear chat"><RotateCcw size={17}/></button></div>
   <div className="chat-messages">{messages.map((m,i)=><div className={`chat-message ${m.role}`} key={i}><div className={`chat-bubble-avatar ${m.role==="assistant"?"bot":"human"}`}>{m.role==="assistant"?<Bot size={16}/>:<UserRound size={16}/>}</div><div className="chat-message-content"><span className="chat-sender">{m.role==="assistant"?"HCM Assistant":"You"}</span><div className="chat-bubble">{m.text}</div></div></div>)}{thinking&&<div className="chat-message assistant"><div className="chat-bubble-avatar bot"><Bot size={16}/></div><div className="chat-bubble typing">Thinking<span>.</span><span>.</span><span>.</span></div></div>}<div ref={endRef}/></div>
   <div className="chat-composer"><form onSubmit={e=>{e.preventDefault();send();}}><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about your team..." aria-label="Message assistant"/><button className="send-button" type="submit" disabled={!input.trim()||thinking} aria-label="Send message"><Send size={17}/></button></form><small>Demo only · Don't enter confidential employee information.</small></div>
  </section>
  <aside className="assistant-aside"><div className="assistant-intro"><div className="assistant-large-icon"><Sparkles size={24}/></div><h2>Your people co-pilot</h2><p>Get quick answers about the sample information in this HCM Lite demo.</p></div><div className="panel suggestion-panel"><h3><Lightbulb size={16}/> Try asking</h3>{starters.map((s,i)=><button className="suggestion-button" key={s} onClick={()=>send(s)}>{i===0?<UsersRound size={16}/>:i===1?<CalendarDays size={16}/>:<WalletCards size={16}/>}<span>{s}</span><Send size={13}/></button>)}</div><div className="assistant-disclaimer"><Sparkles size={16}/><p><strong>Prototype assistant</strong><br/>Answers are generated from local sample data using simple rules. No external AI service is connected.</p></div></aside>
 </div>;
}
