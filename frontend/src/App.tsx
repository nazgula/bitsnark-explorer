import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'


function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState<string>('');

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/test');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Parse the JSON response
      setMessage(data.message);
    } catch (error) {
      console.log(error)
      console.error('Error fetching data:', error);
      setMessage('Error fetching data');
    }
  };

  return (
    <>
      <div className='flex'>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {message}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleClick}>
          getMessage
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
