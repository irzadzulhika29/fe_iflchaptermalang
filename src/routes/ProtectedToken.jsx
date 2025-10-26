import { Navigate, Outlet } from "react-router-dom";

import { useGetProfile } from "../features/profile";

import Loading from "../components/loader";

const ProtectedToken = () => {
  const token = localStorage.getItem("token");

  const { data: user } = useGetProfile();

  if (!user) {
    return <Loading height={100} width={100} className="min-h-screen" />;
  }

  if (user?.data?.notice === "1") {
    <Navigate to="/masuk" />;
  }

  return token && user ? <Outlet /> : <Navigate to="/masuk" />;
};

export default ProtectedToken;
