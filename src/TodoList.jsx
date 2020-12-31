import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    this.getTodos()
    .then(res => res.json())
    .then(data => this.setState({todos: [...this.state.todos, ...data]}))
    .then(() => console.log(this.state.todos))
    .catch(err => this.setState({errorMsg: err.msg}));
    
  }

  getTodos () {
    return fetch('/data.json');
  }

  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if(todo.todo_id === id) {
        console.log(todo);
        return {...todo, completed: !todo.completed};
      }
      return todo;
    })
    // console.log(updatedTodos);
    this.setState({ todos: updatedTodos });
  }

  addTodo(newTodo) {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
    console.log(this.state.todos)
  }


  render() {
    const todos = this.state.todos.map(item => (
      <Todo
        key={item.todo_id}
        task={item.todo_content}
        completed={item.completed}
        createdOn={item.created_on}
        lastUpdate={item.last_update}
        id={item.todo_id}
        toggleTodo={this.toggleCompletion}
      />
    ));
    return (
      <div className="TodoList">
        <h1>
          Todo List! <span>A Simple React Todo List App.</span>
        </h1>
        <ul className="TodoList-list">{this.state.todos.length > 0 ? todos : "No todos..."}</ul>
        <NewTodoForm addTodo={this.addTodo} />
      </div>
    );
  }
}
