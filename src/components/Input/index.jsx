import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ENTER_KEY_CODE } from '../../constants';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  sanitizeInput = (inputString) => inputString.trim()
    .replace(/</g, '&#60')
    .replace(/>/g, '&#62');

  clearInput = () => {
    this.setState({
      inputText: '',
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
  };

  onChangeInput = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  onNewTaskInputKeyUp = (event) => {
    let { inputText } = this.state;
    const { addTask } = this.props;
    inputText = this.sanitizeInput(inputText);
    if (!(event.nativeEvent.which === ENTER_KEY_CODE) || !inputText) return;
    addTask(inputText);
    this.clearInput();
  };

  onClickAddButton = () => {
    let { inputText } = this.state;
    const { addTask } = this.props;
    inputText = this.sanitizeInput(inputText);
    if (!inputText) return;
    addTask(inputText);
    this.clearInput();
  };

  render() {
    const { inputText } = this.state;
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="input-group">

          <input
            type="text"
            placeholder="What need to be done"
            className="form-control shadow-none"
            value={inputText}
            onChange={this.onChangeInput}
            onKeyUp={this.onNewTaskInputKeyUp}
          />

          <div className="input-group-append">
            <input
              type="button"
              value="Add"
              className="btn btn-secondary shadow-none"
              onClick={this.onClickAddButton}
            />
          </div>

        </div>
      </form>
    );
  }
}

Input.propTypes = {
  addTask: PropTypes.func.isRequired,
};
