const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/edulearn"
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 30
  }
});