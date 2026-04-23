const helmet = require("helmet");

module.exports = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      mediaSrc: ["'self'", "https://s3.amazonaws.com"],
      frameSrc: ["https://www.youtube.com"]
    }
  }
});