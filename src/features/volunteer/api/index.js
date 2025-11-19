import API from "../../../libs/api";

export const volunteerAPI = {
    getAll: async () => {
        const response = await API.get("/admin/volunteer-registrations");
        console.log(response.data);
        return response.data;
    },

    register: async (payload) => {
        const response = await API.post("/volunteer/registration", payload);
        return response.data;
    },
};