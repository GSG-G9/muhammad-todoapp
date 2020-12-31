import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import "./NewTodoForm.css";
import "./tooltip.css";

export default class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {
        task: "",
        priority: 1,
        label: "",
      },
      show: false,
      showLabel: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showForm = this.showForm.bind(this);
    this.toggleShowLabel = this.toggleShowLabel.bind(this);
    this.handleSelectPriority = this.handleSelectPriority.bind(this);
  }
  handleChange(evt) {
    this.setState({
      todo: { ...this.state.todo, [evt.target.name]: evt.target.value,}
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.state.todo.task === "") {
      return;
    }
    this.props.addTodo({
      todo_content: this.state.todo.task,
      todo_id: uuidv4(),
      completed: false,
      priority: 1,
      label: "",
      created_on: Date.now(),
      last_update: Date.now(),
    });
    this.setState({
      todo: {
        ...this.state.todo,
        task: "",
      },
      show: !this.state.show,
    });
  }

  showForm() {
    this.setState({ ...this.state.todo, show: !this.state.show });
  }

  toggleShowLabel() {
    this.setState({ ...this.state.todo, showLabel: !this.state.showLabel });
  }

  handleSelectPriority(evt) {
    this.setState({
      todo: {
        ...this.state.todo,
        priority: evt.target.dataset.priority,
      },
      showLabel: !this.state.showLabel
    });
  }

  color = ["#d1453b", "#EBA909", "#246FE0", "#FFFFFF"];

  render() {
    const { show, todo: { task, priority } } = this.state;
    return (
      <>
        {show ? (
          <div>
            <form className="NewTodoForm">
              <input
                type="text"
                id="task"
                name="task"
                placeholder="New Todo..."
                value={this.state.todo.task}
                onChange={this.handleChange}
              />
              <div className="NewTodoForm-select">
                <button
                  type="button"
                  className="NewTodoForm-label tooltip"
                  onClick={this.toggleShowLabel}
                >
                  <span className="NewTodoForm-label-icon">
                    <svg
                      data-svgs-path="sm1/priority_flag.svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      {+priority === 4 ? (<path
                        fill="#959595"
                        fillRule="nonzero"
                        d="M5 13.777V19.5a.5.5 0 1 1-1 0V5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.82 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.519 1.084-4.277 1.084-1.113 0-1.92-.196-3.658-.776C10.204 13.18 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777zm0-1.123C5.965 12.216 7.133 12 8.5 12c1.113 0 1.92.196 3.658.776 1.638.545 2.371.724 3.342.724 1.45 0 2.614-.262 3.5-.777V5.346c-.965.438-2.133.654-3.5.654-1.113 0-1.92-.196-3.658-.776C10.204 4.68 9.47 4.5 8.5 4.5c-1.45 0-2.614.262-3.5.777v7.377z"
                      ></path>): (
                        <path
                          fill={`${this.color[priority - 1]}`}
                          fillRule="nonzero"
                          d="M5 13.777V19.5a.5.5 0 1 1-1 0V5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.82 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.519 1.084-4.277 1.084-1.113 0-1.92-.196-3.658-.776C10.204 13.18 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777z"
                        ></path>
                      )}
                    </svg>
                  </span>
                  <span className="tooltiptext">Set the priority p1, p2, p3, p4</span>
                </button>
                <button type="button" className="tooltip NewTodoForm-label">
                  <span className="NewTodoForm-label-icon">
                    <svg
                      data-svgs-path="sm1/label_outline.svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="nonzero"
                        d="M3.914 11.086l6.5-6.5A2 2 0 0 1 11.828 4H18a2 2 0 0 1 2 2v6.172a2 2 0 0 1-.586 1.414l-6.5 6.5a2 2 0 0 1-2.828 0l-6.172-6.172a2 2 0 0 1 0-2.828zm.707.707a1 1 0 0 0 0 1.414l6.172 6.172a1 1 0 0 0 1.414 0l6.5-6.5a1 1 0 0 0 .293-.707V6a1 1 0 0 0-1-1h-6.172a1 1 0 0 0-.707.293l-6.5 6.5zM14.75 10.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"
                      ></path>
                    </svg>
                  </span>
                  <span className="tooltiptext">Add label</span>
                </button>
                {this.state.showLabel ? (
                  <div className="select-box">
                    <ul className="priority_list">
                      <li data-priority="1" onClick={this.handleSelectPriority}>
                        <span className="priority_item_icon">
                          <svg
                            data-svgs-path="sm1/priority_1.svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#d1453b"
                              fillRule="nonzero"
                              d="M5 13.777V19.5a.5.5 0 1 1-1 0V5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.82 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.519 1.084-4.277 1.084-1.113 0-1.92-.196-3.658-.776C10.204 13.18 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777z"
                            ></path>
                          </svg>
                        </span>{" "}
                        Priority 1
                      </li>
                      <li data-priority="2" onClick={this.handleSelectPriority}>
                        <span className="priority_item_icon">
                          <svg
                            data-svgs-path="sm1/priority_2.svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#EB8909"
                              fillRule="nonzero"
                              d="M5 13.777V19.5a.5.5 0 1 1-1 0V5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.82 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.519 1.084-4.277 1.084-1.113 0-1.92-.196-3.658-.776C10.204 13.18 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777z"
                            ></path>
                          </svg>
                        </span>{" "}
                        Priority 2
                      </li>
                      <li data-priority="3" onClick={this.handleSelectPriority}>
                        <span aria-hidden="true" className="priority_item_icon">
                          <svg
                            data-svgs-path="sm1/priority_3.svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#246fe0"
                              fillRule="nonzero"
                              d="M5 13.777V19.5a.5.5 0 1 1-1 0V5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.82 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.519 1.084-4.277 1.084-1.113 0-1.92-.196-3.658-.776C10.204 13.18 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777z"
                            ></path>
                          </svg>
                        </span>{" "}
                        Priority 3
                      </li>
                      <li  data-priority="4" onClick={this.handleSelectPriority}>
                        <span className="priority_item_icon">
                          <svg
                            data-svgs-path="sm1/priority_4.svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              fillRule="nonzero"
                              d="M5 13.777V19.5a.5.5 0 1 1-1 0V5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.82 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.519 1.084-4.277 1.084-1.113 0-1.92-.196-3.658-.776C10.204 13.18 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777zm0-1.123C5.965 12.216 7.133 12 8.5 12c1.113 0 1.92.196 3.658.776 1.638.545 2.371.724 3.342.724 1.45 0 2.614-.262 3.5-.777V5.346c-.965.438-2.133.654-3.5.654-1.113 0-1.92-.196-3.658-.776C10.204 4.68 9.47 4.5 8.5 4.5c-1.45 0-2.614.262-3.5.777v7.377z"
                            ></path>
                          </svg>
                        </span>{" "}
                        Priority 4
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        ) : null}
        {!show ? (
          <div className="add-task">
            <button onClick={this.showForm}>
              <span className="icon-add">
                <svg width="13" height="13">
                  <path
                    d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </span>
              &nbsp;&nbsp;Add task
            </button>
          </div>
        ) : (
          <div className="submit-btn-box">
            <button type="button" disabled={!task} onClick={this.handleSubmit}>Add</button>
            <button type="button" onClick={this.showForm}>Cancel</button>
          </div>
        )}
      </>
    );
  }
}
