import React from 'react';
import TodoList from './components/Todo-list';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="text-center display-3 title">Todo List</h1>
      <div className="row justify-content-center">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
