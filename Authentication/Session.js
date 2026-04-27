const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
  secret: 'cart-secret',
  resave: false,
  saveUninitialized: false
}));


const initCart = (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
};

app.use(initCart);


app.post('/cart/add', (req, res) => {
  const { productId, name, price, quantity } = req.body;

  const existing = req.session.cart.find(item => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    req.session.cart.push({ productId, name, price, quantity });
  }

  res.json({ cart: req.session.cart });
});


app.put('/cart/update/:productId', (req, res) => {
  const { quantity } = req.body;

  const item = req.session.cart.find(i => i.productId == req.params.productId);
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;

  res.json({ cart: req.session.cart });
});


app.delete('/cart/remove/:productId', (req, res) => {
  req.session.cart = req.session.cart.filter(
    item => item.productId != req.params.productId
  );

  res.json({ cart: req.session.cart });
});


app.get('/cart', (req, res) => {
  const total = req.session.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  res.json({ cart: req.session.cart, total });
});

app.listen(3000);