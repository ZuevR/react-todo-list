import React, { Component } from "react";
import { Input } from "../Input";

export class TodoList extends Component {

  state = {
    tasks: []
  };

  render() {
    return (
      <Input addTask={ this.addTask }/>
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
    })
  };

}