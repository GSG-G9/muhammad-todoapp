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
        <li className="">
          <div className="Todo-task_type">
            
          </div>
          <div className={this.props.completed ? 'Todo-task completed' : 'Todo-task' } onClick={this.handleToggle}>{this.props.task}</div>
        </li>
        <div className="Todo-buttons">
          <button><i className="fas fa-pen"></i></button>
          <button><i className="fas fa-trash"></i></button>
        </div>
      </div>
    )
  }
}
