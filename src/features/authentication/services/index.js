import { useMutation, useQuery } from "@tanstack/react-query";
import { forgotPassword, googleCallback, login, loginWithGoogle, logout, register, resend } from "../hooks";

export const useRegistration = () => {
  return useMutation({
    mutationFn: (body) => {
      const registrationResponse = register(body);
      return registrationResponse;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (body) => {
      const loginResponse = login(body);
      return loginResponse;
    },
  });
};

export const useResendEmail = () => {
  return useMutation({
    mutationFn: (body) => {
      const resendResponse = resend(body);
      return resendResponse;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => {
      const logoutResponse = logout();
      return logoutResponse;
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (body) => {
      const forgotPasswordResponse = forgotPassword(body);
      return forgotPasswordResponse;
    },
  });
};

export const useLoginGoogle = () => {
  return useQuery({
    queryKey: ["getUrlLoginGoogle"],
    queryFn: async () => {
      const responseLoginWithGoogle = await loginWithGoogle();
      return responseLoginWithGoogle || "";
    },
  });
};

export const useGoogleCallback = (code) => {
  return useQuery({
    queryKey: ["getGoogleCallback", code],
    queryFn: async () => {
      const responseGoogleCallback = await googleCallback(code);
      return responseGoogleCallback || "";
    },
  });
};
