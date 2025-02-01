import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // Function to update the count value
  function updateCount(value) {
    setCount(
      prevCount => prevCount + value
    ); // Increment or decrement the count based on the previous count value
  }

  return (
    <>
      <div className="header">
        <h1>Counter Project</h1>
        <p>Click on the increment button to add a value to count</p>
        <p>Click on the decrement button to deduct a value from count</p>
      </div>

      <div className="count">
        <h1>Count is <span>{count}</span></h1>
      </div>

      <div className="card">
        <button className='increment-btn' onClick={() => updateCount(1)}>Increment</button> {/* Call the updateCount function with value 1 */}
        <button className='decrement-btn' onClick={() => updateCount(-1)}>Decrement</button> {/* Call the updateCount function with value - 1 */}
      </div >
    </>
  )
}

export default App
