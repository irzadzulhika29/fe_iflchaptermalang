import { useMutation, useQuery } from "@tanstack/react-query";
import { referralAPI } from "../api/referralAPI";

export const useValidateReferralCode = () => {
    return useMutation({
        mutationFn: referralAPI.validateCode,
    });
};

export const useGetReferralCodes = (eventId, options = {}) => {
    return useQuery({
        queryKey: ['referralCodes', eventId],
        queryFn: () => referralAPI.getReferralCodes(eventId),
        enabled: !!eventId && options.enabled !== false,
        ...options,
    });
};
