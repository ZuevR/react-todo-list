import React, { Component, Fragment } from 'react';
import './style.css';

export class Task extends Component {


  render() {
    const { task } = this.props;
    return (
      <Fragment>

        <input type="checkbox"
               className="form-check-inline custom-input"
               defaultChecked={ task.status }
        />

        <span>{ task.description }</span>

        <button type="button"
                className="btn close shadow-none ml-auto"
                onClick={this.onButtonClick}
        >
          <span aria-hidden="true">&times;</span>
        </button>

      </Fragment>
    );
  }

  onButtonClick = () => {
    const { task, removeTask } = this.props;
    removeTask(task.id);
  };
}
