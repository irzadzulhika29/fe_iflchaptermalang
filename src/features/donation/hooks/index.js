import API from "../../../libs/api";
import SweatAlert from "../../../utils/sweet-alert";

export const getDonationByCampaignSlug = async (campaignSlug) => {
  return await API.get(`/campaign/${campaignSlug}/donation`).then((response) => {
    return response.data?.data;
  });
};

export const getDonationPaymentSuccess = async (orderId) => {
  return await API.get(`/campaign/invoice/${orderId}`).then((response) => {
    return response.data?.data;
  });
};

export const getTotalDonation = async () => {
  return await API.get(`/campaign/total-donation`).then((response) => {
    return response.data?.data;
  });
};

export const addDonationForCampaign = async (body) => {
  const newWindow = window.open();
  return await API.post(`/campaign/${body?.slug}/donation`, body)
    .then((response) => {
      const data = response.data?.payment_url;
      newWindow.location = data;
      return data;
    })
    .catch((error) => {
      SweatAlert(error.response.data?.message);
    });
};
