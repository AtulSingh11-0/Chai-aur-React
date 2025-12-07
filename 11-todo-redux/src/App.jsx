import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateTodo, deleteTodo, toggleTodo } from "./features/todoSlice"
import TodoForm from "./components/TodoForm"

// Gothic SVG Icons
const QuillIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M21.17 2.06A13.1 13.1 0 0 0 19 1.87a12.94 12.94 0 0 0-7 2.05 12.94 12.94 0 0 0-4.7 6.08L3 14.29a1 1 0 0 0 .3 1.1l1.3 1.08-2.43 2.44a1 1 0 0 0 1.42 1.42l2.44-2.44 1.08 1.3a1 1 0 0 0 1.1.3l4.29-4.29a12.94 12.94 0 0 0 6.08-4.7 12.94 12.94 0 0 0 2.05-7 13.1 13.1 0 0 0-.19-2.17 1 1 0 0 0-.77-.77zM9.88 17.69l-.57-.69-.69-.57 2.89-2.9 1.27 1.27zm8.24-8.24a10.94 10.94 0 0 1-4.86 3.76l-1.33-1.33a10.94 10.94 0 0 1 3.76-4.86 10.94 10.94 0 0 1 4.86-1.88 10.94 10.94 0 0 1-2.43 4.31z" />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const SealIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const CancelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
  </svg>
);

