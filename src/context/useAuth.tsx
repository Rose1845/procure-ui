/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { User } from "@/pages/admin/types";
import { loginAPI, registerAPI } from "@/services/auth.service";

type UserContextType = {
    user: User | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string, phoneNumber:string, lastname:string, firstname:string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (
        email: string,
        username: string,
        password: string,
        phoneNumber: string, 
        lastname: string,
        firstname: string
    ) => {
        await registerAPI(email, username, password,phoneNumber,lastname,firstname)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.auth.token);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    setToken(res?.data.auth.token);
                    setUser(res.data.user);
                    toast.success("Registration Success!");
                    navigate("/login");
                }
            })
            .catch((_e) => toast.warning("Server error occured"));
    };

    const loginUser = async (username: string, password: string) => {
        await loginAPI(username, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    setToken(res?.data.token);
                    setUser(res.data.user);
                    toast.success("Login Success!");
                    navigate("/dashbaord");
                }
            })
            .catch((_e) => toast.warning("Server error occured"));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);
