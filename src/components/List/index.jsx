import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import './style.css';

const List = ({ tasks, removeTask, toggleTask }) => (
  <div className="list">
    <ul className="list-group list-group-flush">
      {
        tasks.map((item) => (
          <li key={item.id} className="list-group-item d-flex align-items-center">
            <Task task={item} removeTask={removeTask} toggleTask={toggleTask} />
          </li>
        ))
      }
    </ul>
  </div>
);

List.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
};

export default List;
