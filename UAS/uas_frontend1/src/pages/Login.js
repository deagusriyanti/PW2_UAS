import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [notif, setNotif] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (notif) setNotif("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", form);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      setNotif("Login berhasil");

      setTimeout(() => {
        navigate("/app");
      }, 500);

    } catch (err) {
      setNotif("Email atau password salah");

      setTimeout(() => {
        setNotif("");
      }, 500);
    }
  };

  return (
    <div className="login-page">
      {notif && (
        <div className="notif-overlay">
          <div className="notif-box">{notif}</div>
        </div>
      )}

      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              value={form.email}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={form.password}
            />
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>

        <p className="register-text">
          Tidak punya akun? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
