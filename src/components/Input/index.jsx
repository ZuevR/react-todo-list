import React, { Component } from 'react';

export class Input extends Component {

  state = {
    inputText: ''
  };

  render() {
    return (
      <form onSubmit={ this.onFormSubmit }>

        <input type="text" placeholder="What need to be done"
               value={ this.state.inputText }
               onChange={ this.onChangeInput }
               onKeyUp={ this.onPressEnter }
        />

        <input type="button" value="Add" onClick={ this.onPressButton }/>

      </form>
    );
  }

  onFormSubmit = event => {
    event.preventDefault();
  };

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

  onChangeInput = event => {
    this.setState({
      inputText: event.target.value
    });
  };

  onPressEnter = event => {
    const { addTask } = this.props;
    const inputText = this.sanitizeInput(this.state.inputText);
    if (event.nativeEvent.which === 13 && inputText) {
      addTask(inputText);
      this.clearInput();
    }
  };

  onPressButton = event => {
    const { addTask } = this.props;
    const inputText = this.sanitizeInput(this.state.inputText);
    if (inputText) {
      addTask(inputText);
      this.clearInput();
    }
  };
}
