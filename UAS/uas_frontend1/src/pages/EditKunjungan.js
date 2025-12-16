import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function EditKunjungan() {
  const { id, kunjunganId } = useParams(); // ambil pasienId dan kunjunganId
  const navigate = useNavigate();

  const initialForm = {
    tanggal_kunjungan: "",
    keluhan: "",
    diagnosa: "",
    tindakan: "",
  };

  const [form, setForm] = useState(initialForm);
  const [focusField, setFocusField] = useState("");

  // Ambil data kunjungan untuk prefill
  useEffect(() => {
    const fetchKunjungan = async () => {
      try {
        const res = await axiosClient.get(`/pasien/${id}/kunjungan/${kunjunganId}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data kunjungan");
      }
    };
    fetchKunjungan();
  }, [id, kunjunganId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/pasien/${id}/kunjungan/${kunjunganId}`, form);
      alert("Data kunjungan berhasil diupdate!");
        navigate(`/app/pasien/${id}/kunjungan`);
    } catch (err) {
      console.error(err);
      alert("Gagal mengupdate data kunjungan");
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
                value={form[field.name]}
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
                value={form[field.name]}
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

        <div style={styles.buttonGroup}>
          <button type="button" style={styles.cancelBtn} onClick={handleCancel}>
            Batal
          </button>
          <button type="submit" style={styles.submitBtn}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    height: "calc(100vh - 60px)",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    padding: "20px 0",
    boxSizing: "border-box",
  },
   form: {
    width: "100%",
    height: "100%",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    overflowY: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  titleBox: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(180deg, #078368ff, #06352d)",
    padding: "15px 20px",
    borderRadius: "12px",
    marginBottom: "25px",
    color: "#fff",
  },
  titleIcon: { marginRight: "12px", fontSize: "24px" },
  title: { fontSize: "22px", fontWeight: "700", margin: 0 },
  fieldWrapper: { display: "flex", flexDirection: "column", marginBottom: "18px" },
  label: { fontWeight: "600", marginBottom: "8px", color: "#083b34" },
  input: {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "15px",
    boxSizing: "border-box",
    background: "#f9f9f9",
    transition: "all 0.2s",
  },
  inputArea: {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "15px",
    minHeight: "90px",
    boxSizing: "border-box",
    background: "#f9f9f9",
    resize: "none",
    transition: "all 0.2s",
  },
  inputFocus: {
    border: "1px solid #007bff",
    boxShadow: "0 0 8px rgba(0,123,255,0.3)",
    outline: "none",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "20px",
  },
  cancelBtn: {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    background: "#7e0707ff",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
  submitBtn: {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    background: "#083b34",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.3s",
  },
};
