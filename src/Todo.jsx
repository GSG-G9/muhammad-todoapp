import React, { Component } from 'react';
import './Todo.css';

export default class Todo extends Component {
  render() {
    return (
      <div className="Todo">
        <li className="Todo-task">
          <div className="Todo-task_type">
            
          </div>
          <div className="Todo-task_content">{this.props.task}</div>
        </li>
        <div className="Todo-buttons">
          <button><i className="fas fa-pen"></i></button>
          <button><i className="fas fa-trash"></i></button>
        </div>
      </div>
    )
  }
}
