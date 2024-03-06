import React from "react";
import { BsBoxArrowUpLeft } from "react-icons/bs";

function Hero() {
  return (
    // <div classNameName="max-w-7xl mx-auto">
    //   <div classNameName="container flex flex-col mx-auto bg-white">
    //     <div classNameName="grid w-full grid-cols-1 my-auto mt-12 mb-8 md:grid-cols-2 xl:gap-14 md:gap-5">
    //       <div classNameName="flex flex-col justify-center col-span-1 text-center lg:text-start">
    //         <div classNameName="flex items-center justify-center mb-4 lg:justify-normal">
    //           <h4 classNameName="ml-2 text-sm font-bold tracking-widest text-primary uppercase">
    //             Empowering Your Procurement Journey
    //           </h4>
    //         </div>
    //         <h1 classNameName="mb-8 text-3xl font-extrabold leading-tight lg:text-4xl text-dark-grey-900">
    //           Welcome to ProcureSwift
    //         </h1>
    //         <p classNameName="mb-6 text-base font-normal leading-7 lg:w-3/4 text-grey-900">
    //           At ProcureSwift, we redefine the procurement experience, making it
    //           seamless, efficient, and tailored to your needs. Our innovative
    //           solutions streamline the purchasing process, empowering businesses
    //           to thrive. Discover the future of procurement with us!
    //         </p>

    //         <div classNameName="flex w-40 flex-col items-center gap-4 lg:flex-row">
    //           <div>
    //             <button classNameName="flex items-center py-3 text-sm font-bold text-white px-7 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-100 transition duration-300 rounded-full">
    //               Request A Demo{" "}
    //             </button>
    //           </div>
    //         </div>
    //         <div classNameName="flex flex-row space-x-5">
    //           <div classNameName="bg-gray-300 rounded-full mt-2 ml-6 p-1">
    //             <p classNameName="text-sm font-bold">No payment required</p>
    //           </div>
    //           <div classNameName="mb-3">
    //             <BsBoxArrowUpLeft classNameName="font-bold" />
    //           </div>
    //         </div>
    //         <div classNameName="flex space-x-5 mt-3">
    //           <div classNameName="flex -space-x-4 rtl:space-x-reverse">
    //             <img
    //               classNameName="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
    //               src="https://img.freepik.com/free-photo/four-best-friends-young-adrican-women-having-fun-spend-time-together_627829-839.jpg?size=626&ext=jpg&ga=GA1.1.594574614.1701804463&semt=sph"
    //               alt=""
    //             />
    //             <img
    //               classNameName="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
    //               src="https://img.freepik.com/free-photo/portrait-black-young-man-wearing-african-traditional-red-colorful-clothes_627829-4909.jpg?size=626&ext=jpg&ga=GA1.2.594574614.1701804463&semt=sph"
    //               alt=""
    //             />
    //             <img
    //               classNameName="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
    //               src="https://img.freepik.com/free-photo/young-afro-girl-wearing-glasses-looking-happy-texting-with-frien_574295-6163.jpg?size=626&ext=jpg&ga=GA1.2.594574614.1701804463&semt=sph"
    //               alt=""
    //             />
    //             <a
    //               classNameName="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
    //               href="#"
    //             >
    //               +99
    //             </a>
    //           </div>
    //           <div>
    //             <p>Over 10K customers</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div classNameName="items-center justify-end hidden col-span-1 md:flex">
    //         <img
    //           classNameName="w-4/5 rounded-md"
    //           src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvY3VyZW1lbnQlMjBtYW5hZ2VtZW50JTIwc3lzdGVtfGVufDB8fDB8fHww"
    //           alt=""
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-100 to-gray-100 dark:from-indigo-900 dark:to-gray-900">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex justify-center">
            <a
              className="inline-flex mx-auto items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 rounded-full px-4 py-1 mb-4"
              href="#"
            >
              ProcureSwift
              <span
                className="inline-block leading-none text-center py-1 px-2 bg-gradient-to-tr from-indigo-700 to-indigo-500 text-gray-100 font-bold rounded"
                style={{ fontSize: ".75em" }}
              >
                New
              </span>
            </a>
          </div>

          <div className="mb-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-5xl lg:text-6xl dark:text-gray-200">
              Your number one stop for your 
              <span className="bg-clip-text bg-gradient-to-r from-indigo-700 to-pink-600 text-transparent">
                 Procurement process
              </span>
            </h1>
          </div>

          <div className="mb-8 max-w-3xl text-center mx-auto">
            <p className="text-lg text-white leading-normal">
              We redefine the procurement experience, making it seamless,
              efficient, and tailored to your needs.
            </p>
          </div>

          <div className="max-w-80 mx-auto flex flex-row gap-3 justify-center items-center">
            <a
              href="/login"
              className="py-2.5 px-5 inline-flex items-center justify-center gap-2 mb-3 rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-link-45deg"
                viewBox="0 0 16 16"
              >
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
              </svg>
              Login
            </a>
          </div>
          {/* <img src="src/img/demo/tailwind-dashboard.png" alt="tailwind dashboard" className="max-w-full mx-auto mt-2"/> */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
