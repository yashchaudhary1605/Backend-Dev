const http = require('http');
const url = require('url');

let todos = [];
let idCounter = 1;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');

  // GET all todos
  if (path === '/todos' && method === 'GET') {
    res.end(JSON.stringify(todos));
  }

  // POST new todo
  else if (path === '/todos' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const todo = JSON.parse(body);
      todo.id = idCounter++;
      todos.push(todo);
      res.end(JSON.stringify(todo));
    });
  }

  // PUT update todo
  else if (path.startsWith('/todos/') && method === 'PUT') {
    const id = parseInt(path.split('/')[2]);
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const updated = JSON.parse(body);
      const todo = todos.find(t => t.id === id);
      if (todo) {
        todo.title = updated.title;
        todo.completed = updated.completed;
        res.end(JSON.stringify(todo));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Todo not found" }));
      }
    });
  }

  // DELETE todo
  else if (path.startsWith('/todos/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[2]);
    todos = todos.filter(t => t.id !== id);
    res.end(JSON.stringify({ message: "Todo deleted" }));
  }

  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("TODO API running on http://localhost:3000");
});
