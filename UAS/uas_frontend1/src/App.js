import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import KunjunganForm from "./pages/KunjunganForm";
import KunjunganList from "./pages/KunjunganList";
import PasienDetail from "./pages/PasienDetail";
import PasienForm from "./pages/PasienForm";
import PasienList from "./pages/PasienList";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return React.createElement(
    Router,
    null,
    React.createElement(
      Routes,
      null,

      // 🔹 Login & Register (di luar Layout)
      React.createElement(Route, {
        path: "/",
        element: React.createElement(Login),
      }),
      React.createElement(Route, {
        path: "/login",
        element: React.createElement(Login),
      }),

      React.createElement(Route, {
        path: "/register",
        element: React.createElement(Register),
      }),

      // 🔹 Semua halaman utama menggunakan Layout
      React.createElement(Route, {
        path: "/app",
        element: React.createElement(Layout),
        children: [
          // default halaman
          React.createElement(Route, {
            index: true,
            element: React.createElement(PasienList),
          }),

          // Pasien
          React.createElement(Route, {
            path: "pasien",
            element: React.createElement(PasienList),
          }),
          React.createElement(Route, {
            path: "pasien/tambah",
            element: React.createElement(PasienForm),
          }),
          React.createElement(Route, {
            path: "pasien/detail/:id",
            element: React.createElement(PasienDetail),
          }),

          // Kunjungan
          React.createElement(Route, {
            path: "pasien/:id/kunjungan",
            element: React.createElement(KunjunganList),
          }),
          React.createElement(Route, {
            path: "pasien/:id/kunjungan/tambah",
            element: React.createElement(KunjunganForm),
          }),
        ],
      })
    )
  );
}

export default App;
