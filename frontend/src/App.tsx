import { useState } from 'react'
import './App.css'
import React from 'react'
import axiosInstance from './axiosInstance';
import InteractionList from './pages/interactions-list/InetractionsList'


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
      <InteractionList />
    </>
  )
}

export default App