function App() {
  const [editingId, setEditingId] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState("");
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  }

  const handleSave = (id) => {
    if (editTitle.trim()) {
      dispatch(updateTodo({ id, title: editTitle }));
    }
    setEditingId(null);
    setEditTitle("");
  }

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
  }

  const handleKeyDown = (e, todoId) => {
    if (e.key === 'Enter') {
      handleSave(todoId);
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  }

  return (
    <div className="min-h-screen py-10 px-6 relative"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}>

      {/* Corner ornaments */}
      <div className="fixed top-4 left-4 text-4xl opacity-20 text-amber-200">❧</div>
      <div className="fixed top-4 right-4 text-4xl opacity-20 text-amber-200 scale-x-[-1]">❧</div>
      <div className="fixed bottom-4 left-4 text-4xl opacity-20 text-amber-200 rotate-180 scale-x-[-1]">❧</div>
      <div className="fixed bottom-4 right-4 text-4xl opacity-20 text-amber-200 rotate-180">❧</div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT COLUMN - Header & Form */}
          <div className="space-y-8">

            {/* Header Parchment */}
            <div className="relative">
              <div className="bg-amber-50 border-4 border-amber-900/30 rounded-lg p-8 relative"
                style={{
                  boxShadow: '8px 8px 0px rgba(120, 80, 40, 0.3), inset 0 0 30px rgba(180, 140, 80, 0.2)',
                  backgroundImage: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%)'
                }}>

                {/* Wax Seal */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center z-20"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #dc2626 0%, #991b1b 50%, #7f1d1d 100%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)'
                  }}>
                  <span className="text-xl text-amber-300">⚜</span>
                </div>

                <h1 className="text-4xl text-center text-amber-950 mt-4 mb-3"
                  style={{
                    fontFamily: "'UnifrakturMaguntia', cursive",
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}>
                  Ye Olde Task Scroll
                </h1>

                <p className="text-center text-amber-800 text-lg italic mb-2"
                  style={{ fontFamily: "'Pinyon Script', cursive" }}>
                  ✦ Wherein Tasks Most Important Art Recorded ✦
                </p>

                <p className="text-center text-amber-700 text-sm"
                  style={{ fontFamily: "'IM Fell English SC', serif" }}>
                  ~ Anno Domini MDCCCXLII ~
                </p>

                <div className="flex items-center justify-center mt-4 gap-3">
                  <div className="h-px w-20 bg-linear-to-r from-transparent to-amber-700"></div>
                  <span className="text-amber-700 text-lg">❦</span>
                  <div className="h-px w-20 bg-linear-to-l from-transparent to-amber-700"></div>
                </div>
              </div>
            </div>

            {/* Form */}
            <TodoForm />

            {/* Decorative Quote */}
            <div className="bg-amber-50/80 border-2 border-amber-900/20 rounded-lg p-6 text-center"
              style={{
                backgroundImage: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
              }}>
              <p className="text-amber-800 text-xl italic"
                style={{ fontFamily: "'Pinyon Script', cursive" }}>
                "A task well recorded is half accomplished"
              </p>
              <p className="text-amber-700 text-sm mt-2"
                style={{ fontFamily: "'IM Fell English SC', serif" }}>
                — Ancient Proverb
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN - Todo List */}
          <div className="relative">
            <div className="bg-amber-50 border-4 border-amber-900/30 rounded-lg p-6 min-h-[500px]"
              style={{
                boxShadow: '8px 8px 0px rgba(120, 80, 40, 0.3), inset 0 0 30px rgba(180, 140, 80, 0.2)',
                backgroundImage: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%)'
              }}>

              {/* Wax Seal */}
              <div className="absolute -top-4 right-8 w-12 h-12 rounded-full flex items-center justify-center z-20"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #b45309 0%, #92400e 50%, #78350f 100%)',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.4), inset 0 2px 3px rgba(255,255,255,0.2)'
                }}>
                <span className="text-base text-amber-200">✠</span>
              </div>

              <h2 className="text-2xl text-center text-amber-950 mb-6"
                style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}>
                ❦ Tasks Inscribed ❦
              </h2>

              <ul className="space-y-4">
                {todos.map((todo, index) => (
                  <li
                    key={todo.id}
                    className={`flex items-center px-4 py-3 gap-x-3 relative rounded-md ${todo.completed ? "opacity-70" : ""
                      }`}
                    style={{
                      background: todo.completed
                        ? 'linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.15) 50%, transparent 100%)'
                        : 'linear-gradient(90deg, transparent 0%, rgba(180, 140, 80, 0.1) 50%, transparent 100%)',
                      borderBottom: '2px solid rgba(180, 140, 80, 0.3)'
                    }}
                  >
                    {/* Number badge */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: todo.completed
                          ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                          : 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        color: '#fefce8',
                        fontFamily: "'IM Fell English SC', serif"
                      }}>
                      {index + 1}
                    </div>

                    <input
                      type="checkbox"
                      className="w-5 h-5 cursor-pointer accent-amber-700 disabled:opacity-40 disabled:cursor-not-allowed"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleTodo({ id: todo.id }))}
                      disabled={editingId === todo.id}
                    />

                    <input
                      type="text"
                      className={`outline-none w-full bg-transparent transition-all ${editingId === todo.id
                        ? "border-b-2 border-amber-700 px-2 py-1 bg-amber-100/50 rounded"
                        : "border-transparent"
                        } ${todo.completed ? "line-through text-amber-800/50" : "text-amber-950"}`}
                      style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '1.25rem' }}
                      value={editingId === todo.id ? editTitle : todo.title}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => editingId === todo.id && handleKeyDown(e, todo.id)}
                      readOnly={editingId !== todo.id}
                    />

                    {/* Cancel Button - only show when editing */}
                    {editingId === todo.id && (
                      <button
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-50 transition-all shrink-0 hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                          boxShadow: '0 3px 8px rgba(0,0,0,0.3)'
                        }}
                        onClick={handleCancel}
                        title="Cancel"
                      >
                        <CancelIcon />
                      </button>
                    )}

                    {/* Edit/Save Button */}
                    <button
                      className="w-10 h-10 rounded-full flex items-center justify-center text-amber-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0 hover:scale-110"
                      style={{
                        background: editingId === todo.id
                          ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                          : 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.3)'
                      }}
                      onClick={() => {
                        if (todo.completed) return;
                        if (editingId === todo.id) {
                          handleSave(todo.id);
                        } else {
                          handleEditClick(todo);
                        }
                      }}
                      disabled={todo.completed}
                      title={editingId === todo.id ? "Save" : "Edit"}
                    >
                      {editingId === todo.id ? <SealIcon /> : <QuillIcon />}
                    </button>

                    {/* Delete Button */}
                    <button
                      className="w-10 h-10 rounded-full flex items-center justify-center text-red-50 transition-all shrink-0 hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.3)'
                      }}
                      onClick={() => dispatch(deleteTodo({ id: todo.id }))}
                      title="Delete"
                    >
                      <CrossIcon />
                    </button>
                  </li>
                ))}
              </ul>

              {todos.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-amber-800 text-2xl italic"
                    style={{ fontFamily: "'Pinyon Script', cursive" }}>
                    ~ No tasks hath been inscribed upon this scroll ~
                  </p>
                  <p className="text-amber-700 text-sm mt-4"
                    style={{ fontFamily: "'IM Fell English SC', serif" }}>
                    Use the quill to add thy first task
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App