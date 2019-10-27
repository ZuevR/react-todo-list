import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {
  ENTER_KEY_CODE,
  ESCAPE_KEY_CODE,
} from '../../constants';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditFieldVisible: false,
    };
  }

  onCloseButtonClick = () => {
    const { task, removeTask } = this.props;
    removeTask(task);
  };

  onCbxInputChange = () => {
    const { task, toggleTask } = this.props;
    toggleTask(task);
  };

  onEditButtonClick = () => {
    this.setState({
      isEditFieldVisible: true,
    }, () => {
      this.editInput.focus();
    });
  };

  onEditInputBlur = () => {
    this.hideEditInput();
  };

  onEditTaskInputKeyUp = async (event) => {
    const { task, updateTask } = this.props;
    if (event.nativeEvent.which === ENTER_KEY_CODE) {
      const newDescription = event.target.value;
      const updatedTask = await updateTask(task, newDescription);
      if (updatedTask) this.hideEditInput();
    } else if (event.nativeEvent.which === ESCAPE_KEY_CODE) {
      this.hideEditInput();
    }
  };

  hideEditInput = () => {
    this.setState({
      isEditFieldVisible: false,
    });
  };

  render() {
    const { task } = this.props;
    const { isEditFieldVisible } = this.state;
    return (
      <>
        {!isEditFieldVisible && (
          <>
            <input
              id={`task${task.id}`}
              type="checkbox"
              className="form-check-inline custom-input"
              checked={task.status}
              onChange={this.onCbxInputChange}
            />
            <label
              className={`form-check-label task-text ${task.status ? 'del-text text-muted' : false}`}
              htmlFor={`task${task.id}`}
            >
              {task.description}
            </label>
            <button
              type="button"
              className="btn close shadow-none ml-auto mr-2"
              onClick={this.onEditButtonClick}
            >
              <i className="icon-pencil" />
            </button>
            <button
              type="button"
              className="btn close shadow-none"
              onClick={this.onCloseButtonClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </>
        )}
        {isEditFieldVisible && (
          <input
            type="text"
            className="form-control shadow-none"
            defaultValue={task.description}
            ref={(input) => {
              this.editInput = input;
            }}
            onBlur={this.onEditInputBlur}
            onKeyUp={this.onEditTaskInputKeyUp}
          />
        )}
      </>
    );
  }
}

Task.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  removeTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};
