import { FaSatellite, FaUserFriends } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";

function Why() {
  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="container">
        <div className="flex flex-row space-x-3 justify-center items-center -tracking-normal text-2xl font-bold text-center">
          <header className="text-center mx-auto mb-3">
            <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300">
              <span className="font-extrabold text-neutral-950">Why Choose</span> Us
            </h2>
            <hr className="block w-12 h-0.5 mx-auto my-5 bg-indigo-500 border-indigo-500" />
          </header>
        </div>
        
        <div className="flex flex-col mb-10 justify-center text-center items-center">
          <div className="flex flex-col mx-auto bg-white">
            <div className="w-full">
              <div className="container flex flex-col items-center gap-16 mx-auto my-16">
                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-main">
                    <span>
                      <FaUserFriends className="text-blue-500 text-3xl" />
                    </span>
                    <p className="text-2xl font-extrabold text-dark-grey-900">
                      User-Friendly Interface
                    </p>
                    <p className="text-base leading-7 text-dark-grey-600">
                      Our intuitive interface ensures that users can quickly
                      adapt to the system with minimal training.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-main">
                    <FaSatellite className="text-blue-500 text-3xl" />
                    <p className="text-2xl font-extrabold text-dark-grey-900">
                      Scalability
                    </p>
                    <p className="text-base leading-7 text-dark-grey-600">
                      Whether you're a small startup or a large enterprise, our
                      EDMS scales with your business needs.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-main">
                    <span>
                      <MdOutlineSecurity className="text-blue-500 text-3xl" />
                    </span>
                    <p className="text-2xl font-extrabold text-dark-grey-900">
                      Compliance
                    </p>
                    <p className="text-base leading-7 text-dark-grey-600">
                      Stay compliant with regulatory requirements, ensuring data
                      integrity and privacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Why;
