import axios from "../api/index";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response: AxiosResponse<{ accessToken: string }> = await axios.get(
        "/refresh",
        {
          withCredentials: true,
        }
      );

      setAuth((prev: any) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return { ...prev, accessToken: response.data.accessToken };
      });

      return response.data.accessToken;
    } catch (error) {
      // Handle error as needed
      console.error("Refresh token failed:", error);
      throw error;
    }
  };

  // Call refresh on mount (optional)
  useEffect(() => {
    refresh();
  }, []);

  return refresh;
};

export default useRefreshToken;
