import {  publicApi } from "@/api";
import { LoginResponse, RegistrationResponse } from "@/pages/admin/types";
import { handleError } from "@/utils/ErrorHandler";


export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await publicApi.post<LoginResponse>("/auth/login", {
      username: username,
      password: password,
    });
    console.log(data.data.token,"token");
    
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string,
  phoneNumber: string,
  lastname: string,
  firstname: string
) => {
  try {
    const data = await publicApi.post<RegistrationResponse>("/auth/register", {
      email: email,
      username: username,
      password: password,
      phoneNumber: phoneNumber,
      lastname: lastname,
      firstname: firstname,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
