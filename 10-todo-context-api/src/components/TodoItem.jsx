import React from 'react'
import { useTodo } from '../contexts';

export default function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = React.useState(false);
  const [todoMsg, setTodoMsg] = React.useState(todo.title);
  const { toggleTodoCompletion, updateTodo, removeTodo } = useTodo();

  const toggleTodoCompleted = () => {
    toggleTodoCompletion(todo.id);
  }

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, title: todoMsg })
    setIsTodoEditable(false);
  }
  return (
    <div
      className={`flex items-center rounded-xl px-4 py-3 gap-x-3 border-3 transition-all duration-150 hover:animate-wiggle group relative overflow-hidden ${todo.completed
        ? "bg-[#A8E6CF] border-[#1a1a2e] cartoon-shadow hover:shadow-[4px_4px_0px_0px_#1a1a2e,0_0_15px_rgba(168,230,207,0.5)]"
        : "bg-[#FF8B94] border-[#1a1a2e] cartoon-shadow hover:shadow-[4px_4px_0px_0px_#1a1a2e,0_0_15px_rgba(255,139,148,0.5)]"
        }`}
      style={{ borderWidth: '3px' }}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer pointer-events-none transition-opacity duration-300"></div>

      <input
        type="checkbox"
        className="w-6 h-6 cursor-pointer accent-[#1a1a2e] rounded transition-all hover:scale-125 hover:rotate-12 relative z-10"
        checked={todo.completed}
        onChange={toggleTodoCompleted}
      />
      <input
        type="text"
        className={`border-3 outline-none w-full bg-transparent rounded-lg font-medium text-lg transition-all duration-200 relative z-10 ${isTodoEditable
          ? "border-[#1a1a2e] px-3 py-1 bg-white/70"
          : "border-transparent"
          } ${todo.completed ? "line-through text-[#1a1a2e]/60" : "text-[#1a1a2e]"}`}
        style={{ borderWidth: isTodoEditable ? '3px' : '0' }}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-10 h-10 rounded-lg text-lg border-3 border-[#1a1a2e] justify-center items-center bg-[#FFEAA7] cartoon-shadow hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 hover:rotate-3 shrink-0 disabled:opacity-50 disabled:hover:shadow-[3px_3px_0px_0px_#1a1a2e] disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:rotate-0 transition-all duration-150 relative z-10"
        style={{ borderWidth: '3px' }}
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-10 h-10 rounded-lg text-lg border-3 border-[#1a1a2e] justify-center items-center bg-white cartoon-shadow hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-red-200 hover:-rotate-3 shrink-0 transition-all duration-150 relative z-10"
        style={{ borderWidth: '3px' }}
        onClick={() => removeTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}
