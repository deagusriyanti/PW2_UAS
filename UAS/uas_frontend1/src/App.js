import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./pages/Layout";
import Welcome from "./pages/Welcome";

import Dashboard from "./pages/dashboardd";
import PasienList from "./pages/PasienList";
import PasienForm from "./pages/PasienForm";
import PasienDetail from "./pages/PasienDetail";
import EditPasien from "./pages/Editpasien";

import KunjunganList from "./pages/KunjunganList";
import KunjunganForm from "./pages/KunjunganForm";
import EditKunjungan from "./pages/EditKunjungan";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ManajemenAkun from "./pages/ManajemenAkun";

// 🔐 PRIVATE ROUTE (WAJIB DI ATAS APP)
function PrivateRoute({ children }) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// --- AdminRoute Wrapper ---
function AdminRoute({ children }) {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔹 Login & Register */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔹 Area utama (protected) */}
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Welcome />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="pasien" element={<PasienList />} />
          <Route path="pasien/tambah" element={<PasienForm />} />
          <Route path="pasien/detail/:id" element={<PasienDetail />} />
          <Route path="pasien/edit/:id" element={<EditPasien />} />

          <Route path="pasien/:id/kunjungan" element={<KunjunganList />} />
          <Route path="pasien/:id/kunjungan/tambah" element={<KunjunganForm />} />
          <Route path="pasien/:id/kunjungan/edit/:kunjunganId" element={<EditKunjungan />} />

          <Route
            path="manajemen-akun"
            element={
              <AdminRoute>
                <ManajemenAkun />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
