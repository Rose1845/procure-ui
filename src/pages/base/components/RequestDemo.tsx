/* eslint-disable @typescript-eslint/no-explicit-any */
import { publicApi } from "@/api";
import React from "react";
import { toast } from "react-toastify";

function RequestDemo() {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        companyName: '',
        description: '',
        email: '',
        phoneNumber: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await publicApi.post('/demo/request', formData);
            toast.success("Request sent succesffully!")
            setFormData(
                {
                    firstName: '',
                    lastName: '',
                    companyName: '',
                    description: '',
                    email: '',
                    phoneNumber: ''
                }
            )
            console.log(response.data, "request"); // Handle success message
        } catch (error) {
            console.error('Error submitting demo request:', error); // Handle error
        }
    };
    return (
        <div className="bg-gradient-to-b from-purple-600 to-indigo-700 h-96 w-full">
            <div className="w-full flex items-center justify-center my-12">
                <form onSubmit={handleSubmit} className="absolute top-40 bg-white shadow rounded py-12 lg:px-28 px-8">
                    <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">Let’s chat and get a quote!</p>
                    <div className="md:flex items-center mt-12">
                        <div className="md:w-72 flex flex-col">
                            <label className="text-base font-semibold leading-none text-gray-800">First Name</label>
                            <input value={formData.firstName} name="firstName" onChange={handleChange} arial-label="Please input name" type="name" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input  name" />
                        </div>
                        <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                            <label className="text-base font-semibold leading-none text-gray-800">Email Address</label>
                            <input value={formData.email} name="email" onChange={handleChange} arial-label="Please input email address" type="name" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input email address" />
                        </div>
                    </div>
                    <div className="w-ful mt-12">
                        <div className="md:w-72 flex flex-col">
                            <label className="text-base font-semibold leading-none text-gray-800">Last Name</label>
                            <input value={formData.lastName} name="lastName" onChange={handleChange} arial-label="Please input name" type="name" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input  name" />
                        </div>
                    </div>
                    <div className="md:flex items-center mt-8">
                        <div className="md:w-72 flex flex-col">
                            <label className="text-base font-semibold leading-none text-gray-800">Company name</label>
                            <input value={formData.companyName} name="companyName" onChange={handleChange} role="input" type="name" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 " placeholder="Please input company name" />
                        </div>
                        <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                            <label className="text-base font-semibold leading-none text-gray-800">Phone Number</label>
                            <input value={formData.phoneNumber} name="phoneNumber" onChange={handleChange} type="tel" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input country name" />
                        </div>
                    </div>
                    <div>
                        <div className="w-full flex flex-col mt-8">
                            <label className="text-base font-semibold leading-none text-gray-800">Message</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} role="textbox" className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none" defaultValue={""} />
                        </div>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 mt-4">By clicking submit you agree to our terms of service, privacy policy and how we use data as stated</p>
                    <div className="flex items-center justify-center w-full">
                        <button className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none">REQUEST A DEMO</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RequestDemo;
