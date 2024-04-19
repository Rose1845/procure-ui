import React from 'react'
import { User } from '../../types';
import { useParams } from 'react-router-dom';
import useApi from '@/hooks/useApi';

const Profile = () => {
  const { axiosApi } = useApi()

  const { id } = useParams();
  const [user, setUser] = React.useState<User>();
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosApi.get(`/users/user/${id}/profile`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching Contract:", error);
      }
    };
    fetchUser();
  }, [id]);
  return (
    <div className="container mx-auto mr-11  my-5 pt-11">
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2">
          <div className="bg-white p-3 border-t-4 border-green-400">
            <div className="image overflow-hidden">
              <img className="h-auto w-full mx-auto"
                src={user?.avatar}
                alt="" />
            </div>
            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user?.firstname} {user?.lastname}</h1>
            <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
              Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
            <ul
              className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Status</span>
                <span className="ml-auto"><span
                  className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
              </li>
              <li className="flex items-center py-3">
                <span>Company Name</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-9/12 mx-2 h-64">
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="text-green-500">
                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">First Name</div>
                  <div className="px-4 py-2">{user?.firstname}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Last Name</div>
                  <div className="px-4 py-2">{user?.lastname}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Username</div>
                  <div className="px-4 py-2">{user?.username}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Contact No.</div>
                  <div className="px-4 py-2">{user?.phoneNumber}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Current Address</div>
                  <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Permanant Address</div>
                  <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email.</div>
                  <div className="px-4 py-2">
                    <a className="text-blue-800" href="mailto:jane@example.com">{user?.email}</a>
                  </div>
                </div>

              </div>
            </div>
            <button
              className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
              Full Information</button>
          </div>

          <div className="my-4"></div>

          <div className="bg-white p-3 shadow-sm rounded-sm">

            <div className="grid grid-cols-2">
              <div>
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span className="text-green-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <span className="tracking-wide">Organization</span>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                  </li>
                  <li>
                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                  </li>
                  <li>
                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                  </li>
                  <li>
                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default Profile