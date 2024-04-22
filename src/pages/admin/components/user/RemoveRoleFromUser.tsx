import useApi from "@/hooks/useApi";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Role } from "../../types";

function RemoveRoleFromUser() {
  const { axiosApi } = useApi();
  const { id } = useParams();
  const [selectedRoles, setSelectedRoles] = useState<Set<number>>(
    new Set<number>()
  );
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axiosApi.get("/roles");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleRoleChange = (roleId: number, isChecked: boolean) => {
    setSelectedRoles((prevSelectedRoles) => {
      const updatedRoles = new Set(prevSelectedRoles);
      if (isChecked) {
        updatedRoles.add(roleId);
      } else {
        updatedRoles.delete(roleId);
      }
      return updatedRoles;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosApi.patch(
        `/users/${id}/update/remove-role`,
        Array.from(selectedRoles) // Convert Set to array for sending in the request body
      );
      if (response.status === 200) {
        toast.success("Roles removed successfully!");
      } else {
        toast.error("An error occurred!");
      }
    } catch (error) {
      console.error("Error removing roles:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
          REMOVE ROLES FROM USER
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col mb-6">
              {roles.map((role) => (
                <div key={role.id}>
                  <input
                    type="checkbox"
                    id={`role-${role.id}`}
                    name={`role-${role.id}`}
                    value={role.id}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    checked={selectedRoles.has(role.id)}
                    onChange={(e) =>
                      handleRoleChange(role.id, e.target.checked)
                    }
                  />
                  <label
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                    htmlFor={`role-${role.id}`}
                  >
                    {role.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-red-600 hover:bg-red-700 rounded py-2 w-full transition duration-150 ease-in ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Loading..." : "Remove Roles"}
                {!loading && (
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M20 12H4" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RemoveRoleFromUser;
