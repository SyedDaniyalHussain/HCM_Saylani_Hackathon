export function sendData(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}
export function parsePagination(req) {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 50));
  return { page, limit, skip: (page - 1) * limit };
}
