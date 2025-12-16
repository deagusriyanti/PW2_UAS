import React from "react";
import { Link, Outlet } from "react-router-dom";
import layoutLogo from "../Image/Layout.jpg";

export default function Layout() {
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div>
          {/* Logo */}
          <div style={styles.logoBox}>
            <img src={layoutLogo} alt="Logo Klinik" style={styles.logoImage} />
          </div>

          <p style={styles.navTitle}>Navigation</p>

          {/* Menu */}
          <ul style={styles.menu}>
            <li style={styles.menuItem}>
              <Link to="dashboard" style={styles.menuLink}>
                🏠 Dashboard
              </Link>
            </li>

            <li style={styles.menuItem}>
              <Link to="pasien" style={styles.menuLink}>
                📋 Daftar Pasien
              </Link>
            </li>

            {role === "admin" && (
              <li style={styles.menuItem}>
                <Link to="pasien/tambah" style={styles.menuLink}>
                  ➕ Tambah Pasien
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} style={styles.logoutBtn}>
          ⏻ Logout
        </button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        <div style={styles.contentBox}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#083d35",
  },

  /* SIDEBAR */
  sidebar: {
    width: "230px",
    background: "linear-gradient(180deg, #0b5d4b, #06352d)",
    padding: "20px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  logoBox: {
    width: "60px",
    height: "60px",
    background: "#0fd1a5",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },

  logoIcon: {
    fontSize: "28px",
  },

  navTitle: {
    fontSize: "13px",
    opacity: 0.7,
    marginBottom: "10px",
  },

  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  menuItem: {
    marginBottom: "12px",
  },

  menuLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  logoutBtn: {
    background: "#e74c3c",
    border: "none",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  /* CONTENT */
  content: {
    flex: 1,
    padding: "20px",
  },

  contentBox: {
    background: "#fff",
    height: "100%",
    borderRadius: "14px",
    padding: "20px",
  },
  logoImage: {
    width: "150%",
    height: "150%",
    objectFit: "cover",
    borderRadius: "50%",
  },
};
