import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TodoList from './components/Todo-list';
import SignUp from './containers/Sign-up';
import Header from './components/Header';
import SignIn from './containers/Sign-in';
import Layout from './hoc/Layout';
import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
      </Switch>
    </Layout>
  );
}

export default App;
