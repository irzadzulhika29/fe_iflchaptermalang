import { Trash } from "@phosphor-icons/react";
import Modal from "react-responsive-modal";
import Loading from "../../../../components/loader";
import { Button } from "../../../../components/button";
import { useState } from "react";

const DeleteBlogCategoryModal = ({ id, deleteCategory, deletePending }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    deleteCategory(id);
    setShowModal(false);
  };
  return (
    <>
      <button onClick={() => setShowModal(true)} aria-label="modal-delete-category" className="px-2 py-1 duration-300 hover:bg-red-100">
        <Trash size={20} className="text-red-500" />
      </button>

      <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModal" }}>
        {deletePending ? (
          <Loading height={100} width={100} className="m-10" />
        ) : (
          <form onSubmit={handleDeleteSubmit} className="w-full space-y-4 sm:min-w-xs">
            <div className="">
              <h1 className="mb-4 text-sm font-semibold text-center sm:text-start text-primary-1 sm:text-lg">Delete Category Campaign</h1>
              <p className="text-sm text-medium text-dark-1 sm:text-base">are you sure you want to permanently delete this category campaign?</p>
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

export default DeleteBlogCategoryModal;
