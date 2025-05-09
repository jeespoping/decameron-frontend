import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import BasicLayout from "../layouts/BasicLayout";

export default function ProtectedRoute({ element }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <BasicLayout>{element}</BasicLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}
