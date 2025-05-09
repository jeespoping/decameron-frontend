import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Inicio from "../pages/Inicio";
import { useDispatch } from "react-redux";
import { getAccesToken } from "../utils/token";
import { logout } from "../reducers/authReducer";
import { getMe } from "../actions/auth";
import ListHotelAdmin from "../pages/ListHotelAdmin/ListHotelAdmin";
import ProtectedRoute from "./ProtectedRoute";
import Crear from "../pages/Crear";

export default function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const accessToken = getAccesToken();

      if (accessToken === "undefined") {
        dispatch(logout());
        return;
      }

      await dispatch(getMe());
    })();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<PublicRoute element={<Inicio />} />} />;
          <Route
            path="/list-admin"
            element={<ProtectedRoute element={<ListHotelAdmin />} />}
          />
          <Route
            path="/crear"
            element={<ProtectedRoute element={<Crear />} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
