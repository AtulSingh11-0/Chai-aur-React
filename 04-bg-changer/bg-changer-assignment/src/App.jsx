import { useState } from 'react'
import Button from './Button'

export default function App() {
  const [color, setColor] = useState('black'); // state to manage background-color change

  const bgColors = [
    'Red',
    'Green',
    'Orange',
    'DarkOrchid',
    'Fuchsia',
    'MediumSpringGreen',
    'Salmon',
    'RoyalBlue',
  ] // array of background-colors which will be used

  return (
    // background
    <div
      className='w-full h-screen duration-200'
      style={{ backgroundColor: color }}
    >
      {/* button container */}
      <div className='flex flex-wrap justify-center fixed bottom-5 inset-x-0'>
        <div className='bg-white flex flex-wrap justify-center px-3 py-2 rounded-full gap-3 shadow-xl border border-black'>
          {bgColors.map((bgColor, index) => (
            // rendering button component with colors
            <Button key={index} color={bgColor} onClick={() => setColor(bgColor)} />
          ))}
        </div>
      </div>
    </div>
  )
}

