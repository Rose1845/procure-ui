import React from "react";

function Hero() {
  return (
    <div className="container flex flex-col mx-auto bg-white">
      <div className="grid w-full grid-cols-1 my-auto mt-12 mb-8 md:grid-cols-2 xl:gap-14 md:gap-5">
        <div className="flex flex-col justify-center col-span-1 text-center lg:text-start">
          <div className="flex items-center justify-center mb-4 lg:justify-normal">
            <h4 className="ml-2 text-sm font-bold tracking-widest text-primary uppercase">
              Empowering Your Procurement Journey
            </h4>
          </div>
          <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl text-dark-grey-900">
            Welcome to ProcureSwift
          </h1>
          <p className="mb-6 text-base font-normal leading-7 lg:w-3/4 text-grey-900">
            At ProcureSwift, we redefine the procurement experience, making it
            seamless, efficient, and tailored to your needs. Our innovative
            solutions streamline the purchasing process, empowering businesses
            to thrive. Discover the future of procurement with us!
          </p>
          <div className="flex -space-x-4 rtl:space-x-reverse">
            <img
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="/docs/images/people/profile-picture-5.jpg"
              alt=""
            />
            <img
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="/docs/images/people/profile-picture-2.jpg"
              alt=""
            />
            <img
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="/docs/images/people/profile-picture-3.jpg"
              alt=""
            />
            <a
              className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
              href="#"
            >
              +99
            </a>
          </div>
          <div className="flex w-40 flex-col items-center gap-4 lg:flex-row">
            <button className="flex items-center py-4 text-sm font-bold text-white px-7 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 transition duration-300 rounded-full">
              Get started
            </button>
          </div>
        </div>
        <div className="items-center justify-end hidden col-span-1 md:flex">
          <img
            className="w-4/5 rounded-md"
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvY3VyZW1lbnQlMjBtYW5hZ2VtZW50JTIwc3lzdGVtfGVufDB8fDB8fHww"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
