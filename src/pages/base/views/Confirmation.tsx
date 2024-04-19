/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useApi from '@/hooks/useApi';

function Confirmation() {
    const { publicApi } = useApi()

    const { email } = useParams();
    const [, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = e.target.value;
        setOtpDigits(newOtpDigits);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const otp = otpDigits.join('');
            const response = await publicApi.post(`/forgotPassword/verifyOtp/${email}`, { otp });
            console.log(response.data, "otpData");
            if (response.data && response.status === 200) {
                toast.success("OTP Verified!")
            }
            navigate(`/change-password/${email}`);
        } catch (error: any) {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                setError('Invalid OTP. Please check your OTP and try again.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12">
            <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">Email Verification</div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {email}</p>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    {otpDigits.map((digit, index) => (
                                        <div key={index} className="w-16 h-16">
                                            <input
                                                className="w-full h-full flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                type="text"
                                                value={digit}
                                                maxLength={1}
                                                onChange={(e) => handleChange(e, index)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button
                                            className="w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {/* Verify Email */}
                                            {loading ? 'Verifying...' : 'Verify Account'}
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't receive the code?</p> <a className="text-blue-600" href="#" onClick={(e) => e.preventDefault()}>Resend</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
