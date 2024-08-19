// src/components/Unsubscribe.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const URL = import.meta.env.VITE_APP_BACKEND_URL;


const Unsubscribe = () => {
  const [message, setMessage] = useState('Processing your request...');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get('email');
    setEmail(email);

    if (email) {
      axios.post(`${URL}/subscribe/unsubscribe`, { email })
        .then(response => {
          setMessage(response.data.message || 'You have successfully unsubscribed.');
        })
        .catch(error => {
          setMessage(error.response?.data?.message || 'An error occurred while processing your request.');
        });
    } else {
      setMessage('Invalid unsubscribe request.');
    }
  }, []);

  return (
    <div className='h-[100vh] flex items-center justify-center bg-white flex-col'>
      <h1 className='text-2xl font-bold'>Unsubscribe</h1>
      <p>{message}</p>
      <p>Sad to see you go...!</p>
    </div>
  );
};

export default Unsubscribe;
