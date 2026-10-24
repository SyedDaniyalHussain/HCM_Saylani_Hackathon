import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  category: { type: String, enum: ['Company', 'Benefits', 'Culture', 'Policy', 'Other'], default: 'Company' },
  date: { type: Date, default: Date.now },
  body: { type: String, required: true, trim: true, maxlength: 5000 },
  createdBy: { type: String, default: 'HR Admin' }
}, { timestamps: true });
export default mongoose.model('Announcement', schema);
