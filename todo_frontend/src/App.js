import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/todos/');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/todos/', {
        title: newTodo,
        completed: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/todos/${todo.id}/`,
        { completed: !todo.completed }
      );
      const updatedTodos = todos.map((t) =>
        t.id === todo.id ? response.data : t
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo complete:', error);
    }
  };

  const handleDeleteTodo = async (todo) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/${todo.id}/`);
      const updatedTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const [clickedTodoIds, setClickedTodoIds] = useState([]);

  const handleToggleHeart = (todoId) => {
    if (clickedTodoIds.includes(todoId)) {
      setClickedTodoIds(clickedTodoIds.filter((id) => id !== todoId));
    } else {
      setClickedTodoIds([...clickedTodoIds, todoId]);
    }
  };

  const isHeartClicked = (todoId) => clickedTodoIds.includes(todoId);

  return (
    <div>
      <h1>Event List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new event"
      />
      <button onClick={handleAddTodo}>Add Event</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo)}
            />
            <i
              className={`heart-icon ${
                isHeartClicked(todo.id) ? 'heart-red' : 'heart-white'
              }`}
              onClick={() => handleToggleHeart(todo.id)}
            ></i>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
            <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
