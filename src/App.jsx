import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout';
import SignUp from './containers/Sign-up';
import SignIn from './containers/Sign-in';
import TodoList from './containers/Todo-list';
import AuthService from './auth';
import './App.css';

function App() {
  const isAuth = AuthService.isAuth();
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          {isAuth ? <Redirect to="/todo-list" /> : <Redirect to="/sign-in" />}
        </Route>
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/todo-list" component={TodoList} />
      </Switch>
    </Layout>
  );
}

export default App;
