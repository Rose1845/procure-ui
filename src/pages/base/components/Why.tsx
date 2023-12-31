import React from "react";
import { BsArrowDown } from "react-icons/bs";
function Why() {
  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="container">
        <div className="flex flex-col -tracking-normal text-2xl font-bold text-center">
          <span className="text-2xl uppercase text-orange font-medium">
            Why choose us
          </span>
          <div className="text-4xl text-dark font-bold">
            <BsArrowDown />
          </div>
        </div>
        <div className="flex flex-col mb-10 justify-center text-center items-center">
          <div className="flex flex-col mx-auto bg-white">
            <div className="w-full">
              <div className="container flex flex-col items-center gap-16 mx-auto my-16">
                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col items-center gap-3 px-8 py-10 bg-white rounded-3xl shadow-main">
                    <span>
                      <BsArrowDown />
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
                    <BsArrowDown />
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
                      <BsArrowDown />
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
