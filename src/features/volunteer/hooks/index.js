import API from "../../../libs/api";

export const getAllVolunteers = async () => {
  return await API.get("/admin/volunteers").then((response) => {
    return response.data?.data;
  });
};