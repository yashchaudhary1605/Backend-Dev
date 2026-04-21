const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Session setup
app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: false
}));

/**
 * Helper: Get Cart
 */
function getCart(req) {
  if (req.session.user) {
    return req.session.cart || [];
  } else {
    return req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  }
}

/**
 * Helper: Save Cart
 */
function saveCart(req, res, cart) {
  if (req.session.user) {
    req.session.cart = cart;
  } else {
    res.cookie("cart", JSON.stringify(cart), {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    });
  }
}

/**
 * Add item to cart
 */
app.post("/add-to-cart", (req, res) => {
  const { item } = req.body;

  let cart = getCart(req);
  cart.push(item);

  saveCart(req, res, cart);

  res.json({ message: "Item added", cart });
});

/**
 * View cart
 */
app.get("/cart", (req, res) => {
  const cart = getCart(req);
  res.json({ cart });
});

/**
 * LOGIN → migrate cart
 */
app.post("/login", (req, res) => {
  const { username } = req.body;

  // Fake login
  req.session.user = { username };

  // Get guest cart (from cookie)
  const guestCart = req.cookies.cart
    ? JSON.parse(req.cookies.cart)
    : [];

  // Get session cart (if any)
  const sessionCart = req.session.cart || [];

  // 🔥 Merge carts
  const mergedCart = [...sessionCart, ...guestCart];

  req.session.cart = mergedCart;

  // Clear cookie cart
  res.clearCookie("cart");

  res.json({
    message: "Login successful, cart migrated",
    cart: mergedCart
  });
});

/**
 * LOGOUT
 */
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});