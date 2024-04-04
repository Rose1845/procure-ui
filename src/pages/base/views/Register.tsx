/* eslint-disable @typescript-eslint/no-explicit-any */
import { publicApi } from '@/api';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"; // Import eye and eye-off icons
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  const [register, setRegister] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleTogglePassword = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input fields
    if (!register.firstName || !register.lastName || !register.email || !register.username || !register.password) {
      toast.error('Please fill in all fields.');
      return;
    }

    // Validate password length
    if (register.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await publicApi.post('/auth/register', register);
      if (response.data) {
        toast.success('Registered successfully');
        setRegister({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          username: '',
        });
        navigate('/login');
      } else {
        toast.error('Please try again later');
      }
    } catch (error:any) {
      if (error.response && error.response.status === 409) {
        toast.error('Email already exists. Please use a different email.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Register an Account</div>
        <div className="mt-10">
          <form onSubmit={handleRegister}>
            <div className="flex space-x-3 -mx-3">
              <div className="flex flex-col mb-6">
                <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">First Name:</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg className="h-6 w-6 inline-block mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C7.032 2 3 6.038 3 10v2a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5v-2c0-3.962-4.032-8-9-8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>

                  <input name="firstName"
                    id="firstName"
                    onChange={handleInputChange}
                    value={register.firstName} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="username" />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Last Name:</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg className="h-6 w-6 inline-block mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C7.032 2 3 6.038 3 10v2a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5v-2c0-3.962-4.032-8-9-8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>

                  <input name="lastName"
                    id="lastName"
                    onChange={handleInputChange}
                    value={register.lastName} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="username" />
                </div>
              </div>
            </div>
            <div className="flex space-x-3 -mx-3">
              <div className="flex flex-col mb-6">
                <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-mail Address:</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  <input name="email"
                    id="email"
                    onChange={handleInputChange}
                    value={register.email} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="username" />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Username:</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  <input name="username"
                    id="username"
                    onChange={handleInputChange}
                    value={register.username} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="username" />
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                  value={register.password}
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Password"
                />
                <button
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
            </div>
            <div className="flex w-full">
              <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                <span className="mr-2 uppercase">Register</span>
                <span>
                  <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center mt-6">
          <a href="/Register" target="_blank" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
            <span>
              <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </span>
            <span className="ml-2">Already have an account?</span>
          </a>
        </div>
      </div>
    </div>)
}

export default Register