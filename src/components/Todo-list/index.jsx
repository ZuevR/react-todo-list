import React, { Component } from "react";
import { Input } from "../Input";
import { List } from "../List";
import './style.css';

export class TodoList extends Component {

  state = {
    tasks: []
  };

  render() {
    return (
      <div className="mt-4 todo-list-wrapper">
        <Input addTask={ this.addTask }/>
        <List/>
      </div>
    );
  }

  addTask = taskDescription => {

    const newTask = {
      id: Date.now(),
      description: taskDescription,
      status: false
    };

    this.setState({
      tasks: [...this.state.tasks, newTask]
    }, () => {
      console.log('TodoList state:', this.state);
    });
  };

}