import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser() {
    try {
      const response = await fetch(
        "http://localhost:5000/account/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.status === 200) {
        // Redirect to the home page upon successful login

        console.log("redirecting");
        navigate("/home");
      } else {
        console.log("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="form">
      <h1>Venue Admin Login</h1>
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="signin-button" onClick={loginUser}>
        Sign In
      </button>
      <br></br>
    </div>
  );
};

export default Login;
