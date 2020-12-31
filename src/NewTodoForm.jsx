import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import './NewTodoForm.css';

export default class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addTodo({
      todo_content: this.state.task,
      todo_id: uuidv4(),
      completed: false,
      created_on: Date.now(),
      last_update: Date.now(),
    });
    this.setState({
      task: "",
    });
  }

  render() {
    return (
      <>
        <div>
          <form className="NewTodoForm" onSubmit={this.handleSubmit}>
            <label htmlFor="task">New Todo</label>
            <input
              type="text"
              id="task"
              name="task"
              placeholder="New Todo..."
              value={this.state.task}
              onChange={this.handleChange}
            />
            <button>Add</button>
          </form>
        </div>
      </>
    );
  }
}
