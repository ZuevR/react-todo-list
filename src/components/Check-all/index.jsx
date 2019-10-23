import React, { Component } from 'react';
import './style.css';

export class CheckAll extends Component {

  render() {
    return(
      <div className="form-group form-check mt-3 pl-5">
        <input id="check-all" className="form-check-input ca-checkbox" type="checkbox"/>
        <label htmlFor="check-all" className="form-check-label text-secondary custom-label">Complete all</label>
      </div>
    );
  }
}
