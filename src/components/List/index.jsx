import React, { Component } from 'react';
import { Task } from "../Task";
import './style.css';

export class List extends Component {

  render() {
    const { tasks, removeTask } = this.props;
    return (
      <div className="list">
        <ul className="list-group list-group-flush">
          { tasks.map(item => (
            <li key={ item.id } className="list-group-item d-flex align-items-center">
              <Task task={ item } removeTask={ removeTask }/>
            </li>
          )) }
        </ul>
      </div>
    );
  }

}
