import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

export default class TodoList extends Component {
  render() {
    return <div>
      <Todo />
      <NewTodoForm />
    </div>;
  }
}
