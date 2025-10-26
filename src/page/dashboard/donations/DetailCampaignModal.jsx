import { useState } from "react";

import { useGetCampaignBySlug } from "../../../features/campaign";

import Modal from "react-responsive-modal";

import { WarningCircle } from "@phosphor-icons/react/dist/ssr/WarningCircle";

import Loading from "../../../components/loader";
import Image from "../../../components/image";

import { formatDate } from "../../../utils/formatDate";

const DetailCampaignModal = ({ slug }) => {
  const [showModal, setShowModal] = useState(false);

  const { data: dataCampaign, isLoading } = useGetCampaignBySlug(slug);

  const detailInfo = (key, value) => {
    return (
      <div className="flex text-sm font-medium text-dark-1">
        <p className="flex-shrink-0 w-32 md:w-40 whitespace-nowrap">{key}</p>
        <p>: {value}</p>
      </div>
    );
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        aria-label="modal-detail-campaign"
        className="absolute top-0 right-0 p-1 duration-300 rounded-full hover:bg-gray-200"
      >
        <WarningCircle size={28} className="text-gray-500" />
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModal" }}>
        {isLoading ? (
          <Loading height={100} width={100} className="m-10" />
        ) : (
          <div className="w-full max-w-lg space-y-4 md:min-w-xl">
            <Image
              src={dataCampaign?.image || "https://ik.imagekit.io/iflmalang/constant-image/project-iflta.webp"}
              className="mx-auto rounded-md aspect-video w-96"
              description={dataCampaign?.title}
            />
            <div className="px-4 pb-8 space-y-2">
              {detailInfo("Start Date", formatDate(dataCampaign?.publish_date) || "none")}
              {detailInfo("End Date", formatDate(dataCampaign?.end_date) || "none")}
              {detailInfo("Status", dataCampaign?.status || "none")}
              {detailInfo("Current Donation", dataCampaign?.current_donation || "none")}
              {detailInfo("Target Donation", dataCampaign?.target_donation || "none")}
              {detailInfo("Note", dataCampaign?.note || "none")}
              {detailInfo("Description", dataCampaign?.short_description || "none")}
              {detailInfo("Background Story", dataCampaign?.body || "none")}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DetailCampaignModal;
