import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
//tes
export default function KunjunganForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tanggal_kunjungan: "",
    keluhan: "",
    diagnosa: "",
    tindakan: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    await axiosClient.post(`/pasien/${id}/kunjungan`, form);

    navigate(`/pasien/${id}/kunjungan`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tambah Kunjungan</h1>

      <form onSubmit={submit}>
        <input type="date" value={form.tanggal_kunjungan} onChange={(e) => setForm({ ...form, tanggal_kunjungan: e.target.value })} />
        <br />

        <input type="text" placeholder="Keluhan" value={form.keluhan} onChange={(e) => setForm({ ...form, keluhan: e.target.value })} />
        <br />

        <input type="text" placeholder="Diagnosa" value={form.diagnosa} onChange={(e) => setForm({ ...form, diagnosa: e.target.value })} />
        <br />

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
