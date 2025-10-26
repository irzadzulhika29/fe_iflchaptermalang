import { Navigate, Outlet } from "react-router-dom";

import { useGetProfile } from "../features/profile";

import Loading from "../components/loader";

const ProtectedDashboard = () => {
  const { data } = useGetProfile();

  if (!data) {
    return <Loading height={100} width={100} className="min-h-screen" />;
  }

  return data?.data?.role !== "user" ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedDashboard;
