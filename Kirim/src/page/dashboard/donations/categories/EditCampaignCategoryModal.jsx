import { useState } from "react";

import Modal from "react-responsive-modal";

import { useForm } from "react-hook-form";

import { Pencil } from "@phosphor-icons/react";

import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import Loading from "../../../../components/loader";

const EditCampaignCategoryModal = ({ id, data, editCategory, editPending }) => {
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { name, description } = data;
    editCategory({ id, name: name || data?.name, description: description || data?.description });
  };
  return (
    <>
      <button onClick={() => setShowModal(true)} aria-label="modal-edit-category" className="px-2 py-1 duration-300 hover:bg-gray-100">
        <Pencil size={20} className="text-gray-500" />
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModal" }}>
        {editPending ? (
          <Loading height={80} width={80} className="m-10" />
        ) : (
          <form className="space-y-4 md:min-w-xl" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-lg font-semibold text-center sm:text-start text-primary-1">Edit Category Campaign</h1>
            <div className="grid w-full grid-cols-2 mb-4 sm:min-w-md gap-x-4 gap-y-3">
              <Input register={register} name="name" value={data?.name} type="text" />
              <Input register={register} name="description" value={data?.description} className="col-span-2" type="text" />
            </div>
            <Button type="submit" intent="secondary" className="!ms-auto">
              Save
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
};

export default EditCampaignCategoryModal;
