import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";

export default class TodoList extends Component {
  render() {
    return (
      <div className="TodoList">
        <h1>
          Todo List! <span>A Simple React Todo List App.</span>
        </h1>
        <ul>
          <Todo task="New Todo" completed="false" />
          <Todo task="New Todo" completed="false" />
          <Todo task="New Todo" completed="false" />
        </ul>
        <NewTodoForm />
      </div>
    );
  }
}
