import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function EditKunjungan() {
  const { id, kunjunganId } = useParams();
  const navigate = useNavigate();

  const initialForm = {
    tanggal_kunjungan: "",
    keluhan: "",
    diagnosa: "",
    tindakan: "",
    status: "",
  };

  const [form, setForm] = useState(initialForm);
  const [focusField, setFocusField] = useState("");
  const [notif, setNotif] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchKunjungan = async () => {
      try {
        const res = await axiosClient.get(
          `/pasien/${id}/kunjungan/${kunjunganId}`
        );
        setForm(res.data);
      } catch (err) {
        showNotif("Gagal mengambil data kunjungan");
      }
    };
    fetchKunjungan();
  }, [id, kunjunganId]);

  const showNotif = (message) => {
    setNotif(message);
    setTimeout(() => setNotif(""), 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.put(
        `/pasien/${id}/kunjungan/${kunjunganId}`,
        form
      );

      showNotif("Data kunjungan berhasil diupdate");

      setTimeout(() => {
        navigate(`/app/pasien/${id}/kunjungan`);
      }, 1500);
    } catch (err) {
      showNotif("Gagal mengupdate data kunjungan");
    }
  };

  const handleCancel = () => {
    navigate(`/app/pasien/${id}/kunjungan`);
  };

  const fields = [
    { label: "Tanggal Kunjungan", name: "tanggal_kunjungan", type: "date" },
    { label: "Keluhan", name: "keluhan", type: "textarea" },
    { label: "Diagnosa", name: "diagnosa", type: "textarea" },
    { label: "Tindakan", name: "tindakan", type: "textarea" },
  ];

  return (
    <>
      {notif && (
        <div style={overlayStyle}>
          <div style={notifBoxStyle}>{notif}</div>
        </div>
      )}

      <div style={styles.wrapper}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.titleBox}>
            <FaEdit style={styles.titleIcon} />
            <h2 style={styles.title}>Edit Kunjungan</h2>
          </div>

          {fields.map((field) => (
            <div key={field.name} style={styles.fieldWrapper}>
              <label style={styles.label}>{field.label}</label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                  style={{
                    ...styles.inputArea,
                    ...(focusField === field.name ? styles.inputFocus : {}),
                  }}
                  onFocus={() => setFocusField(field.name)}
                  onBlur={() => setFocusField("")}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(focusField === field.name ? styles.inputFocus : {}),
                  }}
                  onFocus={() => setFocusField(field.name)}
                  onBlur={() => setFocusField("")}
                />
              )}
            </div>
          ))}

          {/* 🔥 STATUS (HANYA JIKA HARI INI) */}
          {form.tanggal_kunjungan === today && (
            <div style={styles.fieldWrapper}>
              <label style={styles.label}>Status Pemeriksaan</label>
              <select
                name="status"
                value={form.status || ""}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="MENUNGGU">Menunggu</option>
                <option value="DALAM_PEMERIKSAAN">
                  Dalam Pemeriksaan
                </option>
                <option value="SELESAI">Selesai</option>
              </select>
            </div>
          )}

          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={handleCancel}
            >
              Batal
            </button>
            <button type="submit" style={styles.submitBtn}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

/* ================= STYLE ================= */

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const notifBoxStyle = {
  background: "#fff",
  padding: "20px 30px",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  form: {
    width: "100%",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
  titleBox: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(180deg, #078368, #06352d)",
    padding: "15px 20px",
    borderRadius: "12px",
    marginBottom: "25px",
    color: "#fff",
  },
  titleIcon: { marginRight: "12px", fontSize: "24px" },
  title: { fontSize: "22px", fontWeight: "700" },
  fieldWrapper: { marginBottom: "18px" },
  label: { fontWeight: "600", marginBottom: "8px", display: "block" },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  inputArea: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    minHeight: "90px",
  },
  inputFocus: {
    border: "1px solid #007bff",
    boxShadow: "0 0 6px rgba(0,123,255,0.3)",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
  },
  cancelBtn: {
    background: "#7e0707",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
  },
  submitBtn: {
    background: "#083b34",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
  },
};
