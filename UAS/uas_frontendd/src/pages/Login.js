import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", form);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role); // ✅ TAMBAHAN INI

      alert(res.data.message);
      window.location.href = "/app";
    } catch (err) {
      alert("Email atau password salah!");
    }
  };

  return React.createElement(
    "div",
    { className: "login-page" },

    React.createElement(
      "div",
      { className: "login-card" },

      React.createElement("h2", null, "Login"),

      React.createElement(
        "form",
        { onSubmit: handleSubmit },

        // EMAIL
        React.createElement(
          "div",
          { className: "input-group" },
          React.createElement("label", null, "Email"),
          React.createElement("input", {
            type: "email",
            name: "email",
            required: true,
            onChange: handleChange,
          })
        ),

        // PASSWORD
        React.createElement(
          "div",
          { className: "input-group" },
          React.createElement("label", null, "Password"),
          React.createElement("input", {
            type: "password",
            name: "password",
            required: true,
            onChange: handleChange,
          })
        ),

        // BUTTON LOGIN
        React.createElement("button", { type: "submit", className: "btn-login" }, "Login")
      ),

      // REGISTER LINK
      React.createElement("p", { className: "register-text" }, "Tidak punya akun? ", React.createElement("a", { href: "/register" }, "Register"))
    )
  );
}

export default Login;
