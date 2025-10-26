import API from "../../../libs/api";
import reloadPage from "../../../utils/reloadPage";
import SweatAlert from "../../../utils/sweet-alert";

// campaign categories
export const getAllCategoriesCampaign = async () => {
  return await API.get("/campaign/category").then((response) => {
    return response.data?.data;
  });
};

export const getCategoryCampaignById = async (categoryId) => {
  return await API.get(`/shop-manager/campaign/category/${categoryId}`).then((response) => {
    return response.data?.data;
  });
};

export const addCategoryCampaignByAdmin = async (body) => {
  return await API.post("/shop-manager/campaign/category", body)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const editCategoryCampaignByAdmin = async (body) => {
  return await API.put(`/shop-manager/campaign/category/${body?.id}`, body)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const deleteCategoryCampaignByAdmin = async (categoryId) => {
  return await API.delete(`/shop-manager/campaign/category/${categoryId}`)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

// campaign
export const getAllCampaign = async () => {
  return await API.get("/campaign").then((response) => {
    return response.data?.data;
  });
};

export const getCampaignBySlug = async (slugId) => {
  return await API.get(`/campaign/${slugId}`).then((response) => {
    return response.data;
  });
};

export const addCampaignByAdmin = async (body) => {
  return await API.post("/shop-manager/campaign", body, { headers: { "Content-Type": "multipart/form-data" } })
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const editCampaignByAdmin = async (body) => {
  return await API.post(`/shop-manager/campaign/${body?.slug}`, body, { headers: { "Content-Type": "multipart/form-data" } })
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};

export const deleteCampaignByAdmin = async (slugId) => {
  return await API.delete(`/shop-manager/campaign/${slugId}`)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message, "error");
    });
};
