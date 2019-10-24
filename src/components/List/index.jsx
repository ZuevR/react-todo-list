import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import './style.css';

export default class List extends Component {
  getTaskArray = () => {
    const { filter, tasks } = this.props;
    switch (filter) {
      case 'active':
        return tasks.filter((item) => !item.status);
      case 'completed':
        return tasks.filter((item) => item.status);
      default:
        return tasks;
    }
  };

  renderTasksList = () => {
    const { removeTask, toggleTask, updateTask } = this.props;
    const taskArray = this.getTaskArray();
    return taskArray.map((item) => (
      <li key={item.id} className="list-group-item d-flex align-items-center">
        <Task
          task={item}
          removeTask={removeTask}
          toggleTask={toggleTask}
          updateTask={updateTask}
        />
      </li>
    ));
  };

  render() {
    return (
      <div className="list">
        <ul className="list-group list-group-flush">
          {this.renderTasksList()}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
