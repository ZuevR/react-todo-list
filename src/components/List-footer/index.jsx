import React, { Component } from 'react';
import './style.css';

export class ListFooter extends Component {

  render() {
    const btnClassName = 'btn btn-sm shadow-none py-0';
    const { filter, counters } = this.props;
    return (
      <div className="list">
        <div className="row align-items-center">

          <div className="text-secondary counters col-3">
            <small>{ counters.active } left</small>
            <small> / { counters.done } done</small>
          </div>

          <div className="filters justify-content-between col-5">
            <button
              className={ `${ btnClassName } ${ filter === 'all' ? 'btn-secondary' : 'btn-outline-secondary' }` }
              data-type="all"
              onClick={ this.onFilterClick }
            >All
            </button>
            <button
              className={ `${ btnClassName } ${ filter === 'active' ? 'btn-secondary' : 'btn-outline-secondary' } ml-1` }
              data-type="active"
              onClick={ this.onFilterClick }
            >Active
            </button>
            <button
              className={ `${ btnClassName } ${ filter === 'completed' ? 'btn-secondary' : 'btn-outline-secondary' } ml-1` }
              data-type="completed"
              onClick={ this.onFilterClick }
            >Completed
            </button>
          </div>

          <div className="del-btn text-muted col-4">Delete completed</div>

        </div>
      </div>
    );
  }

  onFilterClick = event => {
    const { setFilter } = this.props;
    const type = event.target.getAttribute('data-type');
    setFilter(type);
  }
}