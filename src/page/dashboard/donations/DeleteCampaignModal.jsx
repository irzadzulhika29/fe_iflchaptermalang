import { useState } from "react";

import Modal from "react-responsive-modal";

import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";

import Loading from "../../../components/loader";
import { Button } from "../../../components/button";

const DeleteCampaignModal = ({ slug, deleteCampaign, deletePending }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    deleteCampaign(slug);
    setShowModal(false);
  };
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        aria-label="modal-delete-campaign"
        className="p-2 duration-300 bg-gray-200 border rounded-md hover:bg-red-100 h-max"
      >
        <Trash size={20} className="text-red-500" />
      </button>

      <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModal" }}>
        {deletePending ? (
          <Loading height={100} width={100} className="m-10" />
        ) : (
          <form onSubmit={handleDeleteSubmit} className="w-full space-y-4 sm:min-w-xs">
            <div className="">
              <h1 className="mb-4 text-sm font-semibold text-center sm:text-start text-primary-1 sm:text-lg">Delete Campaign</h1>
              <p className="text-sm text-medium text-dark-1 sm:text-base">are you sure you want to permanently delete this campaign?</p>
            </div>
            <Button type="submit" intent="secondary" className="!ms-auto !rounded-lg">
              Save
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
};

export default DeleteCampaignModal;
