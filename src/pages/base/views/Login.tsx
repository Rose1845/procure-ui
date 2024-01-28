// import { useState } from "react";
// import { useAuth } from "../../../utils/auth";
// import { endpoints, fetchWrapper } from "../../../utils/api";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { onLogin } = useAuth();

//   const handleLogin = async (e: any) => {
//     e.preventDefault();
//     const response = await fetchWrapper(endpoints.login, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: {
//         email,
//         password,
//       },
//     });
//     if (response.ok) {
//       const userData = await response.json();
//       onLogin(userData);
//       console.log("data",userData);

//     } else {

//       console.error("Username or Password is incorrect");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <h3>Login Form</h3>
//         <br />
//         <input
//           type="email"
//           placeholder="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { publicApi } from "../../../api/index";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await publicApi.post("/auth/authenticate", credentials);
      const { access_token, refresh_token } = response.data;

      // Store the tokens in localStorage or secure cookie for later use
      localStorage.setItem("token", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      navigate("/dashboard");
      // Redirect or perform other actions upon successful login
    } catch (error) {
      console.log(error);

      // Handle login error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="procure@gmail.com"
        value={credentials.email}
        className="mt-1 p-2 border rounded-md w-full"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        className="mt-1 p-2 border rounded-md w-full"
        value={credentials.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
