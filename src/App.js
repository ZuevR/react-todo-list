import React from 'react';
import { TodoList } from "./components/Todo-list";
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="text-center title">Todo List</h1>
      <TodoList/>
    </div>
  );
}

export default App;
