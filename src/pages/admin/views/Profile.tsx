import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosApi } from "../../../api";
import { User } from "../types";

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = React.useState<User>();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosApi.get(`/users/user/${id}/profile`);
                const profileData = response.data;
                console.log(profileData, "categpry data");
                setProfile(profileData);
                console.log("Category retrived successfully");
            } catch (error) {
                console.error("Error updating category:", error);
            }
        };
        fetchProfile();
    }, [id]);

    return (
        <div className="container flex justify-center profiles-center mx-auto mt-8 py-16">
            {profile?.firstname}
            {"/"}
            {profile?.lastname}
            {profile?.email}
            {/* {profile?.roles.map(role=>(<div>{role.name}</div>))} */}
        </div>
    );
};

export default Profile;
