import React from 'react'

function Faq() {
  return (
    <div className="bg-white flex flex-col justify-center max-w-7xl mx-auto p-6">
      <h1 className="text-center leading-6 text-3xl font-bold">FAQS</h1>
      <div className="mb-4">
        <div className="flex items-center justify-between pl-3 pr-2 py-3 w-full rounded text-gray-600 font-bold cursor-pointer">
          What is ProcureSwift and how does it work
          <span className="h-6 w-6 flex items-center justify-center text-teal-500">
            <svg
              className="w-3 h-3 fill-current"
              viewBox="0 -192 469.33333 469"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0" />
            </svg>
          </span>
        </div>
        <div className="p-3">
          <p className="text-gray-600 mb-3">
            ProcureSwift is a comprehensive procurement solution designed to
            streamline the purchasing process for businesses. It facilitates the
            entire procurement lifecycle, from requisition to delivery, through
            a user-friendly platform.
          </p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between pl-3 pr-2 py-3 w-full rounded text-gray-600 font-bold cursor-pointer">
          Is ProcureSwift suitable for small businesses?
          <span className="h-6 w-6 flex items-center justify-center text-teal-500">
            <svg
              className="w-3 h-3 fill-current"
              viewBox="0 0 469.33333 469.33333"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0" />
            </svg>
          </span>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between pl-3 pr-2 py-3 w-full rounded text-gray-600 font-bold cursor-pointer">
          What are the key features of ProcureSwift
          <span className="h-6 w-6 flex items-center justify-center text-teal-500">
            <svg
              className="w-3 h-3 fill-current"
              viewBox="0 0 469.33333 469.33333"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Faq