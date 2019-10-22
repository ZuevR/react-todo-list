import React from 'react';
import { TodoList } from "./components/Todo-list";
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="text-center display-3 title">Todo List</h1>
      <div className="row justify-content-center">
        <div className="mt-4 todo-list-wrapper">
          <TodoList/>
        </div>
      </div>
    </div>
  );
}

export default App;
