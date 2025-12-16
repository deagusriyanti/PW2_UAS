import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

export default function KunjunganList() {
  const { id } = useParams(); // id pasien
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchKunjungan = async () => {
      try {
        const res = await axiosClient.get(`/pasien/${id}/kunjungan`);
        if (res.data && Array.isArray(res.data)) {
          const sorted = res.data.sort(
            (a, b) => new Date(b.tanggal_kunjungan) - new Date(a.tanggal_kunjungan)
          );
          setItems(sorted);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("Gagal fetch kunjungan:", err.response || err.message);
        alert("Gagal mengambil data kunjungan");
      }
    };
    fetchKunjungan();
  }, [id]);

  const handleDelete = async (kunjunganId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axiosClient.delete(`/pasien/${id}/kunjungan/${kunjunganId}`);
        alert("Data berhasil dihapus!");
        const res = await axiosClient.get(`/pasien/${id}/kunjungan`);
        setItems(res.data || []);
      } catch (err) {
        console.error("Gagal menghapus kunjungan:", err.response || err.message);
        alert("Gagal menghapus data!");
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      <button
        style={styles.backBtn}
        onClick={() => navigate(`/app/pasien/detail/${id}`)}
      >
        &larr; Kembali
      </button>

      {/* Judul dan total kunjungan */}
      <div style={styles.header}>
        <h2 style={styles.title}>Riwayat Pemeriksaan</h2>
        <p style={styles.total}>Total Kunjungan: {items.length}</p>
      </div>

      <div style={styles.tableScroll}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tanggal</th>
              <th style={styles.th}>Keluhan</th>
              <th style={styles.th}>Diagnosa</th>
              <th style={styles.th}>Tindakan</th>
              {role === "admin" && <th style={styles.th}>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((k, index) => (
                <tr key={k.id} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
                  <td style={styles.td}>{k.tanggal_kunjungan}</td>
                  <td style={styles.td}>{k.keluhan}</td>
                  <td style={styles.td}>{k.diagnosa}</td>
                  <td style={styles.td}>{k.tindakan}</td>
                  {role === "admin" && (
                    <td style={styles.td}>
                      <button
                        style={styles.editBtn}
                        onClick={() =>
                          navigate(`/app/pasien/${id}/kunjungan/edit/${k.id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(k.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === "admin" ? 5 : 4} style={styles.noData}>
                  Belum ada data kunjungan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    height: "calc(100vh - 60px)",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#083b34",
    margin: 0,
  },
  total: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#083b34",
  },
  backBtn: {
    padding: "10px 20px",
    borderRadius: "12px",
    border: "none",
    background: "#42929eff",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    marginBottom: "20px",
  },
  tableScroll: {
    overflowX: "auto",
    maxHeight: "70vh",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    minWidth: "700px",
  },
  th: {
    position: "sticky",
    top: 0,
    background: "linear-gradient(90deg, #078368ff, #06352d)",
    color: "#fff",
    fontWeight: "700",
    padding: "14px 12px",
    textAlign: "left",
  },
  trEven: { backgroundColor: "#f2f7f7" },
  trOdd: { backgroundColor: "#ffffff" },
  td: { padding: "12px", color: "#333", borderBottom: "1px solid #e0e0e0" },
  editBtn: {
    marginRight: "10px",
    padding: "6px 12px",
    borderRadius: "8px",
    background: "#17a2b8",
    color: "#fff",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
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
  noData: { textAlign: "center", padding: "20px", color: "#555", fontStyle: "italic" },
};
