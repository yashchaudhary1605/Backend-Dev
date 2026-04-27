const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
  secret: 'auth-secret',
  resave: false,
  saveUninitialized: false
}));

const posts = [];


const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Login required" });
  }
  next();
};

// 🎭 Role middleware
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.session.user.role !== role && req.session.user.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};


const isOwnerOrModerator = (req, res, next) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const user = req.session.user;

  if (
    post.userId === user.id ||
    user.role === 'moderator' ||
    user.role === 'admin'
  ) {
    req.post = post;
    next();
  } else {
    res.status(403).json({ message: "Not allowed" });
  }
};


app.post('/posts', isAuthenticated, (req, res) => {
  const post = {
    id: Date.now(),
    content: req.body.content,
    userId: req.session.user.id
  };
  posts.push(post);
  res.json(post);
});


app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
  req.post.content = req.body.content;
  res.json(req.post);
});


app.delete('/posts/:id', isAuthenticated, requireRole('moderator'), (req, res) => {
  const index = posts.findIndex(p => p.id == req.params.id);
  posts.splice(index, 1);
  res.json({ message: "Deleted" });
});

app.listen(3000);