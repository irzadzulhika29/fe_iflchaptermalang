import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addCampaignByAdmin,
  addCategoryCampaignByAdmin,
  deleteCampaignByAdmin,
  deleteCategoryCampaignByAdmin,
  editCampaignByAdmin,
  editCategoryCampaignByAdmin,
  getAllCampaign,
  getAllCategoriesCampaign,
  getCampaignBySlug,
  getCategoryCampaignById,
} from "../hooks";

// campaign categories
export const useGetAllCategoriesCampaign = () => {
  return useQuery({
    queryKey: ["getAllCategoriesCampaign"],
    queryFn: async () => {
      const responseGetAllCategoriesCampaign = await getAllCategoriesCampaign();
      return responseGetAllCategoriesCampaign || "";
    },
  });
};

export const useGetCategoryCampaignById = (categoryId) => {
  return useQuery({
    queryKey: ["getCategoryCampaignById", categoryId],
    queryFn: async () => {
      const responseGetCategoryCampaignById = await getCategoryCampaignById(
        categoryId
      );
      return responseGetCategoryCampaignById || "";
    },
  });
};

export const useAddCategoryCampaignByAdmin = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseAddCategoryCampaignByAdmin =
        addCategoryCampaignByAdmin(body);
      return responseAddCategoryCampaignByAdmin;
    },
  });
};

export const useEditCategoryCampaignByAdmin = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseEditCategoryCampaignByAdmin =
        editCategoryCampaignByAdmin(body);
      return responseEditCategoryCampaignByAdmin;
    },
  });
};

export const useDeleteCategoryCampaignByAdmin = () => {
  return useMutation({
    mutationFn: (categoryId) => {
      const responseDeleteCategoryCampaignByAdmin =
        deleteCategoryCampaignByAdmin(categoryId);
      return responseDeleteCategoryCampaignByAdmin;
    },
  });
};

// campaign
export const useGetAllCampaign = () => {
  return useQuery({
    queryKey: ["getAllCampaign"],
    queryFn: async () => {
      const responseGetAllCampaign = await getAllCampaign();
      return responseGetAllCampaign || "";
    },
  });
};

export const useGetCampaignBySlug = (slugId) => {
  return useQuery({
    queryKey: ["getCampaignBySlug", slugId],
    queryFn: async () => {
      const responseGetCampaignBySlug = await getCampaignBySlug(slugId);
      return {
        dataCampaign: responseGetCampaignBySlug.data,
        donaturData: responseGetCampaignBySlug.donaturData,
      };
    },
  });
};

export const useAddCampaignByAdmin = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseAddCampaignByAdmin = addCampaignByAdmin(body);
      return responseAddCampaignByAdmin;
    },
  });
};

export const useEditCampaignByAdmin = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseEditCampaignByAdmin = editCampaignByAdmin(body);
      return responseEditCampaignByAdmin;
    },
  });
};

export const useDeleteCampaignByAdmin = () => {
  return useMutation({
    mutationFn: (slugId) => {
      const responseDeleteCampaignByAdmin = deleteCampaignByAdmin(slugId);
      return responseDeleteCampaignByAdmin;
    },
  });
};
