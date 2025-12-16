import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import { VscOrganization } from "react-icons/vsc"; 

export default function PasienList() {
  const [pasiens, setPasiens] = useState([]);
  const [search, setSearch] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    axiosClient.get("/pasien").then((res) => {
      setPasiens(res.data);
    });
  }, []);

  const deletePasien = (id) => {
    if (window.confirm("Yakin ingin menghapus data pasien ini?")) {
      axiosClient.delete("/pasien/" + id).then(() => {
        setPasiens(pasiens.filter((p) => p.id !== id));
      });
    }
  };

  const filteredPasiens = pasiens.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.nik.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>
  <VscOrganization style={styles.titleIcon} /> Data Pasien
</h1>
      {/* Search Bar */}
      <div style={styles.searchWrapper}>
        <div style={styles.searchBox}>
          <div style={styles.iconCircle}>
            <VscSearch style={styles.searchIcon} />
          </div>
          <input
            type="text"
            placeholder="Cari pasien berdasarkan nama atau NIK..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nama</th>
              <th style={styles.th}>NIK</th>
              <th style={styles.th}>Jenis Kelamin</th>
              <th style={styles.th}>Tanggal Lahir</th>
              <th style={styles.th}>Golongan Darah</th>
              <th style={styles.th}>Alamat</th>
              <th style={styles.th}>No Telepon</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredPasiens.length > 0 ? (
              filteredPasiens.map((p, index) => (
                <tr
                  key={p.id}
                  style={{
                    background: index % 2 === 0 ? "#f9f9f9" : "#fff",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#e0f7ff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = index % 2 === 0 ? "#f9f9f9" : "#fff")
                  }
                >
                  <td style={styles.td}>{p.nama}</td>
                  <td style={styles.td}>{p.nik}</td>
                  <td style={styles.td}>{p.jenis_kelamin}</td>
                  <td style={styles.td}>{p.tanggal_lahir}</td>
                  <td style={styles.td}>{p.golongan_darah}</td>
                  <td style={styles.td}>{p.alamat}</td>
                  <td style={styles.td}>{p.no_telepon}</td>
                  <td style={styles.td}>
                    <Link style={styles.detailBtn} to={`/app/pasien/detail/${p.id}`}>
                      Detail
                    </Link>
                    {role === "admin" && (
                      <button
                        style={styles.deleteBtn}
                        onClick={() => deletePasien(p.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={styles.noData}>
                  Tidak ada pasien ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Styles
const styles = {
  wrapper: {
    padding: "15px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
  textAlign: "center",
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "50px",
  background: "linear-gradient(90deg, #078368, #17a2b8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
    

},
titleIcon: {
  fontSize: "32px",
  color: "#078368",
},

  searchWrapper: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "5px 10px",
  },
  iconCircle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#729faeff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
  },
  searchIcon: {
    fontSize: "15px",
    color: "#fafcfeff",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "10px 0",
    fontSize: "14px",
  },
  tableWrapper: {
    overflowX: "auto",
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },
  th: {
    padding: "12px 10px",
    fontSize: "14px",
    borderBottom: "2px solid #007bff",
    borderRight: "1px solid #ddd",
    background: "linear-gradient(90deg, #078368ff, #06352d)",
    color: "#fff",
    textAlign: "left",
  },
  td: {
    padding: "12px 10px",
    borderBottom: "1px solid #ddd",
    borderRight: "1px solid #ddd",
    fontSize: "14px",
    color: "#333",
  },
  detailBtn: {
    marginRight: "10px",
    padding: "6px 12px",
    borderRadius: "8px",
    background: "#17a2b8",
    color: "#fff",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
    textDecoration: "none",
  },
  deleteBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    background: "#dc3545",
    color: "#fff",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    fontStyle: "italic",
    color: "#555",
  },
};
