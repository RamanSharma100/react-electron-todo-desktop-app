import React, { useState } from "react";

import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo) return alert("Please fill the empty field!!");

    const data = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      text: todo,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, data]);
    setTodo("");
    alert("Todo Added Successfully!!");
  };

  const todoComplete = (id) => {
    const filteredTodo = todos[id];
    if (filteredTodo.completed) return;
    filteredTodo.completed = true;

    setTodos((prevTodos) =>
      prevTodos.map((tdo, i) => (i === id ? filteredTodo : tdo))
    );
    alert("Well done!!");
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((tdo) => tdo.id !== id));
    alert("Todo deleted successfully!!");
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center my-5">Todo List Desktop App</h1>
        <div className="row">
          <div className="col-md-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form-group d-flex">
                <input
                  className="form-control rounded-0 w-80"
                  type="text"
                  placeholder="Add Todo..."
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  style={{ outline: "none", boxShadow: "none" }}
                />
                <button type="submit" className="btn btn-primary rounded-0">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-md-8 my-5 mx-auto">
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <div key={index} className="d-flex py-0 my-2 w-100 ">
                  <h5
                    className={`position-relative d-block my-0 todo text-center py-3 ${
                      todo.completed ? "completed" : "notCompleted"
                    }`}
                    style={{ width: "80%", height: "100%" }}
                    onClick={() => todoComplete(index)}
                  >
                    {todo.text}
                  </h5>
                  {todo.completed && (
                    <button
                      type="button"
                      onClick={() => deleteTodo(todo.id)}
                      className="btn btn-danger ml-3"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            ) : (
              <h1 className="display-4 text-center">No Todos Found</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
