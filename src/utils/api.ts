/* eslint-disable @typescript-eslint/no-explicit-any */
export const API_HOST = "http://localhost:8081";

export const endpoints = {
  login: "/api/v1/auth/login",
  logout: "/api/v1/auth/logout",
  signup: "/api/v1/auth/register",
};

export async function fetchWrapper(
  endpoint: string,
  opts: {
    method: string;
    headers?: { [key: string]: string };
    mode?: string;
    body?: { [key: string]: any } | string;
  }
) {
  opts.headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    ...opts.headers,
  };
  opts.mode = "cors";
  if (opts.body) {
    opts.body = JSON.stringify(opts.body);
  }
  return fetch(`${API_HOST}${endpoint}`, opts as RequestInit);
}
