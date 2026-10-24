# HCM Lite Backend — Express.js + MongoDB

REST API for the HCM Lite React dashboard. Built with Express, Mongoose, MongoDB, dotenv, CORS, Helmet, Morgan and rate limiting.

## Requirements
- Node.js 18 or newer
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## Setup

```bash
npm install
```

Copy `.env.example` to `.env`, then update `MONGODB_URI` if needed.

Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

macOS/Linux:
```bash
cp .env.example .env
```

Default local MongoDB configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/hcm_lite
CLIENT_ORIGIN=http://localhost:5173
```

Start the API:
```bash
npm run dev
```

Optional demo data:
```bash
npm run seed
```

Health check: http://localhost:5000/api/health

## API response format
Successful responses use `{ "success": true, "data": ... }`. List endpoints also include pagination metadata. Errors use `{ "success": false, "message": "..." }`.

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health check |
| GET, POST | `/api/employees` | List/create employees |
| GET, PATCH, PUT, DELETE | `/api/employees/:id` | Read/update/delete employee |
| GET, POST | `/api/attendance` | List/create attendance records |
| PATCH, DELETE | `/api/attendance/:id` | Update/delete attendance |
| GET, POST | `/api/leaves` | List/create leave requests |
| PATCH | `/api/leaves/:id/status` | Approve/reject/pending status |
| PATCH, DELETE | `/api/leaves/:id` | Update/delete leave request |
| GET, POST | `/api/payroll` | List/create payroll records |
| PATCH | `/api/payroll/:id` | Update payroll details |
| PATCH | `/api/payroll/:id/status` | Set Draft/Processed/Paid |
| DELETE | `/api/payroll/:id` | Delete payroll record |
| GET, POST | `/api/announcements` | List/create announcements |
| PATCH, DELETE | `/api/announcements/:id` | Update/delete announcement |
| GET, PUT | `/api/settings` | Read/update company settings |
| GET | `/api/dashboard` | Dashboard summary; accepts `?date=YYYY-MM-DD&month=YYYY-MM` |
| GET | `/api/reports?type=overview` | Summary report |
| GET | `/api/reports?type=employees` | Employee report |
| GET | `/api/reports?type=attendance&month=YYYY-MM` | Attendance report |
| GET | `/api/reports?type=leaves` | Leave report |
| GET | `/api/reports?type=payroll&month=YYYY-MM` | Payroll report |
| POST | `/api/assistant` | Basic data-aware HR summary assistant |

List endpoints accept `page`, `limit`, and relevant filters such as `status`, `month`, `date`, `department`, `search`.

## Example requests

Create an employee:
```http
POST /api/employees
Content-Type: application/json
```
```json
{
  "name": "Noor Ahmed",
  "role": "HR Executive",
  "department": "People",
  "email": "noor.ahmed@example.com",
  "phone": "+92 300 0000000",
  "status": "Active",
  "joined": "2026-10-25",
  "salary": 95000
}
```

Create a leave request (use the employee's `employeeId` or exact employee name):
```json
{
  "employeeId": "EMP-1001",
  "type": "Annual Leave",
  "from": "2026-11-10",
  "to": "2026-11-12",
  "reason": "Family event"
}
```

Approve a leave:
```http
PATCH /api/leaves/LV-301/status
Content-Type: application/json
```
```json
{ "status": "Approved" }
```

Ask the assistant:
```http
POST /api/assistant
Content-Type: application/json
```
```json
{ "message": "How many leave requests are pending?" }
```

## Frontend connection
The React app currently stores demo data in `localStorage`; this backend is a separate API and does not automatically replace that storage. Set the Vite frontend API base URL to `http://localhost:5000/api`, then update page actions to call these endpoints to persist data in MongoDB. CORS is configured for `http://localhost:5173`; change `CLIENT_ORIGIN` if your frontend runs elsewhere.

## Important security note
This starter API has input validation, CORS, security headers, and rate limiting, but it does **not** implement user authentication or role-based authorization. Do not expose it publicly or use real employee/salary data until authentication, authorization, audit policies, backups, and deployment secrets are configured. Use demo data only while testing.
