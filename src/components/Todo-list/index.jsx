import React, { PureComponent } from "react";
import { Input } from "../Input";
import { List } from "../List";
import { CheckAll } from "../Check-all";
import { ListFooter } from "../List-footer";
import './style.css';

export class TodoList extends PureComponent {

  state = {
    tasks: [],
    counters: {
      done: 0,
      active: 0
    },
    filter: 'all'
  };

  render() {
    const renderFlag = !!this.state.tasks.length;
    return (
      <div className="mt-4 todo-list-wrapper">

        <Input addTask={ this.addTask }/>

        { renderFlag && <CheckAll toggleAllTasks={ this.toggleAllTasks }
                                  status={ this.state.counters.active }
        /> }

        { renderFlag && <List tasks={ this.state.tasks }
                              removeTask={ this.removeTask }
                              toggleTask={ this.toggleTaskStatus }
        /> }
        { renderFlag && <ListFooter filter={ this.state.filter }
                                    counters={ this.state.counters }
                                    setFilter={ this.setFilter }
        /> }
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
      tasks: [...this.state.tasks, newTask],
      counters: {
        ...this.state.counters,
        active: this.state.counters.active + 1
      }
    });
  };

  removeTask = task => {
    this.setState({
      tasks: this.state.tasks.filter(item => item.id !== task.id),
      counters: {
        active: task.status ? this.state.counters.active : this.state.counters.active - 1,
        done: !task.status ? this.state.counters.done : this.state.counters.done - 1
      }
    }, () => {
      console.log('TodoList state:', this.state);
    });
  };

  toggleTaskStatus = task => {
    this.setState({
      tasks: this.state.tasks.map(item => {
        if (item.id === task.id) item.status = !item.status;
        return item;
      }),
      counters: {
        active: task.status ? this.state.counters.active - 1 : this.state.counters.active + 1,
        done: task.status ? this.state.counters.done + 1 : this.state.counters.done - 1
      }
    }, () => {
      console.log('TodoList state:', this.state);
    });
  };

  toggleAllTasks = status => {
    this.setState({
      tasks: this.state.tasks.map(item => {
        item.status = status;
        return item;
      }),
      counters: {
        active: status ? 0 : this.state.tasks.length,
        done: status ? this.state.tasks.length : 0
      }
    }, () => {
      console.log('TodoList state:', this.state);
    });
  };

  setFilter = filterType => {
    this.setState({
      filter: filterType
    }, () => {
      console.log('TodoList state:', this.state);
    });
  };

}
