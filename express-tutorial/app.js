const path = require('path');
const express = require('express');
const app = express();

const userRoutes = require('./routes/users');

const PORT = 3000;
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Custom logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url} at ${new Date().toISOString()}`);
  next();
});

// Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Express Framework Basics',
    message: 'Welcome to Express with EJS!'
  });
});

// User routes
app.use('/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
