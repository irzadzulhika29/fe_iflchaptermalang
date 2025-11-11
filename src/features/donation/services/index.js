import { useMutation, useQuery } from "@tanstack/react-query";
import { addDonationForCampaign, getDonationByCampaignSlug, getDonationPaymentSuccess, getTotalDonation } from "../hooks";

export const useGetDonationByCampaignSlug = (campaignSlug) => {
  return useQuery({
    queryKey: ["getDonationByCampaignSlug", campaignSlug],
    queryFn: async () => {
      console.log('Anjem', campaignSlug);
      const responseGetDonationByCampaignSlug = await getDonationByCampaignSlug(campaignSlug);
      return responseGetDonationByCampaignSlug || "";
    },
  });
};

export const useGetDonationPaymentSuccess = (orderId) => {
  return useQuery({
    queryKey: ["getDonationPaymentSuccess", orderId],
    queryFn: async () => {
      const responseGetDonationPaymentSuccess = await getDonationPaymentSuccess(orderId);
      return responseGetDonationPaymentSuccess || "";
    },
  });
};

export const useGetTotalDonation = () => {
  return useQuery({
    queryKey: ["getTotalDonation"],
    queryFn: async () => {
      const responseGetTotalDonation = await getTotalDonation();
      return responseGetTotalDonation || "";
    },
  });
};

export const useAddDonationForCampaign = () => {
  return useMutation({
    mutationFn: (body) => {
      const responseAddDonationForCampaign = addDonationForCampaign(body);
      return responseAddDonationForCampaign;
    },
  });
};
