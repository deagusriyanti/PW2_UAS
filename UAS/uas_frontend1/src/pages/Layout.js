import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import layoutLogo from "../Image/Layout.jpg";
import { FaHome, FaUserInjured, FaPlus } from "react-icons/fa"; 

export default function Layout() {
  const location = useLocation();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const isActive = (path) => location.pathname.includes(path);


  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div>
          {/* Logo */}
          <div style={styles.logoBox}>
            <img src={layoutLogo} alt="Logo Klinik" style={styles.logoImage} />
          </div>
          <hr style={styles.divider} />



          <p style={styles.navTitle}>Navigation</p>

          {/* Menu */}
         <ul style={styles.menu}>
  <li style={styles.menuItem}>
    <Link
      to="dashboard"
      style={isActive("/dashboard") ? { ...styles.menuLink, ...styles.activeMenu } : styles.menuLink}
    >
      <span style={styles.iconCircle}>
        <FaHome />
      </span>
      Dashboard
    </Link>
  </li>

  <li style={styles.menuItem}>
    <Link
      to="pasien"
      style={isActive("/pasien") ? { ...styles.menuLink, ...styles.activeMenu } : styles.menuLink}
    >
      <span style={styles.iconCircle}>
        <FaUserInjured />
      </span>
      Daftar Pasien
    </Link>
  </li>

  {role === "admin" && (
    <li style={styles.menuItem}>
      <Link
        to="pasien/tambah"
        style={isActive("/pasien/tambah") ? { ...styles.menuLink, ...styles.activeMenu } : styles.menuLink}
      >
        <span style={styles.iconCircle}>
          <FaPlus />
        </span>
        Tambah Pasien
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
    overflow: "hidden",
  },

  /* SIDEBAR */
  sidebar: {
    width: "220px", // sedikit lebih lebar agar menu muat
    background: "linear-gradient(180deg, #078368ff, #06352d)",
    padding: "20px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  logoBox: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px auto",
    overflow: "hidden",
  },

  logoIcon: {
    fontSize: "28px",
  },

  navTitle: {
    fontSize: "17px",            // lebih besar
    fontWeight: "600",           // lebih tebal
    opacity: 0.85,
    marginBottom: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // font cantik & modern
  },

  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  menuItem: {
    marginBottom: "16px",        // lebih renggang antar menu
  },

  menuLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",            // lebih besar
    display: "flex",
    alignItems: "center",
    gap: "15px",                 // jarak ikon dan teks
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "8px 10px",         // area klik lebih nyaman
    borderRadius: "6px",
    transition: "all 0.2s ease", // animasi hover halus
  },

  activeMenu: {
    background: "#299472ff",
    color: "#fffbf0ff",
    fontWeight: "bold",
    borderRadius: "8px",       // lebih bulat
    padding: "10px 12px",      // lebih tinggi & lebar
    margin: "2px 0",           // beri jarak antar menu aktif
  },

  logoutBtn: {
    background: "#b32110ff",
    border: "none",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  /* CONTENT */
  content: {
    flex: 1,
    padding: "20px",
    marginBottom: "40px",
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
  },

  divider: {
    border: "none",
    borderTop: "1px solid rgba(255, 255, 255, 0.4)",
    margin: "16px 0",
  },

  iconCircle: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",       // ukuran bulat
  height: "36px",
  borderRadius: "50%", // membuat bulat
  background: "rgba(255, 255, 255, 0.2)", // warna background ikon
  color: "#fff",       // warna ikon
  fontSize: "18px",    // ukuran ikon
}

};
