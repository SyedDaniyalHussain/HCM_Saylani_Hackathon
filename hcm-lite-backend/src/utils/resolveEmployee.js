import Employee from '../models/Employee.js';
export async function resolveEmployee(value) {
  if (!value) return null;
  if (typeof value === 'object' && value._id) return Employee.findById(value._id);
  const text = String(value);
  if (/^[a-f\d]{24}$/i.test(text)) { const byId = await Employee.findById(text); if (byId) return byId; }
  const byEmployeeId = await Employee.findOne({ employeeId: text });
  if (byEmployeeId) return byEmployeeId;
  return Employee.findOne({ name: { $regex: `^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } });
}
