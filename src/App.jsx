import React from 'react';
import { Route, Link } from 'react-router-dom';
import TodoList from './components/Todo-list';
import SignUp from './components/Sign-up';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="text-center display-3 title">Todo List</h1>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/sign-up">Sign Up</Link>
      </li>
      <div className="row justify-content-center">
        <Route exact path="/"><TodoList /></Route>
        <Route path="/sign-up"><SignUp /></Route>
      </div>
    </div>
  );
}

export default App;
