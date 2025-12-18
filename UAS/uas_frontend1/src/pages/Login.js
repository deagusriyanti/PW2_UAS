import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [notif, setNotif] = useState(""); // NOTIF STATE

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Hapus notif otomatis saat user mulai mengetik
    if (notif) setNotif("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", form);

      // Simpan user & role di localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      // TAMPILKAN NOTIF SUKSES
      setNotif("Login berhasil");

      // Redirect ke /app setelah delay
      setTimeout(() => {
        navigate("/app");
      }, 500);

    } catch (err) {
      // TAMPILKAN NOTIF ERROR
      setNotif("Email atau password salah");

      // HILANGKAN NOTIF OTOMATIS
      setTimeout(() => {
        setNotif("");
      }, 500);
    }
  };

  // Redirect otomatis jika user sudah login sebelumnya
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      navigate("/app");
    }
  }, [navigate]);

  return (
    <div className="login-page">
      {/* NOTIF */}
      {notif && (
        <div className="notif-overlay">
          <div className="notif-box">
            {notif}
          </div>
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
