import React from "react";

export const TodoContext = React.createContext({
  todos: [
    {
      id: 1,
      title: "Sample Todo",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, updatedTodo) => {},
  removeTodo: (id) => {},
  toggleTodoCompletion: (id) => {},
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
  return React.useContext(TodoContext);
};
