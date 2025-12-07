import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";

const AddIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

function TodoForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo({ title }));
      setTitle("");
    }
  };

  return (
    <div className="bg-amber-50 border-4 border-amber-900/30 rounded-lg p-6 relative"
      style={{
        boxShadow: '8px 8px 0px rgba(120, 80, 40, 0.3), inset 0 0 30px rgba(180, 140, 80, 0.2)',
        backgroundImage: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%)'
      }}>

      {/* Small wax seal */}
      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-20"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #d97706 0%, #b45309 50%, #92400e 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
        }}>
        <span className="text-sm text-amber-200">✒</span>
      </div>

      <h2 className="text-2xl text-amber-950 text-center mb-5"
        style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}>
        ❦ Inscribe New Task ❦
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What task dost thou seek to record..."
          className="flex-1 px-4 py-3 bg-amber-100/60 focus:outline-none text-lg text-amber-950 placeholder:text-amber-700/50 placeholder:italic rounded-md border-2 border-amber-700/30 focus:border-amber-700"
          style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '1.2rem' }}
        />
        <button
          type="submit"
          className="w-12 h-12 rounded-full flex items-center justify-center text-amber-50 transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
          }}
          title="Inscribe"
        >
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
