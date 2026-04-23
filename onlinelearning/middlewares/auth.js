module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }
  req.user = req.session.user;
  next();
};