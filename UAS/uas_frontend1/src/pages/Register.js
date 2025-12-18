import React, { useState, useEffect } from "react";
import axios from "axios";
import bgHospital from "../Image/bg-hospital1.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [notif, setNotif] = useState({ message: "", type: "" });

  // auto hide notif
  useEffect(() => {
    if (notif.message) {
      const timer = setTimeout(() => setNotif({ message: "", type: "" }), 2000);
      return () => clearTimeout(timer);
    }
  }, [notif]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/register", form);
      setNotif({ message: res.data.message, type: "success" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      let message = "Register gagal!";
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        message = Object.values(errors)[0][0];
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      setNotif({ message, type: "error" });
    }
  };

  return (
    <div style={styles.page}>
      {/* NOTIF */}
      {notif.message && (
        <div style={styles.notifOverlay}>
          <div
            style={{
              ...styles.notifBox,
              backgroundColor: notif.type === "success" ? "#22c55e" : "#dc3545",
            }}
          >
            {notif.message}
          </div>
        </div>
      )}

      {/* KIRI: GAMBAR */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${bgHospital})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* KANAN: FORM */}
      <div style={styles.formWrapper}>
        {/* Tombol icon panah */}
        <div style={styles.backIconWrapper} onClick={() => navigate("/login")}>
          <FaArrowLeft style={styles.backIcon} />
        </div>

        <h1 style={styles.title}>
          Selamat Datang
          <br />
           Silakan Registrasi 
        </h1>
        <p style={styles.subtitle}>Silakan isi data dibawah ini</p>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Username</label>
          <input name="name" value={form.name} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} style={styles.input} />

          <button type="submit" style={styles.button}>Daftar</button>
        </form>
      </div>
    </div>
  );
}

// ===== STYLE =====
const styles = {
  page: { display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" },
  formWrapper: { flex: 1, padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" },
  
  backIconWrapper: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#0b0b6b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  backIcon: {
    color: "#fff",
    fontSize: 18,
  },
  
  title: { color: "#1a0dab", marginBottom: 10 },
  subtitle: { marginBottom: 30, color: "#555" },
  label: { color: "#6a1b9a", fontWeight: "bold" },
  input: { width: "100%", padding: 12, marginTop: 6, marginBottom: 20, borderRadius: 6, border: "1px solid #ccc", fontSize: 14, backgroundColor: "#eee" },
  button: { marginTop: 30, padding: "12px", width: "100%", backgroundColor: "#0b0b6b", color: "white", border: "none", borderRadius: 8, fontSize: 16, cursor: "pointer" },

  // NOTIF
  notifOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 },
  notifBox: { padding: "25px 40px", borderRadius: 12, fontSize: 18, fontWeight: 600, color: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.25)", animation: "scaleIn 0.3s ease" },
};

// ANIMASI SCALE IN
const styleSheet = document.styleSheets[0];
const keyframes =
`@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Register;
