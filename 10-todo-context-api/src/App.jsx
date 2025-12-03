import React from 'react';
import { TodoForm, TodoItem } from './components';
import { TodoProvider } from './contexts';

export default function App() {
  // create a state to hold the todos
  const [todos, setTodos] = React.useState([])

  // implement the functions to add, remove, and toggle todos

  // 1. function to add a todo
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  // 2. function to update a todo
  const updateTodo = (id, updatedTodo) => {
    // loop over the todos and find the todo with the matching id
    // then update its title and save the updated todo list to state
    setTodos((prev) => prev.map((todo) => (todo.id === id ? updatedTodo : todo)))
  }

  // 3. function to remove a todo
  const removeTodo = (id) => {
    // loop over the todos and filter out the todo with the matching id
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  // 4. function to toggle the completion status of a todo
  const toggleTodoCompletion = (id) => {
    // loop over the todos and find the todo with the matching id
    // then toggle its completed status and save the updated todo list to state
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // use useEffect hook to load initial todos from local storage
  React.useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  // use useEffect hook to save todos to local storage whenever they change
  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, removeTodo, toggleTodoCompletion }}>
      <div className="bg-[#FFF8E7] min-h-screen py-10 px-4 relative overflow-hidden">
        {/* Decorative blobs - morphing and floating */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#FF6B6B] opacity-50 blur-md animate-float animate-blob-morph"></div>
        <div className="absolute top-60 right-10 w-32 h-32 bg-[#4ECDC4] opacity-50 blur-md animate-float animate-blob-morph" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-[#FFE66D] opacity-50 blur-md animate-float animate-blob-morph" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-36 h-36 bg-[#DDA0DD] opacity-40 blur-md animate-float animate-blob-morph" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-[#98D8C8] opacity-50 blur-md animate-float animate-blob-morph" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-20 right-1/3 w-20 h-20 bg-[#F7DC6F] opacity-60 blur-sm animate-float animate-blob-morph" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-1/3 left-10 w-16 h-16 bg-[#85C1E9] opacity-50 blur-md animate-float animate-blob-morph" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 right-5 w-14 h-14 bg-[#F1948A] opacity-60 blur-sm animate-float animate-blob-morph" style={{ animationDelay: '0.8s' }}></div>

        {/* Rotating ring decoration */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 border-4 border-dashed border-[#4ECDC4]/20 rounded-full animate-rotate-slow pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 border-4 border-dashed border-[#FF6B6B]/20 rounded-full animate-rotate-slow pointer-events-none" style={{ animationDirection: 'reverse' }}></div>

        <div className="w-full max-w-2xl mx-auto bg-[#FFEAA7] border-4 border-[#1a1a2e] rounded-4xl px-6 py-8 animate-glow-pulse relative z-10 sparkle-container overflow-hidden">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 animate-shimmer pointer-events-none rounded-4xl"></div>

          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-4 border-l-4 border-[#FF6B6B] rounded-tl-lg"></div>
          <div className="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 border-[#4ECDC4] rounded-tr-lg"></div>
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 border-[#4ECDC4] rounded-bl-lg"></div>
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-4 border-r-4 border-[#FF6B6B] rounded-br-lg"></div>

          {/* Bold Edgy Title */}
          <div className="relative mb-10 mt-2">
            <div className="absolute -inset-1 bg-[#1a1a2e] rounded-xl skew-x-2 skew-y-1"></div>
            <h1 className="relative bg-linear-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D] text-4xl md:text-5xl font-black text-center py-3 px-4 text-[#1a1a2e] tracking-tight uppercase rounded-xl border-4 border-[#1a1a2e] overflow-hidden">
              <span className="drop-shadow-[2px_2px_0px_rgba(255,255,255,0.8)] relative z-10">Get Stuff Done</span>
              <div className="absolute inset-0 animate-shimmer"></div>
            </h1>
          </div>
          <div className="mb-6 relative z-10">
            <TodoForm />
          </div>
          <div className="flex flex-col gap-y-4 relative z-10">
            {todos.map((todo, index) => (
              <div
                key={todo.id}
                className="w-full animate-fade-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
          {todos.length === 0 && (
            <div className="text-center py-10 relative z-10">
              <p className="text-[#1a1a2e] text-xl font-bold uppercase tracking-wide">No tasks yet!</p>
              <p className="text-[#1a1a2e]/60 text-lg mt-2">Add something above 👆</p>
            </div>
          )}
        </div>
      </div>
    </TodoProvider>
  )
}


