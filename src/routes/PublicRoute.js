import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Publicroute({ element, restricted }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated && restricted ? (
    <Navigate to="/" replace />
  ) : (
    <BasicLayout>{element}</BasicLayout>
  );
}
