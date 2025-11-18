import { useState } from "react";

import Modal from "react-responsive-modal";

import { Trash } from "@phosphor-icons/react";

import Loading from "../../../components/loader";
import { Button } from "../../../components/button";

const DeleteProposalModal = ({ proposalId, deleteProposal, deletePending }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    deleteProposal(proposalId);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        aria-label="modal-delete-proposal"
        className="p-2 duration-300 bg-gray-200 border rounded-md hover:bg-red-100 h-max"
      >
        <Trash size={20} className="text-red-500" />
      </button>

      <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModal" }}>
        {deletePending ? (
          <Loading height={100} width={100} className="m-10" />
        ) : (
          <form onSubmit={handleDeleteSubmit} className="w-full space-y-4 sm:min-w-xs">
            <div>
              <h1 className="mb-4 text-sm font-semibold text-center sm:text-start text-primary-1 sm:text-lg">
                Hapus Proposal
              </h1>
              <p className="text-sm text-medium text-dark-1 sm:text-base">
                Apakah Anda yakin ingin menghapus proposal ini secara permanen?
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                intent="primary" 
                onClick={() => setShowModal(false)}
                className="w-1/2"
              >
                Batal
              </Button>
              <Button type="submit" intent="logout" className="w-1/8">
                Hapus
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default DeleteProposalModal;

