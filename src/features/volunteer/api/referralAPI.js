import API from "../../../libs/api";

export const referralAPI = {
    validateCode: async ({ eventId, code }) => {
        const response = await API.post(`/volunteer/events/${eventId}/validate-referral`, {
            code
        });
        return response.data;
    },
};
