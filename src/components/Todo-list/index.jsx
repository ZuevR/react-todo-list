import React, { PureComponent } from 'react';
import Input from '../Input';
import List from '../List';
import CheckAll from '../Check-all';
import ListFooter from '../List-footer';
import './style.css';

export default class TodoList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      counters: {
        done: 0,
        active: 0,
      },
      filter: 'all',
    };
  }

  setFilter = (filterType) => {
    this.setState({
      filter: filterType,
    });
  };

  addTask = (taskDescription) => {
    const { tasks, counters } = this.state;
    const newTask = {
      id: Date.now(),
      description: taskDescription,
      status: false,
    };

    this.setState({
      tasks: [...tasks, newTask],
      counters: {
        ...counters,
        active: counters.active + 1,
      },
    });
  };

  removeTask = (task) => {
    const { tasks, counters } = this.state;
    this.setState({
      tasks: tasks.filter((item) => item.id !== task.id),
      counters: {
        active: task.status ? counters.active : counters.active - 1,
        done: !task.status ? counters.done : counters.done - 1,
      },
    });
  };

  toggleTaskStatus = (task) => {
    const { tasks, counters } = this.state;
    this.setState({
      tasks: tasks.map((item) => {
        if (item.id === task.id) {
          item.status = !item.status;
        }
        return item;
      }),
      counters: {
        active: task.status ? counters.active - 1 : counters.active + 1,
        done: task.status ? counters.done + 1 : counters.done - 1,
      },
    });
  };

  toggleAllTasks = (status) => {
    const { tasks } = this.state;
    this.setState({
      tasks: tasks.map((item) => {
        item.status = status;
        return item;
      }),
      counters: {
        active: status ? 0 : tasks.length,
        done: status ? tasks.length : 0,
      },
    });
  };

  removeCompletedTasks = () => {
    const { tasks, counters } = this.state;
    this.setState({
      tasks: tasks.filter((item) => !item.status),
      counters: {
        active: counters.active,
        done: 0,
      },
    });
  };

  render() {
    const { tasks, counters, filter } = this.state;
    const renderFlag = !!tasks.length;
    return (
      <div className="mt-4 todo-list-wrapper">
        <Input addTask={this.addTask} />
        {renderFlag && (
          <CheckAll toggleAllTasks={this.toggleAllTasks} quantityOfLeftTasks={counters.active} />)}
        {renderFlag && (
          <List tasks={tasks} removeTask={this.removeTask} toggleTask={this.toggleTaskStatus} />)}
        {renderFlag && (
          <ListFooter
            filter={filter}
            counters={counters}
            setFilter={this.setFilter}
            removeCompletedTasks={this.removeCompletedTasks}
          />
        )}
      </div>
    );
  }
}
