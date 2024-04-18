
// function Hero() {
//   return (
//     <div>
//       <div className="relative overflow-hidden bg-gradient-to-b from-indigo-100 to-gray-100 dark:from-indigo-900 dark:to-gray-900">
//         <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="flex justify-center">
//             <a
//               className="inline-flex mx-auto items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 rounded-full px-4 py-1 mb-4"
//               href="#"
//             >
//               ProcureSwift
//               <span
//                 className="inline-block leading-none text-center py-1 px-2 bg-gradient-to-tr from-indigo-700 to-indigo-500 text-gray-100 font-bold rounded"
//                 style={{ fontSize: ".75em" }}
//               >
//                 New
//               </span>
//             </a>
//           </div>
//           <div className="mb-5 max-w-2xl text-center mx-auto">
//             <h1 className="block font-bold text-gray-800 text-5xl lg:text-6xl dark:text-gray-200">
//               Your number one stop for your
//               <span className="bg-clip-text bg-gradient-to-r from-indigo-700 to-pink-600 text-transparent">
//                 Procurement process
//               </span>
//             </h1>
//           </div>

//           <div className="mb-8 max-w-3xl text-center mx-auto">
//             <p className="text-lg text-white leading-normal">
//               We redefine the procurement experience, making it seamless,
//               efficient, and tailored to your needs.
//             </p>
//           </div>

//           <div className="max-w-80 mx-auto flex flex-row gap-3 justify-center items-center">
//             <a
//               href="#"
//               className="py-2.5 px-5 inline-flex items-center justify-center gap-2 mb-3 rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="currentColor"
//                 className="bi bi-link-45deg"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
//                 <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
//               </svg>
//               REQUEST DEMO
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;


import React from "react";
import { Link } from "react-router-dom";
function Hero() {
  // const [show, setShow] = React.useState(false);
  return (
    <div className="bg-gray-100 pb-12 overflow-y-hidden" style={{ minHeight: 700 }}>
        {/* <nav className="w-full border-b">
          <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
            <div aria-label="Home. logo" role="img">
              <img className="w-12 h-12" src="/android-chrome-512x512.png"
                alt="logo" />
            </div>
            <div>
              <button onClick={() => setShow(!show)} className={`${show ? 'hidden' : ''} sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500`}>
                <svg aria-haspopup="true" aria-label="open Main Menu" xmlns="http://www.w3.org/2000/svg" className="md:hidden icon icon-tabler icon-tabler-menu" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={4} y1={8} x2={20} y2={8} />
                  <line x1={4} y1={16} x2={20} y2={16} />
                </svg>
              </button>
              <div id="menu" className={` ${show ? '' : 'hidden'} md:block lg:block `}>
                <button onClick={() => setShow(!show)} className={`block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 mt-6`}>
                  <svg aria-label="close main menu" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </button>
                <ul className="flex text-3xl md:text-base items-center py-10 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent z-20">
                  <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0">
                    <a href="javascript: void(0)">Feature</a>
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                    <a href="javascript: void(0)">FAQS</a>
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                    <a href="javascript: void(0)">How It Works</a>
                  </li>

                  <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm">
              <Link to={"/login"}>
                Sign In
              </Link>
            </button>
          </div>
        </nav> */}
        <div className="bg-gray-100">
          <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
                Your Number One Stop for your
                <span className="text-indigo-700"> Procurement</span>
                {""}
                Solutions              </h1>
              <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg"> We redefine the procurement experience, making it seamless,
                efficient, and tailored to your needs.</p>
            </div>
            <div className="flex justify-center items-center">

              <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">
                <Link to={"/request-demo"}>
                  REQUEST A Demo
                </Link>
              </button>
            </div>
          </div>
        </div>
      {/* Code block ends */}
    </div>

  );
}

export default Hero;
