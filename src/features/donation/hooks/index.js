import API from "../../../libs/api";
import SweatAlert from "../../../utils/sweet-alert";

export const getDonationByCampaignSlug = async (campaignSlug) => {
  return await API.get(`/campaign/${campaignSlug}/donation`)
    .then((response) => {
      return {
        campaign: response.data?.campaign || null,
        donations: response.data?.data?.donations || []
      };
    })
    .catch((error) => {
      console.error('API Error:', error.response?.data || error.message);
      return {
        campaign: null,
        donations: []
      };
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

export const addDonationWithQRIS = async (formData) => {
  return await API.post(`/campaign/${formData.get('slug')}/donation`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then((response) => {
      SweatAlert(response.data?.message || "Donasi berhasil dikirim!", "success");
      setTimeout(() => {
        window.location.href = `/donasi`;
      }, 2000);
      return response.data;
    })
    .catch((error) => {
      SweatAlert(error.response?.data?.message || "Gagal mengirim donasi", "error");
      throw error;
    });
};

export const createMidtransTransaction = async (body) => {
  const slug = body.slug;
  
  const payload = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    donation_amount: parseInt(body.donation_amount), // Pastikan integer
    donation_message: body.donation_message || "",
    anonymous: body.is_anonymous || false,
  };

  return await API.post(`/transaction/create/${slug}`, payload)
    .then((response) => {
      const data = response.data?.data;
      
      if (data?.snap_token) {
        return {
          success: true,
          snap_token: data.snap_token,
          transaction_id: data.transaction_id,
          donation_id: data.donation_id,
          invoice: data.invoice,
          donation_amount: data.donation_amount,
        };
      }
      
      throw new Error("Snap token not received");
    })
    .catch((error) => {
      SweatAlert(
        error.response?.data?.message || "Gagal membuat transaksi",
        "error"
      );
      throw error;
    });
};