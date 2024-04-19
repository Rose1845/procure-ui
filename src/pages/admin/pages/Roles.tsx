import React from "react";
import { Role } from "../types";
import { Link } from "react-router-dom";
import useApi from "@/hooks/useApi";

function Roles() {
    const { axiosApi } = useApi()

    const [roles, setRoles] = React.useState<Role[]>([]);
    React.useEffect(() => {
        fetchRoles()
            .then((data) => setRoles(data))
            .catch((error) => console.error("Error fetching Roles:", error));
    }, []);
    const fetchRoles = async () => {
        const response = await axiosApi.get("/roles");
        const category = await response.data;
        console.log(category, "Roles");

        return category;
    };
    return (
        <div className="max-w-7xl mx-auto pt-16 flex-row gap-8">
            <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white">
                    <Link to={"/dashboard/roles/add_role"}> Add Role</Link>
                </button>
            </div>
            <div className="mt-4 mx-4">
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400">
                                    <th className="px-4 py-3"> Name</th>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3">IsDefault</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y dark:divide-gray-500">
                                {roles.map((role, i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-3">
                                            <div className="flex Roles-center text-sm">
                                                <div>
                                                    <p className="font-semibold">{role.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{role.description}</td>

                                        <td className="px-4 py-3 text-sm">{role.isDefault}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Roles;
