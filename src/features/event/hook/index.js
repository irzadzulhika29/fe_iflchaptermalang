import API from "../../../libs/api";
import SweatAlert from "../../../utils/sweet-alert/index";
import reloadPage from "../../../utils/reloadPage";

export const getAllSdg = async () => {
  return await API.get("/sdg").then((response) => {
    return response.data?.data;
  });
};

export const getAllEvents = async () => {
  return await API.get("/event").then((response) => {
    return response.data?.data;
  });
};

export const addEventByAdmin = async (body) => {
  return await API.post("/event", body, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => {
      SweatAlert(
        response.data?.message || "Event berhasil ditambahkan!",
        "success"
      );
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(
        error.response?.data?.message || "Gagal menambahkan event",
        "error"
      );
      throw error;
    });
};

export const editEventByAdmin = async ({ eventId, body }) => {
    return await API.post(`/event/${eventId}`, body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        SweatAlert(
          response.data?.message || "Event berhasil diupdate!",
          "success"
        );
        reloadPage(2200);
        return response.data?.data;
      })
      .catch((error) => {
        SweatAlert(
          error.response?.data?.message || "Gagal mengupdate event",
          "error"
        );
        throw error;
      });
  };

export const deleteEventByAdmin = async (eventId) => {
  return await API.delete(`/event/${eventId}`)
    .then((response) => {
      SweatAlert(
        response.data?.message || "Event berhasil dihapus!",
        "success"
      );
      reloadPage(2200);
      return response.data?.data;
    })
    .catch((error) => {
      SweatAlert(
        error.response?.data?.message || "Gagal menghapus event",
        "error"
      );
      throw error;
    });
};
