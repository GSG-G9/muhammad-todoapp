import React, { Component } from 'react';
import './Todo.css';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(){
    console.log(this.props.completed);
    console.log(this.props.id);
    this.props.toggleTodo(this.props.id);
  }
  render() {
    return (
      <div className="Todo">
        <li className="Todo-item">
          <div className="Todo-task_label">
            
          </div>
          <div className="Todo-item-content">
            <div className={this.props.completed ? 'Todo-task completed' : 'Todo-task' } onClick={this.handleToggle}>{this.props.task}</div>
            <div className="Todo-buttons">
              <button><i className="fas fa-pen"></i></button>
              <button><i className="fas fa-trash"></i></button>
            </div>
          </div>
          <div className="todo-date-box">
            <span className="create-on">{new Date(this.props.createdOn).toLocaleString().split(',')[0]}</span>
            <span className="last-update">{new Date(this.props.lastUpdate).toLocaleString().split(',')[0]}</span>
          </div>
        </li>
      </div>
    )
  }
}
