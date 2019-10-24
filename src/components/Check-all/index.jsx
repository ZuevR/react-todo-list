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
    const { quantityOfLeftTasks } = this.props;
    return (
      <div className="form-group form-check mt-3 pl-5">
        <label htmlFor="check-all" className="form-check-label text-secondary custom-label">
          <input
            id="check-all"
            className="form-check-input ca-checkbox"
            type="checkbox"
            checked={quantityOfLeftTasks === 0}
            onChange={this.onCbxClick}
          />
          Complete all
        </label>
      </div>
    );
  }
}

CheckAll.propTypes = {
  toggleAllTasks: PropTypes.func.isRequired,
  quantityOfLeftTasks: PropTypes.number.isRequired,
};
