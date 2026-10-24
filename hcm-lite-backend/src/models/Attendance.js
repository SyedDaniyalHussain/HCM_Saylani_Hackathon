import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true, index: true },
  date: { type: Date, required: true, index: true },
  checkIn: { type: String, default: '—' },
  checkOut: { type: String, default: '—' },
  status: { type: String, enum: ['Present', 'Late', 'Absent', 'On leave'], default: 'Present' },
  notes: { type: String, default: '' }
}, { timestamps: true });
schema.index({ employee: 1, date: 1 }, { unique: true });
export default mongoose.model('Attendance', schema);
