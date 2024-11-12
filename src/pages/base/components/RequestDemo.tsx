/* eslint-disable @typescript-eslint/no-explicit-any */
import useApi from "@/hooks/useApi";
import React from "react";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";

function RequestDemo() {
    const { publicApi } = useApi();

    const [formData, setFormData] = React.useState({
      firstName: "",
      lastName: "",
      companyName: "",
      description: "",
      email: "",
      phoneNumber: "",
    });
    const [errors, setErrors] = React.useState({
      email: "",
      phoneNumber: "",
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      // Clear previous errors
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));

      // Email format validation
      if (name === "email" && value.trim() !== "" && !validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address",
        }));
      }

      // Phone number minimum digits validation
      if (
        name === "phoneNumber" &&
        value.trim() !== "" &&
        !validatePhoneNumber(value)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Phone number should have at least 8 digits",
        }));
      }
    };

    const validateEmail = (email:string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

       const validatePhoneNumber = (phoneNumber:string) => {
         const digitsOnly = phoneNumber.replace(/\D/g, "");
         return digitsOnly.length >= 8 && digitsOnly.length <= 13;
       };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();

      // Check for validation errors before submitting
      if (Object.values(errors).some((error) => error !== "")) {
        toast.error("Please fix the validation errors before submitting");
        return;
      }

      try {
        const response = await publicApi.post("/demo/request", formData);
        toast.success("Demo Request sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          companyName: "",
          description: "",
          email: "",
          phoneNumber: "",
        });
        console.log(response.data, "request"); // Handle success message
      } catch (error) {
        console.error("Error submitting demo request:", error); // Handle error
      }
    };
    return (
      <div className="bg-gradient-to-b from-purple-600 to-indigo-700 h-96 w-full">
        <div className="w-full flex items-center justify-center my-12">
          <form
            onSubmit={handleSubmit}
            className="absolute top-40 bg-white shadow rounded py-12 lg:px-28 px-8"
          >
            <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
              See ProcureSwift in Action!
            </p>
            <div className="md:flex items-center mt-12">
              <div className="md:w-72 flex flex-col">
                <label className="text-base font-semibold leading-none text-gray-800">
                  First Name
                </label>
                <input
                  value={formData.firstName}
                  name="firstName"
                  onChange={handleChange}
                  arial-label="Please input name"
                  type="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Please input  name"
                  required
                />
              </div>
              <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Email Address
                </label>
                <input
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  arial-label="Please input email address"
                  type="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Please input email address"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="w-ful mt-12">
              <div className="md:w-72 flex flex-col">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Last Name
                </label>
                <input
                  value={formData.lastName}
                  name="lastName"
                  onChange={handleChange}
                  arial-label="Please input name"
                  type="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Please input last  name"
                  required
                />
              </div>
            </div>
            <div className="md:flex items-center mt-8">
              <div className="md:w-72 flex flex-col">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Company name
                </label>
                <input
                  value={formData.companyName}
                  name="companyName"
                  onChange={handleChange}
                  role="input"
                  type="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 "
                  placeholder="Please input company name"
                  required
                />
              </div>

              <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Phone Number
                </label>
                <PhoneInput
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  inputProps={{
                    name: "phoneNumber",
                    required: true,
                    autoFocus: true,
                  }}
                  international
                  defaultCountry="KE"
                  placeholder="Enter phone number"
                  onChange={(phoneNumber: string) =>
                    setFormData((prevData) => ({ ...prevData, phoneNumber }))
                  }
                  value={formData.phoneNumber}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col mt-8">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Message
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  role="textbox"
                  className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none"
                  defaultValue={""}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-center w-full">
              <button className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none">
                REQUEST A DEMO
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default RequestDemo;
