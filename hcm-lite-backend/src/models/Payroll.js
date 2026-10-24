import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true, index: true },
  month: { type: String, required: true, match: /^\d{4}-(0[1-9]|1[0-2])$/ },
  basicSalary: { type: Number, min: 0, required: true },
  allowances: { type: Number, min: 0, default: 0 },
  deductions: { type: Number, min: 0, default: 0 },
  netSalary: { type: Number, min: 0, required: true },
  status: { type: String, enum: ['Draft', 'Processed', 'Paid'], default: 'Draft' },
  paidAt: { type: Date, default: null }
}, { timestamps: true });
schema.index({ employee: 1, month: 1 }, { unique: true });
schema.pre('validate', function (next) {
  this.netSalary = Math.max(0, Number(this.basicSalary || 0) + Number(this.allowances || 0) - Number(this.deductions || 0));
  next();
});
export default mongoose.model('Payroll', schema);
