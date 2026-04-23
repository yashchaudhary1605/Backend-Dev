const sanitizeHtml = require("sanitize-html");

exports.sanitizePost = (req, res, next) => {
  req.body.content = sanitizeHtml(req.body.content, {
    allowedTags: ["b", "i", "a"],
    allowedAttributes: {
      a: ["href"]
    }
  });
  next();
};

exports.sanitizeText = (req, res, next) => {
  req.body.text = sanitizeHtml(req.body.text, {
    allowedTags: [],
    allowedAttributes: {}
  });
  next();
};