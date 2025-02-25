import React from 'react'
import { useState } from 'react'

export default function App() {
  const [color, setColor] = useState("black")

  return (
    // background
    <div
      className='w-full h-screen duration-200'
      style={{ backgroundColor: color }}
    >
      {/* button container */}
      <div className='flex flex-wrap justify-center fixed bottom-5 inset-x-0'>
        <div className='bg-white flex flex-wrap justify-center px-3 py-2 rounded-full gap-3 shadow-xl border-2 border-black'>

          {/* button-1: red */}
          <button
            onClick={() => setColor("red")}
            className='outline-none rounded-full px-3 py-1.5 text-white font-bold shadow-lg'
            style={{ backgroundColor: "red" }}
          >
            Red
          </button>

          {/* button-2: dark-salmon */}
          <button
            onClick={() => setColor("DarkSalmon")}
            className='outline-none rounded-full px-3 py-1.5 text-white font-bold shadow-lg'
            style={{ backgroundColor: "DarkSalmon" }}
          >
            DarkSalmon
          </button>

          {/* button-3: dark-cyan */}
          <button
            onClick={() => setColor("darkcyan")}
            className='outline-none rounded-full px-3 py-1.5 text-white font-bold shadow-lg'
            style={{ backgroundColor: "darkcyan" }}
          >
            DarkCyan
          </button>

          {/* button-4: dark-violet */}
          <button
            onClick={() => setColor("darkviolet")}
            className='outline-none rounded-full px-3 py-1.5 text-white font-bold shadow-lg'
            style={{ backgroundColor: "darkviolet" }}
          >
            DarkViolet
          </button>

        </div>
      </div>
    </div>
  )
}
