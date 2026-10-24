import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  key: { type: String, unique: true, default: 'company' },
  companyName: { type: String, default: 'HCM Lite' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  timezone: { type: String, default: 'Asia/Karachi' },
  currency: { type: String, default: 'PKR' },
  leaveApprovalRequired: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Setting', schema);
