import React, { useState } from "react";
import axios from "axios";
import bgHospital from "../Image/bg-hospital1.jpg";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/register", form);
      alert(res.data.message);
      window.location.href = "/login";
    } catch (error) {
      console.log(error.response?.data);
      alert("Register gagal!");
    }
  };

  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      },
    },

    /* ===== KIRI : GAMBAR ===== */
    React.createElement("div", {
      style: {
        flex: 1,
        backgroundImage: `url(${bgHospital})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    }),

    /* ===== KANAN : FORM ===== */
    React.createElement(
      "div",
      {
        style: {
          flex: 1,
          padding: "80px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
      },

      React.createElement("h1", { style: { color: "#1a0dab", marginBottom: 10 } }, "Selamat Datang", React.createElement("br"), "Di Klinik"),

      React.createElement("p", { style: { marginBottom: 30, color: "#555" } }, "Silakan isi data dibawah ini"),

      React.createElement(
        "form",
        { onSubmit: handleSubmit },

        /* USERNAME */
        React.createElement("label", { style: labelStyle }, "Username"),
        React.createElement("input", {
          name: "name",
          value: form.name,
          onChange: handleChange,
          style: inputStyle,
        }),

        /* EMAIL */
        React.createElement("label", { style: labelStyle }, "Email"),
        React.createElement("input", {
          type: "email",
          name: "email",
          value: form.email,
          onChange: handleChange,
          style: inputStyle,
        }),

        /* PASSWORD */
        React.createElement("label", { style: labelStyle }, "Password"),
        React.createElement("input", {
          type: "password",
          name: "password",
          value: form.password,
          onChange: handleChange,
          style: inputStyle,
        }),

        React.createElement(
          "button",
          {
            type: "submit",
            style: {
              marginTop: 30,
              padding: "12px",
              width: "100%",
              backgroundColor: "#0b0b6b",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              cursor: "pointer",
            },
          },
          "Daftar"
        )
      )
    )
  );
}
const inputStyle = {
  width: "100%",
  padding: 12,
  marginTop: 6,
  marginBottom: 20,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 14,
  backgroundColor: "#eee",
};

const labelStyle = {
  color: "#6a1b9a",
  fontWeight: "bold",
};
export default Register;
