import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link, useParams } from "react-router-dom";

export default function KunjunganList() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosClient.get(`/pasien/${id}/kunjungan`).then((res) => {
      setItems(res.data);
    });
  }, [id]);
  const role = localStorage.getItem("role");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Riwayat Pemeriksaan</h1>
      {role === "admin" && (
        <Link to="tambah">
          <button>+ Tambah Data</button>
        </Link>
      )}
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Keluhan</th>
            <th>Diagnosa</th>
          </tr>
        </thead>

        <tbody>
          {items.map((k) => (
            <tr key={k.id}>
              <td>{k.tanggal_kunjungan}</td>
              <td>{k.keluhan}</td>
              <td>{k.diagnosa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
