
function Hero() {
  return (
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
              href="#"
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
              REQUEST DEMO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
