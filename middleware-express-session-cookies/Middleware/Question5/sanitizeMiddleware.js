const validator = require("validator");

/**
 * Recursively sanitize input
 */
function sanitizeInput(data) {
  if (typeof data === "string") {
    // Escape HTML (prevents XSS)
    return validator.escape(data.trim());
  }

  if (Array.isArray(data)) {
    return data.map(item => sanitizeInput(item));
  }

  if (typeof data === "object" && data !== null) {
    const sanitizedObj = {};

    for (let key in data) {
      if (key.startsWith("$") || key.includes(".")) {
        continue;
      }

      sanitizedObj[key] = sanitizeInput(data[key]);
    }

    return sanitizedObj;
  }

  return data;
}

/**
 * Middleware
 */
const sanitizeMiddleware = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }

  if (req.query) {
    req.query = sanitizeInput(req.query);
  }

  if (req.params) {
    req.params = sanitizeInput(req.params);
  }

  next();
};

module.exports = sanitizeMiddleware;