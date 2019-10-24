import React from 'react';
import { Route } from 'react-router-dom';
import TodoList from './components/Todo-list';
import SignUp from './components/Sign-up';
import Header from './components/Header';
import SignIn from './components/Sign-in';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-center display-3 title">Todo List</h1>
        <div className="row justify-content-center">
          <Route exact path="/"><TodoList /></Route>
          <Route path="/sign-up"><SignUp /></Route>
          <Route path="/sign-in"><SignIn /></Route>
        </div>
      </div>
    </>
  );
}

export default App;
