const sanitizeHtml = require("sanitize-html");

exports.sanitizeCourse = (req, res, next) => {
  req.body.description = sanitizeHtml(req.body.description, {
    allowedTags: ["b","i","p","ul","li","a"],
    allowedAttributes: {
      a: ["href"]
    }
  });
  next();
};

exports.cleanText = (req, res, next) => {
  req.body.text = sanitizeHtml(req.body.text, {
    allowedTags: [],
    allowedAttributes: {}
  });
  next();
};