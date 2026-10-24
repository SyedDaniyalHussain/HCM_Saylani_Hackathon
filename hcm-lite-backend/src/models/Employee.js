import mongoose from 'mongoose';
const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true, sparse: true, trim: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  role: { type: String, required: true, trim: true, maxlength: 100 },
  department: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, default: '', trim: true },
  status: { type: String, enum: ['Active', 'On leave', 'Inactive'], default: 'Active' },
  joined: { type: Date, default: Date.now },
  salary: { type: Number, min: 0, default: 0 },
  avatar: { type: String, default: '' }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
employeeSchema.virtual('id').get(function () { return this.employeeId || this._id.toString(); });
employeeSchema.pre('validate', function (next) {
  if (!this.avatar && this.name) this.avatar = this.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  next();
});
export default mongoose.model('Employee', employeeSchema);
