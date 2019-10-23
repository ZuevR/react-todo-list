import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Task extends Component {
  onButtonClick = () => {
    const { task, removeTask } = this.props;
    removeTask(task);
  };

  onInputChange = () => {
    const { task, toggleTask } = this.props;
    toggleTask(task);
  };

  render() {
    const { task } = this.props;
    return (
      <>
        <input
          type="checkbox"
          className="form-check-inline custom-input"
          checked={task.status}
          onChange={this.onInputChange}
        />

        <span>{task.description}</span>

        <button
          type="button"
          className="btn close shadow-none ml-auto"
          onClick={this.onButtonClick}
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
