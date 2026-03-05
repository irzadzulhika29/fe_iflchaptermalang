import API from "../../../libs/api";

export const volunteerAPI = {
    getAll: async () => {
        const response = await API.get("/admin/volunteer-registrations");
        return response.data;
    },

    register: async (payload) => {
        const response = await API.post("/volunteer/registration", payload);
        return response.data;
    },

    updateStatus: async ({ id, status }) => {
        const response = await API.patch(`/admin/volunteer-registrations/${id}/status`, {
            status
        });
        return response.data;
    },
};