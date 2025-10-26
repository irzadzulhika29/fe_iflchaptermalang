import Modal from "react-responsive-modal";

import { useForm } from "react-hook-form";

import { Input } from "../../../../components/input";
import Loading from "../../../../components/loader";
import { Button } from "../../../../components/button";

const AddCampaignCategoryModal = ({ showModal, setShowModal, addPending, addCategory }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { name, description } = data;
    addCategory({ name, description });
  };
  return (
    <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModal" }}>
      {addPending ? (
        <Loading height={80} width={80} className="m-10" />
      ) : (
        <form className="space-y-4 md:min-w-xl" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <h1 className="text-lg font-semibold text-center sm:text-start text-primary-1">Add Category Campaign</h1>
          <div className="grid w-full grid-cols-2 mb-4 sm:min-w-md gap-x-4 gap-y-3">
            <Input register={register} name="name" className="col-span-2" placeholder="Category Name" type="text" />
            <Input register={register} name="description" className="col-span-2" placeholder="Description" type="text" />
          </div>
          <Button type="submit" intent="secondary" className="!ms-auto">
            Save
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default AddCampaignCategoryModal;
