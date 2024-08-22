// ForgotPassword.jsx
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config'; // Import your Firebase config
import { Link, useNavigate } from 'react-router-dom';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const naviget=useNavigate()

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setTimeout(()=>{
          naviget("/login")
      },3000)
    } catch (err) {
      setError('Failed to send password reset email.');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm  rounded-sm">
        <img
          alt="Your Company"
          src="\logo.svg"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Your Password
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-5 rounded-sm">
        <form className="space-y-6" onSubmit={handlePasswordReset}>
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#f56551] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#d65e4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send Password Reset Email
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Remember your password? <Link to="/login" className="text-[#f56551]">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Reset;
