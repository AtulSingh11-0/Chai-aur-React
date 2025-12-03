import React from 'react'
import { useTodo } from '../contexts';

export default function TodoForm() {
  const [todo, setTodo] = React.useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    // prevent adding empty todos
    if (todo.trim() === "") return;

    // call the addTodo function from context to add the new todo
    addTodo({ title: todo, completed: false });
    // clear the input field after adding the todo
    setTodo("");
  }

  return (
    <form className="flex gap-3" onSubmit={add}>
      <input
        type="text"
        placeholder="What's the plan? 🤔"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="w-full rounded-xl px-5 py-3 outline-none bg-white border-3 border-[#1a1a2e] text-[#1a1a2e] placeholder-[#1a1a2e]/40 font-medium text-lg cartoon-shadow focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all duration-150"
        style={{ borderWidth: '3px' }}
      />
      <button
        type="submit"
        className="rounded-xl px-6 py-3 bg-[#4ECDC4] text-[#1a1a2e] font-bold text-lg shrink-0 border-3 border-[#1a1a2e] cartoon-shadow hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:bg-[#45B7AA] transition-all duration-150"
        style={{ borderWidth: '3px' }}
      >
        Add!
      </button>
    </form>
  );
}