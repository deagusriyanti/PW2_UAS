import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link, useParams } from "react-router-dom";

export default function PasienDetail() {
  const { id } = useParams();
  const [pasien, setPasien] = useState(null);

  useEffect(() => {
    axiosClient.get(`/pasien/${id}`).then((res) => {
      setPasien(res.data);
    });
  }, [id]);

  if (!pasien) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Detail Pasien</h1>

      <p>Nama: {pasien.nama}</p>
      <p>NIK: {pasien.nik}</p>
      <p>Alamat: {pasien.alamat}</p>

      <Link to={`app/pasien/${id}/kunjungan`}>Lihat Kunjungan</Link>
      <br />
      <Link to={`app/pasien/${id}/kunjungan/tambah`}>Tambah Kunjungan</Link>
    </div>
  );
}
