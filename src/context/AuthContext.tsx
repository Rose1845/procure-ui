import { createContext } from "react";
import { TUser } from "@/utils/auth"; // Ensure the path matches your project structure

export interface IAuthContext {
  user: TUser | null;
  onLogin: (userData: Partial<TUser>) => void;
  onLogout: () => void;
}

// Providing a default context value matching the IAuthContext interface
export const AuthContext = createContext<IAuthContext>({
  user: null, // Default to null since no user is logged in initially
  onLogin: () => { }, // Placeholder function
  onLogout: () => { }, // Placeholder function
});
