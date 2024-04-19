/* eslint-disable @typescript-eslint/no-explicit-any */
import useApi from '@/hooks/useApi';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
    const { publicApi } = useApi()

    const [credentials, setCredentials] = React.useState({ email: '' });
    const [error, setError] = React.useState('');
    const [loading, setLoading] =React.useState(false);
    const navigate = useNavigate();

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await publicApi.post("/forgotPassword/verifyMail", credentials);
            const emailData = response.data
            console.log(emailData, "email");
              
            navigate(`/verifyOtp/${credentials.email}`); // Navigate to "/verifyOtp/:email" after successful verification
        } catch (error: any) {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                setError('Invalid credentials. Please check your email.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Verify your Email to Continue</div>
                <div className="mt-10">
                    <form onSubmit={handleSubmit}>
                        {error && <p className="text-red-500">{error}</p>}

                        <div className="flex flex-col mb-6">
                            <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Email:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>

                                <input type='email' name="email" id="email" onChange={handleChange} value={credentials.email} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Email" />
                            </div>
                        </div>

                        <div className="flex w-full">
                            <button type="submit" disabled={loading} className={`flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {loading ? 'Loading...' : 'Verify Email'}
                                {!loading && (
                                    <span>
                                        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;
