import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.getTodos()
      .then((res) => res.json())
      .then((data) => this.setState({ todos: [...this.state.todos, ...data] }))
      .catch((err) => this.setState({ errorMsg: err.msg }));
  }

  getTodos() {
    return fetch("/data.json");
  }

  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.todo_id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }

  addTodo(newTodo) {
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  }

  update(id, { task, priority, label }) {
    const updateTodos = this.state.todos.map((todo) => {
      if (todo.todo_id === id) {
        return {
          ...todo,
          todo_content: task,
          priority,
          label,
          last_update: Date.now(),
        };
      }
      return todo;
    });
    this.setState({
      todos: updateTodos,
    });
  }

  remove(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.todo_id !== id),
    });
  }

  render() {
    const {todos} = this.state;
    const todosElnts = this.state.todos.map((item) => (
      <Todo
        key={item.todo_id}
        taskProps={item.todo_content}
        priorityProps={item.priority}
        completed={item.completed}
        createdOn={item.created_on}
        lastUpdate={item.last_update}
        update={this.update}
        id={item.todo_id}
        toggleTodo={this.toggleCompletion}
        remove={() => this.remove(item.todo_id)}
      />
    ));
    return (
      <div className="TodoList">
        <h1>Todo List!</h1>
        <p>
          You have{" "}
          <span style={{ color: "#15f505" }}>{todos.length}</span>{" "}
          todos,{" "}
          <span style={{ color: "#f55505" }}>
            {todos.filter((todo) => todo.completed === false).length}
          </span>{" "}
          not complete
        </p>
        <ul className="TodoList-list">
          {todos.length > 0 ? todosElnts : "No todos..."}
        </ul>
        <NewTodoForm addTodo={this.addTodo} />
      </div>
    );
  }
}
