import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import axiosInstance from './axiosInstance';
import { Button } from '@mui/material'


function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState<string>('');

  const handleClick = async () => {
    try {
      const txid = '32d5cabf8cc2805bb57ba865f386f7ea94b0e6c3ee12ab12fd0f511130c2ea1f';
      const response = await axiosInstance.get(`/getTx/${txid}`);

      // Check if response data is available and handle it
      if (response && response.data) {
        console.log(response.data);
        setMessage(JSON.stringify(response.data)); // Update the state with the response data
      } else {
        setMessage('No data received');
      }
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

        <Button color="primary" onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
        <Button color="secondary" onClick={handleClick}>Secondary Button</Button>


        <p>
          {message}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
