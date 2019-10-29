import React, { PureComponent } from 'react';
import Input from '../../components/Input';
import List from '../../components/List';
import CheckAll from '../../components/Check-all';
import ListFooter from '../../components/List-footer';
import StringHelper from '../../utils/StringHelper';
import TaskService from '../../services/TaskService';
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

  addTask = async (taskDescription) => {
    const { tasks, counters } = this.state;
    const task = {
      description: taskDescription,
      status: false,
    };
    const savedTask = await TaskService.addNewTask(task);
    this.setState({
      tasks: [...tasks, savedTask],
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
          const status = !item.status;
          return {
            ...item,
            status,
          };
        }
        return item;
      }),
      counters: {
        active: task.status ? counters.active + 1 : counters.active - 1,
        done: task.status ? counters.done - 1 : counters.done + 1,
      },
    });
  };

  toggleAllTasks = (status) => {
    const { tasks } = this.state;
    this.setState({
      tasks: tasks.map((item) => ({
        ...item,
        status,
      })),
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
        ...counters,
        done: 0,
      },
    });
  };

  updateTask = async (task, inputValue) => {
    const { tasks } = this.state;
    const description = StringHelper.sanitizeString(inputValue);
    if (!description) return false;
    await this.setState({
      tasks: tasks.map((item) => (item.id === task.id ? {
        ...item,
        description,
      } : item)),
    });
    return true;
  };

  render() {
    const { tasks, counters, filter } = this.state;
    const renderFlag = !!tasks.length;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="mt-4 todo-list-wrapper col-12 col-md-8 col-lg-6">
            <Input addTask={this.addTask} />
            {renderFlag && (
              <>
                <CheckAll
                  toggleAllTasks={this.toggleAllTasks}
                  quantityOfLeftTasks={counters.active}
                />
                <List
                  tasks={tasks}
                  removeTask={this.removeTask}
                  toggleTask={this.toggleTaskStatus}
                  updateTask={this.updateTask}
                  filter={filter}
                />
                <ListFooter
                  filter={filter}
                  counters={counters}
                  setFilter={this.setFilter}
                  removeCompletedTasks={this.removeCompletedTasks}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
