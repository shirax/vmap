import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Task from './Task.jsx';
import { Tasks } from '../api/tasks.js';

// App component - represents the whole app
export default class App extends Component {

  handleSubmit(event){
    event.preventDefault();
    const place = ReactDOM.findDOMNode(this.refs.place).value.trim();
    const info = ReactDOM.findDOMNode(this.refs.info).value.trim();
    Tasks.insert({
      place: place,
      info: info
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Location Details</h1>
        </header>
        <form className="new-task">
          <input
            type="text"
            ref="place"
            placeholder="Type to add a new place"
          />
          <br/>
          <input
            type="text"
            ref="info"
            placeholder="Type additional info"
          />
         <br/>
         <button onClick={this.handleSubmit.bind(this)}>
              click me
         </button>
        </form>
      </div>
    );
  }
}
