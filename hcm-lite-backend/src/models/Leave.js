import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  leaveId: { type: String, unique: true, sparse: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true, index: true },
  type: { type: String, enum: ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Unpaid Leave'], default: 'Annual Leave' },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  days: { type: Number, min: 1, required: true },
  reason: { type: String, required: true, trim: true, maxlength: 1000 },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  reviewedAt: { type: Date, default: null }
}, { timestamps: true });
schema.pre('validate', function (next) {
  if (this.from && this.to) {
    if (this.to < this.from) return next(new Error('Leave end date must be on or after the start date.'));
    this.days = Math.floor((new Date(this.to).setHours(0,0,0,0) - new Date(this.from).setHours(0,0,0,0)) / 86400000) + 1;
  }
  next();
});
export default mongoose.model('Leave', schema);
