import API from "../../../libs/api";
import reloadPage from "../../../utils/reloadPage";
import SweatAlert, { SweatAlertWithContent } from "../../../utils/sweet-alert";

export const getProfile = async () => {
  return await API.get("/profile")
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      SweatAlertWithContent("Your session is about to time out. Do you want to extend your current session?");
    });
};

export const editProfile = async (body) => {
  return await API.post("/profile/edit", body, { headers: { "Content-Type": "multipart/form-data" } })
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
    })
    .catch((error) => {
      const { name, username, address, phone_number, about_me, background_picture, profile_picture } = error.response.data.error;
      const message =
        name ||
        username ||
        address ||
        phone_number ||
        about_me ||
        background_picture ||
        profile_picture ||
        "There was an error where input a data, please try again";
      SweatAlert(message || error.response.data?.message, "error");
    });
};

export const getAllRoles = async () => {
  return await API.get("/admin/role").then((response) => {
    return response.data?.data;
  });
};

export const getAllUsers = async () => {
  return await API.get("/supervisor").then((response) => {
    return response.data?.data;
  });
};

export const getUserById = async (userId) => {
  return await API.get(`/admin/${userId}`).then((response) => {
    return response.data?.data;
  });
};

export const editUserByAdmin = async (body) => {
  return await API.put(`/admin/${body.id}`, body)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response?.data?.message, "error");
    });
};

export const deleteUserByAdmin = async (userId) => {
  return await API.delete(`/admin/${userId}`)
    .then((response) => {
      SweatAlert(response.data?.message, "success");
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(error.response?.data?.message, "error");
    });
};
