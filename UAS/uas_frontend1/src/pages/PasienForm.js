import { useState } from "react";
import api from "../api/axiosClient";

export default function TambahPasien() {
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    jenis_kelamin: "L",
    tanggal_lahir: "",
    golongan_darah: "",
    alamat: "",
    no_telepon: "",
    riwayat_penyakit: "",
    alergi_obat: "",
    telepon_kontak_darurat: "",
    tanggal_periksa_terakhir: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/pasien", form);
      alert(res.data.message);
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data); // ← ERROR 422 muncul di sini
      alert("Gagal menambah data pasien");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "60%",
        margin: "auto",
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Tambah Data Pasien</h2>

      <table style={{ width: "100%", borderSpacing: "10px" }}>
        <tbody>
          <tr>
            <td>Nama</td>
            <td>
              <input name="nama" value={form.nama} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
            </td>
          </tr>

          <tr>
            <td>NIK</td>
            <td>
              <input name="nik" value={form.nik} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
            </td>
          </tr>

          <tr>
            <td>Jenis Kelamin</td>
            <td>
              <select name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange} style={{ width: "100%", padding: "8px" }}>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </td>
          </tr>

          <tr>
            <td>Tanggal Lahir</td>
            <td>
              <input type="date" name="tanggal_lahir" value={form.tanggal_lahir} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
            </td>
          </tr>

          <tr>
            <td>Golongan Darah</td>
            <td>
              <input name="golongan_darah" value={form.golongan_darah} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
            </td>
          </tr>

          <tr>
            <td>Alamat</td>
            <td>
              <textarea name="alamat" value={form.alamat} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
            </td>
          </tr>

          <tr>
            <td>No Telepon</td>
            <td>
              <input name="no_telepon" value={form.no_telepon} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
            </td>
          </tr>

          <tr>
            <td>Riwayat Penyakit</td>
            <td>
              <textarea name="riwayat_penyakit" value={form.riwayat_penyakit} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
            </td>
          </tr>

          <tr>
            <td>Alergi Obat</td>
            <td>
              <textarea name="alergi_obat" value={form.alergi_obat} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
            </td>
          </tr>

          <tr>
            <td>Nama Kontak Darurat</td>
            <td>
              <input name="nama_kontak_darurat" value={form.nama_kontak_darurat} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
            </td>
          </tr>

          <tr>
            <td>Telepon Kontak Darurat</td>
            <td>
              <input name="telepon_kontak_darurat" value={form.telepon_kontak_darurat} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
            </td>
          </tr>

          <tr>
            <td>Tanggal Periksa Terakhir</td>
            <td>
              <input type="date" name="tanggal_periksa_terakhir" value={form.tanggal_periksa_terakhir} onChange={handleChange} style={{ width: "100%", padding: "8px" }} />
            </td>
          </tr>
        </tbody>
      </table>

      <button
        type="submit"
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Simpan
      </button>
    </form>
  );
}
