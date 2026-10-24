import { Router } from 'express';
import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';
import Leave from '../models/Leave.js';
import Payroll from '../models/Payroll.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendData, parsePagination } from '../utils/http.js';
const router = Router();
const serialize = (doc) => { const x = doc.toObject ? doc.toObject() : doc; return { ...x, id: x.employeeId || String(x._id), joined: x.joined ? new Date(x.joined).toISOString().slice(0,10) : '' }; };
router.get('/', asyncHandler(async (req, res) => {
  const { page, limit, skip } = parsePagination(req); const filter = {};
  if (req.query.status && req.query.status !== 'All') filter.status = req.query.status;
  if (req.query.department) filter.department = req.query.department;
  if (req.query.search) filter.$or = ['name','role','department','email','employeeId'].map((field) => ({ [field]: { $regex: req.query.search, $options: 'i' } }));
  const [items,total] = await Promise.all([Employee.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit), Employee.countDocuments(filter)]);
  res.json({ success: true, data: items.map(serialize), meta: { page, limit, total, pages: Math.ceil(total / limit) } });
}));
router.get('/:id', asyncHandler(async (req,res) => { const item = await Employee.findOne({ $or: [{ employeeId: req.params.id }, ...(req.params.id.match(/^[a-f\d]{24}$/i) ? [{ _id: req.params.id }] : [])] }); if (!item) return res.status(404).json({success:false,message:'Employee not found'}); return sendData(res, serialize(item)); }));
router.post('/', asyncHandler(async (req,res) => {
  const body = { ...req.body };
  if (!body.employeeId && !body.id) { const last = await Employee.findOne({ employeeId: /^EMP-\d+$/ }).sort({ employeeId: -1 }).select('employeeId'); body.employeeId = `EMP-${Math.max(1000, Number(last?.employeeId?.split('-')[1]) || 1000) + 1}`; }
  body.employeeId ||= body.id; delete body.id;
  const item = await Employee.create(body); return sendData(res, serialize(item), 201);
}));
router.patch('/:id', asyncHandler(async (req,res) => { const body = { ...req.body }; if (body.id && !body.employeeId) body.employeeId = body.id; delete body.id; const item = await Employee.findOneAndUpdate({ $or: [{employeeId:req.params.id}, ...(req.params.id.match(/^[a-f\d]{24}$/i) ? [{_id:req.params.id}] : [])] }, body, { new:true, runValidators:true }); if (!item) return res.status(404).json({success:false,message:'Employee not found'}); return sendData(res, serialize(item)); }));
router.put('/:id', asyncHandler(async (req,res) => { req.body.id = req.params.id; const body={...req.body}; body.employeeId ||= body.id; delete body.id; const item=await Employee.findOneAndUpdate({$or:[{employeeId:req.params.id},...(req.params.id.match(/^[a-f\d]{24}$/i)?[{_id:req.params.id}]:[])]},body,{new:true,runValidators:true}); if(!item)return res.status(404).json({success:false,message:'Employee not found'}); return sendData(res,serialize(item)); }));
router.delete('/:id', asyncHandler(async (req,res) => { const item = await Employee.findOne({ $or: [{employeeId:req.params.id}, ...(req.params.id.match(/^[a-f\d]{24}$/i)?[{_id:req.params.id}]:[])] }); if(!item)return res.status(404).json({success:false,message:'Employee not found'}); await Promise.all([Attendance.deleteMany({employee:item._id}),Leave.deleteMany({employee:item._id}),Payroll.deleteMany({employee:item._id})]); await item.deleteOne(); return sendData(res,{message:'Employee and linked attendance, leave, and payroll records deleted'}); }));
export default router;
