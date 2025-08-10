// src/controllers/todoController.js
let todos = [];

export function addTodoTask(req, res) {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task required" });
  todos.push({ task, done: false, id: Date.now() });
  res.json({ message: "Task added", todos });
}

export function listTodos(req, res) {
  res.json({ todos });
}
