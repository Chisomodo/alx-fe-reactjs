// src/components/TodoList.js

import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm'; // Import if AddTodoForm is used

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState(''); // Only used if AddTodoForm is NOT used

  const handleAddTodo = (text) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false },
    ]);
    setNewTodo(''); // Only used if AddTodoForm is NOT used
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      {AddTodoForm ? (
        <AddTodoForm onAddTodo={handleAddTodo} />
      ) : (
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={() => handleAddTodo(newTodo)}>Add Todo</button>
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => handleToggleTodo(todo.id)}
          >
            {todo.text}
            <button onClick={(e) => {e.stopPropagation(); handleDeleteTodo(todo.id);}}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;