import API from "../../../libs/api";
import reloadPage from "../../../utils/reloadPage";
import SweatAlert, { SweatAlertResendEmail } from "../../../utils/sweet-alert";

export const register = async (body) => {
  return await API.post("/auth/register", body)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200, `/verify?mail=${response.data?.data?.email}`);
    })
    .catch((error) => {
      const { email, username, password, detail } = error.response.data.message;
      const message = email || username || password || detail;
      SweatAlert(message || error.response.data?.message || "Terdapat masalah dalam autentikasi, tolong coba lagi", "error");
    });
};

export const login = async (body) => {
  return await API.post("/auth/login", body)
    .then((response) => {
      localStorage.setItem("token", response.data?.data?.token?.token?.access_token);
      SweatAlert(response.data?.message, "success");
      reloadPage(2200, "/");
    })
    .catch((error) => {
      const message = error.response.data?.message || "Terdapat masalah dalam autentikasi, tolong coba lagi";
      if (error.response.data?.message === "Email not verified") {
        SweatAlertResendEmail(
          "Email belum diverifikasi",
          "Email anda belum diverifikasi, tolong klik tombol 'resend' untuk mengirim email verifikasi!",
          body?.email
        );
        return;
      }
      SweatAlert(message, "error");
    });
};

export const resend = async (body) => {
  return await API.post("/auth/email/resend", body)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      return response.data;
    })
    .catch((error) => {
      const message = error.response.data?.message;
      SweatAlert(message, "error");
    });
};

export const logout = async () => {
  return await API.post("/auth/logout")
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      localStorage.clear();
      reloadPage(2200, "/");
    })
    .catch((error) => {
      const message = error.response.data?.message;
      SweatAlert(message, "error");
    });
};

export const forgotPassword = async (body) => {
  return await API.post("/auth/password/email", body)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
    })
    .catch((error) => {
      const message = error.response?.data?.message;
      SweatAlert(message, "error");
    });
};

export const refreshToken = async () => {
  localStorage.removeItem("token");
  return await API.get("/auth/refresh-token")
    .then((response) => {
      localStorage.setItem("token", response.data?.token);
      return response.data;
    })
    .catch((error) => {
      const message = error.response?.data?.message;
      SweatAlert(message, "error");
    });
};

export const loginWithGoogle = async () => {
  return await API.get("/auth/google").then((response) => {
    return response.data?.auth_url;
  });
};

export const googleCallback = async (code) => {
  return await API.get(`/auth/google/callback?code=${code}`)
    .then((response) => {
      localStorage.setItem("token", response.data?.data?.token?.access_token);
      SweatAlert(response.data?.message, "success");
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};
