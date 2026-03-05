import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useGetProfile } from "../features/profile";

import Loading from "../components/loader";

const ProtectedRoles = ({ allowedRoles }) => {
  const { data } = useGetProfile();

  const location = useLocation();

  if (!data) {
    return <Loading height={100} width={100} className="min-h-screen" />;
  }

  return allowedRoles?.includes(data?.data?.role) ? <Outlet /> : <Navigate to="/admin/dashboards" state={{ from: location }} replace />;
};

export default ProtectedRoles;
