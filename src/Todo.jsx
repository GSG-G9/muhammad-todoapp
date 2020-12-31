import React, { Component } from "react";
import "./Todo.css";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {
        task: this.props.taskProps,
        priority: this.props.priorityProps,
        label: "",
      },
      isEditing: false,
      show: false,
      showLabel: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.toggleToEdit = this.toggleToEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectPriority = this.handleSelectPriority.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.toggleShowLabel = this.toggleShowLabel.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleToggle() {
    this.props.toggleTodo(this.props.id);
  }

  toggleToEdit() {
    this.setState({ ...this.state.todo, isEditing: !this.state.isEditing });
  }

  handleChange(evt) {
    this.setState({
      todo: { ...this.state.todo, [evt.target.name]: evt.target.value },
    });
  }

  handleSelectPriority(evt) {
    this.setState({
      todo: {
        ...this.state.todo,
        priority: evt.target.dataset.priority,
      },
      showLabel: !this.state.showLabel,
    });
  }

  handleUpdate(evt) {
    evt.preventDefault();
    this.props.update(this.props.id, this.state.todo);
    this.setState({ isEditing: false });
  }

  toggleShowLabel() {
    this.setState({ ...this.state.todo, showLabel: !this.state.showLabel });
  }

  handleRemove() {
    this.props.remove();
}

  color = ["#d1453b", "#EBA909", "#246FE0", "#FFFFFF"];

  render() {
    const {
      taskProps,
      priorityProps,
      lastUpdate,
      createdOn,
      completed,
    } = this.props;
    const {
      todo: { task, priority },
      showLabel,
    } = this.state;
    let priorityValue = +priorityProps;
    return (
      <>
        {this.state.isEditing ? (
          <div className="edit-form">
            <div>
              <form className="NewTodoForm">
                <input
                  type="text"
                  id="task"
                  name="task"
                  placeholder="New Todo..."
                  value={task}
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
                        // data-svgs-path="sm1/priority_flag.svg"
                        // xmlns="http://www.w3.org/2000/svg"
                        fill={`${this.color[priority - 1]}`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        {+priority === 4 ? (
                          <path
                            fill="#959595"
                            fillRule="nonzero"
                            d="M5 13.777V19.5a.5.5 0 1 1-1 0V5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.82 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.519 1.084-4.277 1.084-1.113 0-1.92-.196-3.658-.776C10.204 13.18 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777zm0-1.123C5.965 12.216 7.133 12 8.5 12c1.113 0 1.92.196 3.658.776 1.638.545 2.371.724 3.342.724 1.45 0 2.614-.262 3.5-.777V5.346c-.965.438-2.133.654-3.5.654-1.113 0-1.92-.196-3.658-.776C10.204 4.68 9.47 4.5 8.5 4.5c-1.45 0-2.614.262-3.5.777v7.377z"
                          ></path>
                        ) : (
                          <path
                            fill={`${this.color[priority - 1]}`}
                            fillRule="nonzero"
                            d="M5 13.777V19.5a.5.5 0 1 1-1 0V5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.82 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.519 1.084-4.277 1.084-1.113 0-1.92-.196-3.658-.776C10.204 13.18 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777z"
                          ></path>
                        )}
                      </svg>
                    </span>
                    <span className="tooltiptext">
                      Set the priority p1, p2, p3, p4
                    </span>
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
                  {showLabel ? (
                    <div className="select-box">
                      <ul className="priority_list">
                        <li
                          data-priority="1"
                          onClick={this.handleSelectPriority}
                        >
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
                        <li
                          data-priority="2"
                          onClick={this.handleSelectPriority}
                        >
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
                        <li
                          data-priority="3"
                          onClick={this.handleSelectPriority}
                        >
                          <span
                            aria-hidden="true"
                            className="priority_item_icon"
                          >
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
                        <li
                          data-priority="4"
                          onClick={this.handleSelectPriority}
                        >
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
            <div className="submit-btn-box">
              <button
                type="button"
                disabled={!task}
                onClick={this.handleUpdate}
              >
                Save
              </button>
              <button type="button" onClick={this.toggleToEdit}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="Todo">
            <li className="Todo-item">
              <div className="Todo-task_label"></div>
              <div className="Todo-item-content">
                <span className="priority_item_icon">
                  <svg
                    data-svgs-path="sm1/priority_3.svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill={`${this.color[priorityValue - 1]}`}
                      fillRule="nonzero"
                      d="M5 13.777V19.5a.5.5 0 1 1-1 0V5a.5.5 0 0 1 .223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.82 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0 1 20 4.5V13a.5.5 0 0 1-.223.416c-1.09.727-2.519 1.084-4.277 1.084-1.113 0-1.92-.196-3.658-.776C10.204 13.18 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777z"
                    ></path>
                  </svg>
                </span>
                <div
                  className={completed ? "Todo-task completed" : "Todo-task"}
                  onClick={this.handleToggle}
                >
                  {taskProps}
                </div>
                <div className="Todo-buttons">
                  <button onClick={this.toggleToEdit}>
                    <i className="fas fa-pen"></i>
                  </button>
                  <button onClick={this.handleRemove}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="todo-date-box">
                <span className="create-on tooltip">
                  {new Date(createdOn).toLocaleString().split(",")[0]}
                  <span className="tooltiptext">Created on</span>
                </span>
                <span className="last-update tooltip">
                  {new Date(lastUpdate).toLocaleString().split(",")[0]}
                  <span className="tooltiptext">Last update</span>
                </span>
              </div>
            </li>
          </div>
        )}
      </>
    );
  }
}
