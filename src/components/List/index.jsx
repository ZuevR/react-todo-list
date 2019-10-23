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

  render() {
    const { removeTask, toggleTask } = this.props;
    return (
      <div className="list">
        <ul className="list-group list-group-flush">
          {
            this.getTaskArray()
              .map((item) => (
                <li key={item.id} className="list-group-item d-flex align-items-center">
                  <Task task={item} removeTask={removeTask} toggleTask={toggleTask} />
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
