import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout';
import SignUp from './containers/Sign-up';
import SignIn from './containers/Sign-in';
import TodoList from './containers/Todo-list';
import AuthService from './auth';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isAuth: false,
    };
    this.authService = new AuthService();
  }

  render() {
    // const isAuth = this.state.authService.isAuth();
    return (
      <Layout authService={this.authService}>
        <Switch>
          {/* <Route exact path="/"> */}
          {/*  {isAuth ? <Redirect to="/todo-list" /> : <Redirect to="/sign-in" />} */}
          {/* </Route> */}
          <Route path="/sign-up">
            <SignUp authService={this.authService} />
          </Route>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/todo-list">
            <TodoList />
          </Route>
        </Switch>
      </Layout>
    );
  }
}
