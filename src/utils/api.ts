export const API_HOST = "http://localhost:8081";

export const endpoints = {
  login: "/api/v1/auth/authenticate",
  logout: "/api/auth/logout",
  signup: "/api/v1/auth/register",
  token: "/api/v1/auth/token",
  user: "/api/users/me",
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
