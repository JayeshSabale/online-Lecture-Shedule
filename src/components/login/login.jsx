import React, { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === "instructor") {
      navigate(`/instructor?username=${username}`);
    } else if (userData === "admin") {
      navigate("/admin");
    }
  }, [userData, navigate]);

  function handleSubmit(event) {
    event.preventDefault();     

    axios
      .post("https://online-lecture-sheduler.onrender.com/api/login", {
        username,
        password,
      })
      .then((res) => {
        setUserData(res.data.data.role);
      })
      .catch((err) => console.log(err));
  }

  console.log(userData);

  return (
    <div className="login-page">
      <div className="form">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="title-container">
            <label className="title">Lecture</label>
          </div>
          <div className="subtitle-container">
            <label className="title">Scheduler</label>
          </div>
          <p className="message">Sign into your account</p>
          <input
            className="textbox"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="textbox"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" className="loginBtn" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;