import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Role, User } from "@/pages/admin/types";

export type TUser = {
  token: string;
  user: User;
};

export const useAuth = () => useContext(AuthContext);

export const getUserData = () => {
  if (typeof Storage === "undefined") {
    console.error("Storage is not supported by this browser.");
    return null;
  }
  const userData = localStorage.getItem("user");

  try {
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    return null;
  }
};

export const setUserData = (user: Partial<TUser>) => {
  if (
    !user ||
    typeof user !== "object" ||
    Array.isArray(user) ||
    Object.keys(user).length === 0
  ) {
    throw new Error("No valid user data provided");
  }

  try {
    const userDataString = JSON.stringify(user);
    if (typeof Storage !== "undefined") {
      localStorage.setItem("user", userDataString);
    } else {
      throw new Error("LocalStorage is not supported");
    }
  } catch (error) {
    console.error("Error setting user data:", error);
    throw new Error("Failed to serialize or store user data");
  }
};

export const clearUserData = () => {
  if (typeof Storage === "undefined") return;
  localStorage.removeItem("user");
  localStorage.removeItem("token")
};

export const getAccessToken = () => {
  const user = getUserData();
  return user?.token;
};

export const isAuthenticated = () => {
  const user = getUserData();
  if (!user || !user.token) {
    return { authenticated: false, role: null };
  }
  
  // Optionally, validate the token's expiration here
  const payload = getPayloadFromToken(user.token);
  console.log(payload, "payload");
  const roles = user.user.roles.map((role: Role) => role.name); // Assuming roles is an array of {name: string}
  return { authenticated: true, roles };
};

export const getPayloadFromToken = (token: string) => {
  if (!token) {
    return {};
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
};
