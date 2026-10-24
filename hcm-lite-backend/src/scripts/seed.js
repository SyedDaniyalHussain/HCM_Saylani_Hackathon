import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';
import Leave from '../models/Leave.js';
import Payroll from '../models/Payroll.js';
import Announcement from '../models/Announcement.js';
import Setting from '../models/Setting.js';

const employees = [
  { employeeId:'EMP-1001', name:'Ayesha Khan', role:'Product Designer', department:'Design', email:'ayesha.khan@company.com', phone:'+92 300 1234567', status:'Active', joined:'2023-04-12', salary:145000 },
  { employeeId:'EMP-1002', name:'Hamza Ali', role:'Frontend Developer', department:'Engineering', email:'hamza.ali@company.com', phone:'+92 301 2345678', status:'Active', joined:'2022-11-03', salary:185000 },
  { employeeId:'EMP-1003', name:'Sara Ahmed', role:'HR Manager', department:'People', email:'sara.ahmed@company.com', phone:'+92 302 3456789', status:'Active', joined:'2021-07-19', salary:210000 },
  { employeeId:'EMP-1004', name:'Usman Tariq', role:'QA Engineer', department:'Engineering', email:'usman.tariq@company.com', phone:'+92 333 4567890', status:'On leave', joined:'2024-01-08', salary:125000 },
  { employeeId:'EMP-1005', name:'Mariam Noor', role:'Finance Officer', department:'Finance', email:'mariam.noor@company.com', phone:'+92 334 5678901', status:'Active', joined:'2023-09-25', salary:155000 },
  { employeeId:'EMP-1006', name:'Bilal Shah', role:'Marketing Executive', department:'Marketing', email:'bilal.shah@company.com', phone:'+92 335 6789012', status:'Inactive', joined:'2020-02-14', salary:110000 },
  { employeeId:'EMP-1007', name:'Zainab Malik', role:'Backend Developer', department:'Engineering', email:'zainab.malik@company.com', phone:'+92 336 7890123', status:'Active', joined:'2024-06-10', salary:175000 },
  { employeeId:'EMP-1008', name:'Danish Iqbal', role:'Accountant', department:'Finance', email:'danish.iqbal@company.com', phone:'+92 337 8901234', status:'Active', joined:'2022-03-01', salary:135000 }
];
try {
  await connectDB();
  const docs = [];
  for (const item of employees) docs.push(await Employee.findOneAndUpdate({employeeId:item.employeeId},{$set:item},{upsert:true,new:true,setDefaultsOnInsert:true}));
  const byName = Object.fromEntries(docs.map(e=>[e.name,e]));
  const date = (s) => new Date(`${s}T00:00:00.000Z`);
  const today = new Date().toISOString().slice(0,10);
  const attendance = [
    ['Ayesha Khan','Present','09:02 AM','05:11 PM'],['Hamza Ali','Present','08:48 AM','05:25 PM'],['Sara Ahmed','Late','09:15 AM','05:04 PM'],['Usman Tariq','On leave','—','—'],['Mariam Noor','Present','08:55 AM','05:09 PM'],['Bilal Shah','Absent','—','—'],['Zainab Malik','Present','09:01 AM','—'],['Danish Iqbal','Present','08:52 AM','05:18 PM']
  ];
  for (const [name,status,checkIn,checkOut] of attendance) await Attendance.findOneAndUpdate({employee:byName[name]._id,date:date(today)},{$set:{employee:byName[name]._id,date:date(today),status,checkIn,checkOut}},{upsert:true,new:true,setDefaultsOnInsert:true});
  const leaves = [
    {leaveId:'LV-301',name:'Usman Tariq',type:'Annual Leave',from:'2026-10-27',to:'2026-10-30',reason:'Family trip',status:'Pending'},
    {leaveId:'LV-302',name:'Ayesha Khan',type:'Sick Leave',from:'2026-10-20',to:'2026-10-21',reason:'Medical appointment',status:'Approved'},
    {leaveId:'LV-303',name:'Hamza Ali',type:'Casual Leave',from:'2026-11-03',to:'2026-11-03',reason:'Personal work',status:'Pending'},
    {leaveId:'LV-304',name:'Mariam Noor',type:'Annual Leave',from:'2026-10-15',to:'2026-10-17',reason:'Out of city',status:'Rejected'}
  ];
  for (const l of leaves) await Leave.findOneAndUpdate({leaveId:l.leaveId},{$set:{leaveId:l.leaveId,employee:byName[l.name]._id,type:l.type,from:date(l.from),to:date(l.to),reason:l.reason,status:l.status}},{upsert:true,new:true,setDefaultsOnInsert:true});
  const announcements = [
    {title:'Quarterly town hall',category:'Company',date:date('2026-10-28'),body:'Join the leadership team for quarterly updates and an open Q&A session at 3:00 PM.'},
    {title:'Open enrollment reminder',category:'Benefits',date:date('2026-10-26'),body:'Please review your benefits selections before the end of the month.'},
    {title:'Friday team lunch',category:'Culture',date:date('2026-10-30'),body:'Teams are invited to the office lunch area at 1:00 PM. Please confirm with People Ops.'}
  ];
  for (const a of announcements) await Announcement.findOneAndUpdate({title:a.title},{$set:a},{upsert:true,new:true,setDefaultsOnInsert:true});
  const month = today.slice(0,7);
  for (const e of docs) await Payroll.findOneAndUpdate({employee:e._id,month},{$set:{employee:e._id,month,basicSalary:e.salary,allowances:0,deductions:0,netSalary:e.salary,status:'Draft'}},{upsert:true,new:true,setDefaultsOnInsert:true});
  await Setting.findOneAndUpdate({key:'company'},{$setOnInsert:{key:'company',companyName:'HCM Lite',timezone:'Asia/Karachi',currency:'PKR',leaveApprovalRequired:true}},{upsert:true,new:true});
  console.log(`Seed complete: ${docs.length} employees and demo attendance, leaves, payroll, announcements, settings.`);
} catch (error) {
  console.error('Seed failed:', error.message);
  process.exitCode=1;
} finally { await mongoose.disconnect(); }
