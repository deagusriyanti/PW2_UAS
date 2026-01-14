import React, { useState, useEffect } from "react";
import api from "../api/axiosClient";
import { VscDashboard } from "react-icons/vsc";

// --- Card Component ---
function Card({ title, value, color, onClick }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
        borderLeft: `6px solid ${color}`,
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={onClick}
    >
      <p style={{ fontSize: "14px", color: "#6b7280" }}>{title}</p>
      <h1
        style={{
          marginTop: "12px",
          fontSize: "34px",
          fontWeight: "700",
          color,
        }}
      >
        {value}
      </h1>
    </div>
  );
}

// --- Dashboard Component ---
export default function Dashboard() {
  const [pasien, setPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const updateStatus = (id, status) => {
  api
    .put(`/antrian/${id}/status`, { status })
    .then(() => api.get("/antrian/hari-ini"))
    .then((res) => {
      const list = res.data.antrian.map((k) => ({
      id: k.id, 
        pasien_id: k.pasien_id,
        nama: k.pasien?.nama || "-",
        nomor_antrian: k.nomor_antrian,
        status: k.status,
      }));
      setAntrianHariIni(list);
    })
    .catch((err) => {
      console.error("Gagal update status:", err);
    });
};

  // === STATE ANTRIAN (SUMBER RESMI BACKEND) ===
  const [antrianHariIni, setAntrianHariIni] = useState([]);

  // === FETCH PASIEN (TIDAK DIUBAH) ===
  useEffect(() => {
    api
      .get("/pasien")
      .then((res) => {
        setPasien(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // === FETCH ANTRIAN HARI INI (FIX UTAMA) ===
useEffect(() => {
  api
    .get("/antrian/hari-ini")
    .then((res) => {
      const list = res.data.antrian.map((k) => ({
        id: k.id, 
        pasien_id: k.pasien_id,
        nama: k.pasien?.nama || "-",
        nomor_antrian: k.nomor_antrian,
        status: k.status,
      }));

      setAntrianHariIni(list);
    })
    .catch((err) => {
      console.error("Gagal ambil antrian hari ini:", err);
      setAntrianHariIni([]);
    });
}, []);


  const totalKunjunganHariIni = antrianHariIni.length;

  // === STATISTIK PASIEN (TIDAK DIUBAH) ===
  const totalPasien = pasien.length;
  const totalPerempuan = pasien.filter(
    (p) => p.jenis_kelamin === "Perempuan" || p.jenis_kelamin === "P"
  ).length;
  const totalLakiLaki = pasien.filter(
    (p) => p.jenis_kelamin === "Laki-laki" || p.jenis_kelamin === "L"
  ).length;

  // === HITUNG STATUS ANTRIAN ===
  const totalMenunggu = antrianHariIni.filter(
    (a) => a.status === "MENUNGGU"
  ).length;
  const totalPeriksa = antrianHariIni.filter(
    (a) => a.status === "DALAM_PEMERIKSAAN"
  ).length;
  const totalSelesai = antrianHariIni.filter(
    (a) => a.status === "SELESAI"
  ).length;

  if (loading) return <p>Loading...</p>;

  const getFilteredPasien = () => {
    if (!selectedCategory) return [];
    if (selectedCategory === "total") return pasien;
    if (selectedCategory === "perempuan")
      return pasien.filter(
        (p) => p.jenis_kelamin === "Perempuan" || p.jenis_kelamin === "P"
      );
    if (selectedCategory === "laki")
      return pasien.filter(
        (p) => p.jenis_kelamin === "Laki-laki" || p.jenis_kelamin === "L"
      );
    if (selectedCategory === "kunjungan") {
  return pasien.filter((p) =>
    p.kunjungans?.some(
      (k) =>
        new Date(k.tanggal_kunjungan).toDateString() ===
        new Date().toDateString()
    )
  );
}
  };
  return (
    <div style={{ padding: "24px" }}>
      <h2 style={styles.title}>
        <VscDashboard style={styles.titleIcon} />
        Dashboard
      </h2>

      <h3 style={sectionTitle}>
  Ringkasan Data Pasien
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "40px",
  }}
></div>

      {/* CARD UTAMA */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <Card
          title="Total Pasien"
          value={totalPasien}
          color="#4f46e5"
          onClick={() => setSelectedCategory("total")}
        />
        <Card
          title="Pasien Perempuan"
          value={totalPerempuan}
          color="#ec4899"
          onClick={() => setSelectedCategory("perempuan")}
        />
        <Card
          title="Pasien Laki-laki"
          value={totalLakiLaki}
          color="#0ea5e9"
          onClick={() => setSelectedCategory("laki")}
        />
        <Card
          title="Kunjungan Hari Ini"
          value={totalKunjunganHariIni}
          color="#22c55e"
          onClick={() => setSelectedCategory("kunjungan")}
        />
      </div>

      <h3 style={sectionTitle}>
  Status Antrian Hari Ini
</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "40px",
  }}
></div>

      {/* CARD STATUS ANTRIAN */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <Card title="Menunggu" value={totalMenunggu} color="#f59e0b" />
        <Card
          title="Dalam Pemeriksaan"
          value={totalPeriksa}
          color="#3b82f6"
        />
        <Card title="Selesai" value={totalSelesai} color="#22c55e" />
      </div>

      {/* TABEL ANTRIAN */}
      <h3 style={{ marginBottom: "12px" }}>Antrian Hari Ini</h3>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>No Antrian</th>
            <th style={thStyle}>Nama Pasien</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {antrianHariIni.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                Tidak ada antrian hari ini
              </td>
            </tr>
          )}
          {antrianHariIni.map((a, idx) => (
            <tr key={idx} style={idx % 2 === 0 ? rowEvenStyle : rowOddStyle}>
              <td style={tdStyle}>{a.nomor_antrian}</td>
              <td style={tdStyle}>{a.nama}</td>
             <td style={tdStyle}>
  {a.status === "MENUNGGU" && (
    <>
      🟡 Menunggu <br />
      <button
        style={btnPrimary}
        onMouseDown={(e) =>
          (e.currentTarget.style.transform = "scale(0.92)")
        }
        onMouseUp={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
        onClick={() =>
          updateStatus(a.id, "DALAM_PEMERIKSAAN")
        }
      >
        Periksa
      </button>
    </>
  )}

  {a.status === "DALAM_PEMERIKSAAN" && (
    <>
      🔵 Diperiksa <br />
      <button
        style={btnSuccess}
        onMouseDown={(e) =>
          (e.currentTarget.style.transform = "scale(0.92)")
        }
        onMouseUp={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
        onClick={() =>
          updateStatus(a.id, "SELESAI")
        }
      >
        Selesai
      </button>
    </>
  )}
  

  {a.status === "SELESAI" && "🟢 Selesai"}
</td>
  </tr>
))}

</tbody>
</table>


{/* TABEL PASIEN LAMA (TIDAK DIUBAH) */}
{selectedCategory && (
  <div style={{ marginTop: "40px" }}>
    <h3 style={{ marginBottom: "12px" }}>
      Daftar Pasien ({selectedCategory})
    </h3>
    <table style={tableStyle}>
      <thead style={theadStyle}>
        <tr>
          <th style={thStyle}>No</th>
          <th style={thStyle}>Nama</th>
          <th style={thStyle}>Jenis Kelamin</th>
          <th style={thStyle}>Tanggal Kunjungan Terakhir</th>
        </tr>
      </thead>
      <tbody>
        {getFilteredPasien().map((p, idx) => (
          <tr
            key={p.id}
            style={idx % 2 === 0 ? rowEvenStyle : rowOddStyle}
          >
            <td style={tdStyle}>{idx + 1}</td>
            <td style={tdStyle}>{p.nama || "–"}</td>
            <td style={tdStyle}>{p.jenis_kelamin}</td>
            <td style={tdStyle}>
  {p.kunjungans?.length
    ? new Date(
        p.kunjungans[p.kunjungans.length - 1].tanggal_kunjungan
      ).toLocaleDateString("id-ID")
    : "–"}
</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
}


// --- Styles ---
const styles = {
  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "50px",
    background: "linear-gradient(90deg, #078368, #17a2b8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
  },
  titleIcon: {
    fontSize: "36px",
    color: "#078368",
  },
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "12px",
  overflow: "hidden",
};
const theadStyle = {
  background: "linear-gradient(90deg, #078368, #17a2b8)",
  color: "#fff",
};
const thStyle = { padding: "12px 10px", textAlign: "left" };
const tdStyle = { padding: "10px" };
const rowEvenStyle = { backgroundColor: "#d1fae5" };
const rowOddStyle = { backgroundColor: "#f0fdf4" };

const btnPrimary = {
  marginTop: "6px",
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

const btnSuccess = {
  marginTop: "6px",
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
  background: "#16a34a",
  color: "#fff",
  cursor: "pointer",
};

const btnActive = {
  transform: "scale(0.95)",
};

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "800",
  marginBottom: "16px",
  color: "#374151",
};

