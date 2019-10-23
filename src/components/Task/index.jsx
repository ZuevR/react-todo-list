import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Task extends Component {
  onCloseButtonClick = () => {
    const { task, removeTask } = this.props;
    removeTask(task);
  };

  onCbxInputChange = () => {
    const { task, toggleTask } = this.props;
    toggleTask(task);
  };

  render() {
    const { task } = this.props;
    return (
      <>
        <input
          id={`task${task.id}`}
          type="checkbox"
          className="form-check-inline custom-input"
          checked={task.status}
          onChange={this.onCbxInputChange}
        />

        <label
          className={`form-check-label ${task.status ? 'del-text text-muted' : false}`}
          htmlFor={`task${task.id}`}
        >
          {task.description}
        </label>

        <button
          type="button"
          className="btn close shadow-none ml-auto"
          onClick={this.onCloseButtonClick}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </>
    );
  }
}

Task.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  removeTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
};
