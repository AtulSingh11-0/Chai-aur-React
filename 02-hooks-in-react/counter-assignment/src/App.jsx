import { useState } from 'react'
import './App.css'

function App() {
  const COUNT = 10; // Initial count value
  const [count, setCount] = useState(COUNT);

  const reset = () => setCount(COUNT); // Reset the count to initial value

  const increment = () => count < 20 ? setCount(prevValue => prevValue + 1) : alert("Counter can't be greater than 20"); // Increment the count

  const decrement = () => count >= 1 ? setCount(prevValue => prevValue - 1) : alert("Counter can't be less than 0"); // Decrement the count

  return (
    <>
      <div className="question">
        <h1>Assignment-1 Hooks-In-React</h1>
        <ul>
          <li>Create a basic counter app</li>
          <li>implement useState hook to create a counter</li>
          <li>create a button to increment the counter</li>
          <li>display the count in a p tag</li>
          <li>The counter should not increment beyond 20</li>
          <li>The counter should not decrement to less than 0</li>
          <li>Add a reset button to reset the counter to 0</li>
        </ul>
      </div>
      <div className="count">
        <h1>Count is <span>{count}</span></h1>
      </div>
      <div className="card">
        <button className='increment-btn' onClick={increment}>Increment</button>
        <button className='decrement-btn' onClick={decrement}>Decrement</button>
        <button className='reset-btn' onClick={reset}>Reset</button>
      </div>
    </>
  )
}

export default App
