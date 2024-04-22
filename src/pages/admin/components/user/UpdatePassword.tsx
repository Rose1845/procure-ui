/* eslint-disable @typescript-eslint/no-explicit-any */
import useApi from "@/hooks/useApi";
import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdatePassword() {
  const { axiosApi } = useApi();
  const {id} = useParams()

  const [credentials, setCredentials] = useState({
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false); // Default is to hide password

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleTogglePassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosApi.patch(
        `/users/${id}/update/password`,
        credentials
      );
      const emailData = response.data;
      console.log(emailData, "email");
      if (response.status === 200) {
        toast.success("password changed!");
        navigate(`/dashboard/profile/user/${id}`);
      } else {
        toast.error("An error occured!");
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        setError("an error occured");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          Update Password
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Password:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={credentials.password}
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
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Loading..." : "Update Password"}
                {!loading && (
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
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

export default UpdatePassword;
