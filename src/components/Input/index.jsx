import React, { Component } from 'react';
import { ENTER_KEY_CODE } from "../../constants";

export class Input extends Component {

  state = {
    inputText: ''
  };

  render() {
    return (
      <form onSubmit={ this.onFormSubmit } >
        <div className="input-group">

          <input type="text"
                 placeholder="What need to be done"
                 className="form-control shadow-none"
                 value={ this.state.inputText }
                 onChange={ this.onChangeInput }
                 onKeyUp={ this.onPressEnter }
          />

          <div className="input-group-append">
            <input type="button"
                   value="Add"
                   className="btn btn-secondary shadow-none"
                   onClick={ this.onPressButton }
            />
          </div>

        </div>
      </form>
    );
  }

  sanitizeInput = inputString => {
    return inputString.trim()
      .replace(/</g, '&#60')
      .replace(/>/g, '&#62');
  };

  clearInput = () => {
    this.setState({
      inputText: ''
    })
  };

  onFormSubmit = event => {
    event.preventDefault();
  };

  onChangeInput = event => {
    this.setState({
      inputText: event.target.value
    });
  };

  onPressEnter = event => {
    const { addTask } = this.props;
    const inputText = this.sanitizeInput(this.state.inputText);
    if (event.nativeEvent.which === ENTER_KEY_CODE && inputText) {
      addTask(inputText);
      this.clearInput();
    }
  };

  onPressButton = () => {
    const { addTask } = this.props;
    const inputText = this.sanitizeInput(this.state.inputText);
    if (inputText) {
      addTask(inputText);
      this.clearInput();
    }
  };
}
