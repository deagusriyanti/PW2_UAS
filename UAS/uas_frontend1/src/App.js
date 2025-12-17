import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
  return React.createElement(
    Router,
    null,
    React.createElement(
      Routes,
      null,

      // 🔹 Login & Register
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

      // 🔹 Area utama (pakai Layout)
      React.createElement(
        Route,
        {
          path: "/app",
          element: React.createElement(Layout),
        },
        [
          // ⬇️ default /app
          React.createElement(Route, {
            index: true,
            element: React.createElement(Welcome),
          }),

          // Dashboard
          React.createElement(Route, {
            path: "dashboard",
            element: React.createElement(Dashboard),
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
          React.createElement(Route, {
            path: "pasien/edit/:id",
            element: React.createElement(EditPasien),
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
          React.createElement(Route, {
            path: "pasien/:id/kunjungan/edit/:kunjunganId",
            element: React.createElement(EditKunjungan),
          }),
        ]
      )
    )
  );
}

export default App;
