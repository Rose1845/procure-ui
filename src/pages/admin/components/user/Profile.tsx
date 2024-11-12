import React from "react";
import { User } from "../../types";
import { Link, useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";

const Profile = () => {
  const { axiosApi } = useApi();

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
      <div className="flex justify-end">
        <button className="px-4 text-white py-2 bg-blue-800">
          <Link to={"/dashboard/add/new_user"}>Add new User</Link>
        </button>
      </div>
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2">
          <div className="bg-white p-3 border-t-4 border-green-400">
            <div className="image overflow-hidden">
              <img
                className="h-auto w-full mx-auto"
                src={user?.avatar}
                alt={user?.firstname}
              />
            </div>
            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
              {user?.firstname} {user?.lastname}
            </h1>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    Active
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-9/12 mx-2 h-64">
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="text-green-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
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
                  <div className="px-4 py-2 font-semibold">Email.</div>
                  <div className="px-4 py-2">
                    <a className="text-blue-800" href="mailto:jane@example.com">
                      {user?.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-4"></div>

          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="grid grid-cols-2">
              <div>
                <ul className="list-inside space-y-2">
                  <li>
                    <div className="text-teal-600 flex flex-row">
                      COMPANY::{" "}
                      {user?.authorities.map((auht) => (
                        <div key={auht.authority}>
                          {" "}
                          <span className="flex flex-col text-xl">
                            {auht.authority}
                          </span>
                        </div>
                      ))}
                      .
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
