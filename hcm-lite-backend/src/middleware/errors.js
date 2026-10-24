export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  const status = err.status || (err.name === 'ValidationError' ? 400 : err.name === 'CastError' ? 400 : err.code === 11000 ? 409 : 500);
  let message = err.message || 'Internal server error';
  if (err.code === 11000) message = `A record with this ${Object.keys(err.keyValue || {}).join(', ')} already exists.`;
  if (process.env.NODE_ENV === 'production' && status === 500) message = 'Internal server error';
  res.status(status).json({ success: false, message, ...(process.env.NODE_ENV !== 'production' && status === 500 ? { stack: err.stack } : {}) });
}
