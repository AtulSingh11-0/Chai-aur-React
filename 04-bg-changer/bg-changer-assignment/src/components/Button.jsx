import { useState } from 'react'

export default function Button({ color, onClick }) {
  const [isHover, setIsHover] = useState(false) // state to check if the cursor is hovering on the button or not

  const handleMouseEnter = () => {
    setIsHover(true);
  } // handling state change of mouse entering hovering area

  const handleMouseLeave = () => {
    setIsHover(false);
  } // handling state change of mouse leaving hovering area

  return (
    <button
      onClick={onClick}
      className='outline-none rounded-full px-3 py-1.5 font-bold transition ease-in duration-300'
      style={{
        color: isHover ? 'white' : color,
        backgroundColor: !isHover ? '' : color,
        border: isHover ? '1px solid black' : `1px solid ${color}`
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {color}
    </button>
  )
}
