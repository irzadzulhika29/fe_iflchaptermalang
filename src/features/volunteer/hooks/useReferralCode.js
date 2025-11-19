import { useMutation } from "@tanstack/react-query";
import { referralAPI } from "../api/referralAPI";

export const useValidateReferralCode = () => {
    return useMutation({
        mutationFn: referralAPI.validateCode,
    });
};
