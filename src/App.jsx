import React from 'react';
import { Route } from 'react-router-dom';
import TodoList from './components/Todo-list';
import SignUp from './components/Sign-up';
import Header from './components/Header';
import SignIn from './components/Sign-in';
import Layout from './hoc/Layout';
import './App.css';

function App() {
  return (
    <Layout>
      <div style={{ width: 200, border: '2px solid' }}>Test</div>
    </Layout>
  );
}

export default App;
