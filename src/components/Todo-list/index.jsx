import React, { Component } from "react";
import { Input } from "../Input";
import { List } from "../List";
import { CheckAll } from "../Check-all";
import './style.css';

export class TodoList extends Component {

  state = {
    tasks: [
      { id: 1, description: 'Hey', status: false },
      { id: 2, description: 'Aga', status: false }
    ],
    counters: {
      done: 0,
      active: 0
    }
  };

  render() {
    return (
      <div className="mt-4 todo-list-wrapper">
        <Input addTask={ this.addTask }/>
        { !!this.state.tasks.length && <CheckAll/>}
        { !!this.state.tasks.length && <List tasks={ this.state.tasks }
                                             removeTask={ this.removeTask }
                                             toggleTask={ this.toggleTaskStatus }
        /> }
        { !!this.state.tasks.length }
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

  removeTask = id => {
    this.setState({
      tasks: this.state.tasks.filter(item => item.id !== id)
    }, () => {
      console.log('TodoList state:', this.state);
    });
  };

  toggleTaskStatus = id => {
    this.setState({
      tasks: this.state.tasks.map(item => {
        if (item.id === id) item.status = !item.status;
        return item;
      })
    }, () => {
      console.log('TodoList state:', this.state);
    });
  };

}
