import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

export default function PasienList() {
  const [pasiens, setPasiens] = useState([]);

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
  const role = localStorage.getItem("role");

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          textAlign: "center",
          fontSize: "28px",
          color: "#333",
        }}
      >
        Data Pasien
      </h1>

      <div
        style={{
          overflowX: "auto",
          background: "#fff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "900px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#007bff",
                color: "white",
                textAlign: "left",
              }}
            >
              <th style={thStyle}>Nama</th>
              <th style={thStyle}>NIK</th>
              <th style={thStyle}>Jenis Kelamin</th>
              <th style={thStyle}>Tanggal Lahir</th>
              <th style={thStyle}>Golongan Darah</th>
              <th style={thStyle}>Alamat</th>
              <th style={thStyle}>No Telepon</th>
              <th style={thStyle}>Riwayat Penyakit</th>
              <th style={thStyle}>Alergi Obat</th>
              <th style={thStyle}>Kontak Darurat</th>
              <th style={thStyle}>Tanggal Periksa Terakhir</th>
              <th style={thStyle}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {pasiens.map((p, index) => (
              <tr
                key={p.id}
                style={{
                  background: index % 2 === 0 ? "#f8f9fa" : "white",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e9f3ff")}
                onMouseLeave={(e) => (e.currentTarget.style.background = index % 2 === 0 ? "#f8f9fa" : "white")}
              >
                <td style={tdStyle}>{p.nama}</td>
                <td style={tdStyle}>{p.nik}</td>
                <td style={tdStyle}>{p.jenis_kelamin}</td>
                <td style={tdStyle}>{p.tanggal_lahir}</td>
                <td style={tdStyle}>{p.golongan_darah}</td>
                <td style={tdStyle}>{p.alamat}</td>
                <td style={tdStyle}>{p.no_telepon}</td>
                <td style={tdStyle}>{p.riwayat_penyakit}</td>
                <td style={tdStyle}>{p.alergi_obat}</td>
                <td style={tdStyle}>{p.telepon_kontak_darurat}</td>
                <td style={tdStyle}>{p.tanggal_periksa_terakhir}</td>

                <td style={tdStyle}>
                  {React.createElement(
                    React.Fragment,
                    null,

                    // Tombol DETAIL (admin & user)
                    React.createElement(Link, { style: linkStyle, to: p.id + "/kunjungan" }, "Detail"),

                    // ADMIN ONLY
                    role === "admin"
                      ? React.createElement(
                          React.Fragment,
                          null,
                          " | ",
                          React.createElement(Link, { style: linkStyle, to: "/pasien/edit/" + p.id }, "Edit"),
                          " | ",
                          React.createElement(
                            "span",
                            {
                              onClick: () => deletePasien(p.id),
                              style: {
                                color: "red",
                                cursor: "pointer",
                                fontWeight: "bold",
                              },
                            },
                            "Delete"
                          )
                        )
                      : null
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// STYLE OBJECT
const thStyle = {
  padding: "12px 10px",
  fontSize: "14px",
  borderBottom: "2px solid #005dc1",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  fontSize: "14px",
  color: "#333",
};

const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
  fontWeight: "bold",
};
