import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout';
import SignUp from './containers/Sign-up';
import SignIn from './containers/Sign-in';
import TodoList from './containers/Todo-list';
import AuthService from './services/AuthService';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser,
    };
  }

  checkUser = () => {
    this.setState({
      currentUser: AuthService.getCurrentUser,
    });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <Layout user={currentUser}>
        <Switch>
          <Route exact path="/">
            {currentUser ? <Redirect to="/todo-list" /> : <Redirect to="/sign-in" />}
          </Route>
          <Route path="/sign-up">
            {currentUser ? <Redirect to="/todo-list" /> : <SignUp checkUser={this.checkUser} />}
          </Route>
          <Route path="/sign-in">
            {currentUser ? <Redirect to="/todo-list" /> : <SignIn checkUser={this.checkUser} />}
          </Route>
          <Route path="/todo-list">
            {!currentUser ? <Redirect to="/sign-in" /> : <TodoList />}
          </Route>
        </Switch>
      </Layout>
    );
  }
}
