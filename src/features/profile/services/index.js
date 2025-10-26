import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUserByAdmin, editUserByAdmin, getAllRoles, getAllUsers, getProfile, getUserById, editProfile } from "../hooks";

export const useGetProfile = (enabled) => {
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      if (!localStorage.getItem("token")) {
        return null;
      }
      const responseProfile = await getProfile();
      return responseProfile || "";
    },
    enabled: enabled,
  });
};

export const useEditProfile = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseEditProfile = editProfile(body);
      return responseEditProfile;
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["getAllUsers"],
    queryFn: async () => {
      const responseGetAllUsers = await getAllUsers();
      return responseGetAllUsers || "";
    },
  });
};

export const useGetUserById = (userId) => {
  return useQuery({
    queryKey: ["getUserById", userId],
    queryFn: async () => {
      const responseGetUserById = await getUserById(userId);
      return responseGetUserById || "";
    },
  });
};

export const useGetAllRoles = () => {
  return useQuery({
    queryKey: ["getAllRole"],
    queryFn: async () => {
      const responseGetAllRoles = await getAllRoles();
      return responseGetAllRoles || "";
    },
  });
};

export const useEditUserByAdmin = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseEditCampaignByAdmin = editUserByAdmin(body);
      return responseEditCampaignByAdmin;
    },
  });
};

export const useDeleteUserByAdmin = () => {
  return useMutation({
    mutationFn: (userId) => {
      const responseDeleteUserByAdmin = deleteUserByAdmin(userId);
      return responseDeleteUserByAdmin;
    },
  });
};
