import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class CheckAll extends Component {
  onCbxClick = (event) => {
    const { toggleAllTasks } = this.props;
    const status = event.target.checked;
    toggleAllTasks(status);
  };

  render() {
    const { status } = this.props;
    return (
      <div className="form-group form-check mt-3 pl-5">
        <input
          id="check-all"
          className="form-check-input ca-checkbox"
          type="checkbox"
          checked={status === 0}
          onChange={this.onCbxClick}
        />
        <label htmlFor="check-all" className="form-check-label text-secondary custom-label">
          Complete all
        </label>
      </div>
    );
  }
}

CheckAll.propTypes = {
  toggleAllTasks: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
};
