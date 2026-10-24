export const seedEmployees = [
  { id: "EMP-1001", name: "Ayesha Khan", role: "Product Designer", department: "Design", email: "ayesha.khan@company.com", phone: "+92 300 1234567", status: "Active", joined: "2023-04-12", salary: 145000, avatar: "AK" },
  { id: "EMP-1002", name: "Hamza Ali", role: "Frontend Developer", department: "Engineering", email: "hamza.ali@company.com", phone: "+92 301 2345678", status: "Active", joined: "2022-11-03", salary: 185000, avatar: "HA" },
  { id: "EMP-1003", name: "Sara Ahmed", role: "HR Manager", department: "People", email: "sara.ahmed@company.com", phone: "+92 302 3456789", status: "Active", joined: "2021-07-19", salary: 210000, avatar: "SA" },
  { id: "EMP-1004", name: "Usman Tariq", role: "QA Engineer", department: "Engineering", email: "usman.tariq@company.com", phone: "+92 333 4567890", status: "On leave", joined: "2024-01-08", salary: 125000, avatar: "UT" },
  { id: "EMP-1005", name: "Mariam Noor", role: "Finance Officer", department: "Finance", email: "mariam.noor@company.com", phone: "+92 334 5678901", status: "Active", joined: "2023-09-25", salary: 155000, avatar: "MN" },
  { id: "EMP-1006", name: "Bilal Shah", role: "Marketing Executive", department: "Marketing", email: "bilal.shah@company.com", phone: "+92 335 6789012", status: "Inactive", joined: "2020-02-14", salary: 110000, avatar: "BS" },
  { id: "EMP-1007", name: "Zainab Malik", role: "Backend Developer", department: "Engineering", email: "zainab.malik@company.com", phone: "+92 336 7890123", status: "Active", joined: "2024-06-10", salary: 175000, avatar: "ZM" },
  { id: "EMP-1008", name: "Danish Iqbal", role: "Accountant", department: "Finance", email: "danish.iqbal@company.com", phone: "+92 337 8901234", status: "Active", joined: "2022-03-01", salary: 135000, avatar: "DI" }
];

export const seedLeaves = [
  { id: "LV-301", employee: "Usman Tariq", type: "Annual Leave", from: "2026-10-27", to: "2026-10-30", days: 4, reason: "Family trip", status: "Pending" },
  { id: "LV-302", employee: "Ayesha Khan", type: "Sick Leave", from: "2026-10-20", to: "2026-10-21", days: 2, reason: "Medical appointment", status: "Approved" },
  { id: "LV-303", employee: "Hamza Ali", type: "Casual Leave", from: "2026-11-03", to: "2026-11-03", days: 1, reason: "Personal work", status: "Pending" },
  { id: "LV-304", employee: "Mariam Noor", type: "Annual Leave", from: "2026-10-15", to: "2026-10-17", days: 3, reason: "Out of city", status: "Rejected" }
];

export const seedAttendance = [
  { id: 1, employee: "Ayesha Khan", department: "Design", checkIn: "09:02 AM", checkOut: "05:11 PM", status: "Present" },
  { id: 2, employee: "Hamza Ali", department: "Engineering", checkIn: "08:48 AM", checkOut: "05:25 PM", status: "Present" },
  { id: 3, employee: "Sara Ahmed", department: "People", checkIn: "09:15 AM", checkOut: "05:04 PM", status: "Late" },
  { id: 4, employee: "Usman Tariq", department: "Engineering", checkIn: "—", checkOut: "—", status: "On leave" },
  { id: 5, employee: "Mariam Noor", department: "Finance", checkIn: "08:55 AM", checkOut: "05:09 PM", status: "Present" },
  { id: 6, employee: "Bilal Shah", department: "Marketing", checkIn: "—", checkOut: "—", status: "Absent" },
  { id: 7, employee: "Zainab Malik", department: "Engineering", checkIn: "09:01 AM", checkOut: "—", status: "Present" },
  { id: 8, employee: "Danish Iqbal", department: "Finance", checkIn: "08:52 AM", checkOut: "05:18 PM", status: "Present" }
];

export const seedAnnouncements = [
  { id: 1, title: "Quarterly town hall", category: "Company", date: "2026-10-28", body: "Join the leadership team for quarterly updates and an open Q&A session at 3:00 PM." },
  { id: 2, title: "Open enrollment reminder", category: "Benefits", date: "2026-10-26", body: "Please review your benefits selections before the end of the month." },
  { id: 3, title: "Friday team lunch", category: "Culture", date: "2026-10-30", body: "Teams are invited to the office lunch area at 1:00 PM. Please confirm with People Ops." }
];

export const money = (value) => new Intl.NumberFormat("en-PK", {
  style: "currency", currency: "PKR", maximumFractionDigits: 0
}).format(value);

export function readStore(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
