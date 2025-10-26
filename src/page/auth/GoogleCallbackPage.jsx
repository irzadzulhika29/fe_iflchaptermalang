import { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { useGoogleCallback } from "../../features/authentication";

import Loading from "../../components/loader";

const GoogleCallbackPage = () => {
  const [params] = useSearchParams();

  const code = params.get("code");

  const { isLoading, data } = useGoogleCallback(code);

  const navigate = useNavigate();

  useEffect(() => {
    if (!code) {
      navigate("/404");
    }
  }, [navigate, code]);

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center min-h-screen">
        <p className="absolute left-4 top-4">Waiting for a second...</p>
        <Loading height={100} width={100} />
      </div>
    );
  } else {
    if (data) {
      setTimeout(() => {
        window.location.href = "/";
      }, 2200);
    } else {
      setTimeout(() => {
        window.location.href = "/masuk";
      }, 2200);
    }
  }
};

export default GoogleCallbackPage;
