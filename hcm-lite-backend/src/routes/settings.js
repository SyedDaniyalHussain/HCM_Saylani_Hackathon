import { Router } from 'express';
import Setting from '../models/Setting.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendData } from '../utils/http.js';
const router=Router();
router.get('/',asyncHandler(async(req,res)=>{let item=await Setting.findOne({key:'company'});if(!item)item=await Setting.create({key:'company'});return sendData(res,item);}));
router.put('/',asyncHandler(async(req,res)=>{const allowed=['companyName','email','phone','address','timezone','currency','leaveApprovalRequired'];const update={};for(const key of allowed)if(req.body[key]!==undefined)update[key]=req.body[key];const item=await Setting.findOneAndUpdate({key:'company'},{$set:update,$setOnInsert:{key:'company'}},{new:true,upsert:true,runValidators:true});return sendData(res,item);}));
export default router;
