import API from "../../../libs/api";

export const referralAPI = {
    validateCode: async ({ eventId, code }) => {
        const response = await API.post(`/volunteer/events/${eventId}/validate-referral`, {
            code
        });
        return response.data;
    },

    getReferralCodes: async (eventId) => {
        const response = await API.get(`/volunteer/events/${eventId}/referral-codes`);
        return response.data;
    },
};
