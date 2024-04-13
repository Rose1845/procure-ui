import { FaFileContract, FaFileInvoice } from "react-icons/fa6";
import { GrResources } from "react-icons/gr";
import { MdOutlineMarkunreadMailbox } from "react-icons/md";
import { TbCoins } from "react-icons/tb";

function Purchasing() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col gap-5">
      <div className="flex flex-col md:flex-row py-16">
        <div className="flex flex-col space-y-3 justify-center items-center">
          <h1 className="font-black text-center text-3xl ">OPERATIONAL PURCHASING TOOLS</h1>
          <p className="text-center ">With a simple, intuitive user interface, it’s never been easier to operate the procurement process within your team. Collaborate between all company departments, as well as external suppliers on one cloud procurement software.</p>
        </div>
        <div className="mx-auto px-6 max-w-6xl text-gray-500">
          <div className="relative">
            <div className="relative z-10 grid gap-3 grid-cols-6">
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <FaFileContract color="blue" size={40} />
                  </div>
                  <div className="mt-6 text-center font-semibold text-gray-950  text-3xl">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Contracts
                    </h2>
                    <p className="text-gray-700">
                      Store and manage your supplier contracts
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <MdOutlineMarkunreadMailbox color="blue" size={40} />
                  </div>
                  <div className="mt-6 text-center relative z-10 space-y-2">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Purchase Order
                    </h2>
                    <p className=" text-gray-700">
                      Customize your purchase orders to improve effciency
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <GrResources color="blue" size={40} />
                  </div>
                  <div className="mt-6 text-center relative z-10 space-y-2">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Sourcing
                    </h2>
                    <p className=" text-gray-700">
                      Use RFQs to improve supplier negotiation
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <GrResources color="blue" size={40} />
                  </div>
                  <div className="mt-14 text-center relative z-10 space-y-2">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Sourcing
                    </h2>
                    <p className=" text-gray-700">
                      Use RFQs to improve supplier negotiation
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <TbCoins color="blue" size={40} />
                  </div>
                  <div className="mt-14 text-center relative z-10 space-y-2">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Requisitions{" "}
                    </h2>
                    <p className=" text-gray-700">
                      Get employees to submit a simple internal form for
                      purchasing
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <FaFileInvoice color="blue" size={40} />
                  </div>
                  <div className="mt-14 text-center relative z-10 space-y-2">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Invoice{" "}
                    </h2>
                    <p className=" text-gray-700">
                      Reconsile your received invoices to your purchase orders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row py-16">
        <div className="flex flex-col space-y-3 justify-center items-center">
          <h1 className="font-black text-center text-3xl "> ADMINISTRATIVE TOOLS</h1>
          <p className="text-center ">With a simple, intuitive user interface, it’s never been easier to operate the procurement process within your team. Collaborate between all company departments, as well as external suppliers on one cloud procurement software.</p>
        </div>
        <div className="mx-auto px-6 max-w-6xl text-gray-500">
          <div className="relative">
            <div className="relative z-10 grid gap-3 grid-cols-6">
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <FaFileContract color="blue" size={40} />
                  </div>
                  <div className="mt-6 text-center font-semibold text-gray-950  text-3xl">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Contracts
                    </h2>
                    <p className="text-gray-700">
                      Store and manage your supplier contracts
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <MdOutlineMarkunreadMailbox color="blue" size={40} />
                  </div>
                  <div className="mt-6 text-center relative z-10 space-y-2">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Purchase Order
                    </h2>
                    <p className=" text-gray-700">
                      Customize your purchase orders to improve effciency
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <GrResources color="blue" size={40} />
                  </div>
                  <div className="mt-6 text-center relative z-10 space-y-2">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Sourcing
                    </h2>
                    <p className=" text-gray-700">
                      Use RFQs to improve supplier negotiation
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <GrResources color="blue" size={40} />
                  </div>
                  <div className="mt-14 text-center relative z-10 space-y-2">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Sourcing
                    </h2>
                    <p className=" text-gray-700">
                      Use RFQs to improve supplier negotiation
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <TbCoins color="blue" size={40} />
                  </div>
                  <div className="mt-14 text-center relative z-10 space-y-2">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Requisitions{" "}
                    </h2>
                    <p className=" text-gray-700">
                      Get employees to submit a simple internal form for
                      purchasing
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200  ">
                <div>
                  <div className="relative aspect-square rounded-full size-32 flex border mx-auto   before:absolute before:-inset-2 before:border  dark:before:bg-white/5 before:rounded-full">
                    <FaFileInvoice color="blue" size={40} />
                  </div>
                  <div className="mt-14 text-center relative z-10 space-y-2">
                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 ">
                      Invoice{" "}
                    </h2>
                    <p className=" text-gray-700">
                      Reconsile your received invoices to your purchase orders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Purchasing;
