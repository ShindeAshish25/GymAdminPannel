import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/loginP.jpg";
import { IconButton } from "@mui/material";
import { Home } from "@mui/icons-material";
import logo from "../assets/Logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // For navigation

  const handleSubmit = (e) => {
    if (username == "" && password == "") {
      alert("Please enter username and password");
      e.preventDefault();
      return;
    }

    if (username === "admin" && password === "admin") {
      navigate("/customer"); // Navigate to the "/customer" page
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Incorrect username or password");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="l-form">
      <div className="shape1"></div>
      <div className="shape2"></div>

      <div className="form">
        <img src={loginImg} alt="image" className="form-img" />

        <div className="log">
          <img
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              navigate("/"); // Navigate programmatically
            }}
            src={logo}
            alt="image"
            className="form-img"
          />
          <h1>One on One Fitness</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-cont">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className={username ? "active" : ""}>Username</label>
              <div className="border1"></div>
            </div>
            <div className="input-cont">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className={password ? "active" : ""}>Password</label>
              <div className="border2"></div>
            </div>

            <input type="submit" value="Login" />
          </form>
          <p className="p-3 text-center error">Only for Admin Use</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
