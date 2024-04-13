import axios from "axios";
import React from "react";

function Footer() {
  const [email, setEmail] = React.useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8081/api/newsletter/subscribe?email=${email}`,
        { email }
        
      );
      console.log(response.data, "dta");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <footer className="bg-gray-800 text-gray-400 dark:bg-indigo-950">
        <div className="container xl:max-w-6xl mx-auto px-4 pt-16 pb-5 lg:pb-16">
          <div className="flex flex-wrap flex-row">
            <div className="flex-shrink max-w-full w-full lg:w-1/3 px-4 mb-7 lg:mb-0">
              <div className="leading-relaxed">
                <h4 className="font-semibold text-xl mb-6 text-gray-300">
                  About Us
                </h4>
                <p className="mb-3">
                  At ProcureSwift, we redefine the procurement experience,
                  making it seamless, efficient, and tailored to your needs. Our
                  innovative solutions streamline the purchasing process,
                  empowering businesses to thrive. Discover the future of
                  procurement with us!
                </p>
                <address className="mb-3">
                  Kisumu, Kisumu EAST, 105,40100, Kenya
                </address>
                <p className="mb-3">+(254) 757764865</p>
                <p className="mb-3">procureswift.com</p>
              </div>
            </div>

            <div className="flex-shrink max-w-full w-full lg:w-1/3 px-4 mb-7 lg:mb-0">
              <div className="leading-relaxed">
                <h4 className="font-semibold text-xl mb-6 text-gray-300">
                  Popular Links
                </h4>
                <div className="flex flex-wrap flex-row -mx-4">
                  <div className="flex-shrink max-w-full w-1/2 px-4">
                    <ul className="space-y-2">
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          About us
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          Contact us
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          Privacy policy
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          Term of use
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          GDPR
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          Career
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-shrink max-w-full w-1/2 px-4">
                    <ul className="space-y-2">
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          Latest post
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          Popular post
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          Blogs
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          Events
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          Fax
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-gray-300" href="#">
                          Category
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink max-w-full w-full lg:w-1/3 px-4 mb-7 lg:mb-0">
              <div className="leading-relaxed">
                <h4 className="font-semibold text-xl mb-6 text-gray-300">
                  Newsletter
                </h4>
                <p className="mb-6">
                  Subscribe to our mailing list to receives daily updates direct
                  to your inbox!
                </p>
                <div className="mx-auto mb-7">
                  <form onSubmit={handleSubmit} id="subscribe" className="relative" action="#">
                    <div className="flex flex-wrap items-stretch w-full relative">
                      <input
                        type="email"
                        className="flex-shrink flex-grow max-w-full leading-5 w-px flex-1 py-2 px-4 ltr:rounded-l rtl:rounded-r text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 relative"
                        name="email"
                        value={email}
                        required
                        placeholder="Enter you email address"
                        aria-label="subcribe newsletter"
                      />
                      <div className="flex -mr-px">
                        <button
                          className="flex items-center py-2 px-4 ltr:-ml-1 ltr:rounded-r rtl:-mr-1 rtl:rounded-l leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-gray-300 hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0"
                          type="submit"
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <ul className="space-x-3">
                  <li className="inline-block">
                    <a
                      target="_blank"
                      className="hover:text-gray-300"
                      rel="noopener noreferrer"
                      href="https://facebook.com/"
                      title="Facebook"
                    >
                      <i className="fab fa-facebook fa-2x"></i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      target="_blank"
                      className="hover:text-gray-300"
                      rel="noopener noreferrer"
                      href="https://twitter.com/"
                      title="Twitter"
                    >
                      <i className="fab fa-twitter fa-2x"></i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      target="_blank"
                      className="hover:text-gray-300"
                      rel="noopener noreferrer"
                      href="https://youtube.com/"
                      title="Youtube"
                    >
                      <i className="fab fa-youtube fa-2x"></i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M508.64,148.79c0-45-33.1-81.2-74-81.2C379.24,65,322.74,64,265,64H247c-57.6,0-114.2,1-169.6,3.6-40.8,0-73.9,36.4-73.9,81.4C1,184.59-.06,220.19,0,255.79q-.15,53.4,3.4,106.9c0,45,33.1,81.5,73.9,81.5,58.2,2.7,117.9,3.9,178.6,3.8q91.2.3,178.6-3.8c40.9,0,74-36.5,74-81.5,2.4-35.7,3.5-71.3,3.4-107Q512.24,202.29,508.64,148.79ZM207,353.89V157.39l145,98.2Z"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      target="_blank"
                      className="hover:text-gray-300"
                      rel="noopener noreferrer"
                      href="https://vk.com/"
                      title="VKontakte"
                    >
                      <i className="fab fa-vk fa-2x"></i>
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      target="_blank"
                      className="hover:text-gray-300"
                      rel="noopener noreferrer"
                      href="https://linkedin.com/"
                      title="Linkedin"
                    >
                      <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      target="_blank"
                      className="hover:text-gray-300"
                      rel="noopener noreferrer"
                      href="https://instagram.com/"
                      title="Instagram"
                    >
                      <i className="fab fa-instagram fa-2x"></i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M349.33,69.33a93.62,93.62,0,0,1,93.34,93.34V349.33a93.62,93.62,0,0,1-93.34,93.34H162.67a93.62,93.62,0,0,1-93.34-93.34V162.67a93.62,93.62,0,0,1,93.34-93.34H349.33m0-37.33H162.67C90.8,32,32,90.8,32,162.67V349.33C32,421.2,90.8,480,162.67,480H349.33C421.2,480,480,421.2,480,349.33V162.67C480,90.8,421.2,32,349.33,32Z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M377.33,162.67a28,28,0,1,1,28-28A27.94,27.94,0,0,1,377.33,162.67Z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M256,181.33A74.67,74.67,0,1,1,181.33,256,74.75,74.75,0,0,1,256,181.33M256,144A112,112,0,1,0,368,256,112,112,0,0,0,256,144Z"
                        ></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container xl:max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap lg:flex-row -mx-4 py-9">
            <div className="w-full text-center">
              <p>
                ProcureSwift {new Date().getFullYear()} | All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
