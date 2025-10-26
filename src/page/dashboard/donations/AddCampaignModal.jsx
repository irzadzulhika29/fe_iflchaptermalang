import { useState } from "react";

import Modal from "react-responsive-modal";

import Select from "react-select";

import { Cropper } from "react-cropper";

import { useForm } from "react-hook-form";

import Loading from "../../../components/loader";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

import dataUrlToFile from "../../../utils/dataUrlToFile";

const AddCampaignModal = ({ showModal, setShowModal, addCampaign, addPending, dataCategories, stylesOptions }) => {
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState();
  const [status, setStatus] = useState(null);
  const [categories, setCategories] = useState(null);

  const { register, handleSubmit } = useForm();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    const reader = new FileReader();

    if (e.dataTransfer) files = e.dataTransfer.files;
    else if (e.target) files = e.target.files;

    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(files[0]);
  };

  const statusOptions = [
    { value: "active", label: "active" },
    { value: "closed", label: "closed" },
    { value: "pending", label: "pending" },
  ];

  const categoriesOptions = dataCategories?.length >= 1 && dataCategories?.map((item) => ({ value: item.id, label: item.name }));

  const onSubmit = (data) => {
    const { body, end, start, target, title, note, receiver, description } = data;
    const file = dataUrlToFile(cropper.getCroppedCanvas().toDataURL("image/jpeg"));

    const bodyValue = {
      title,
      body,
      target_donation: target,
      publish_date: start,
      end_date: end,
      image: file,
      categories,
      status,
      note,
      receiver,
      short_description: description,
    };
    addCampaign(bodyValue);
  };

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModal" }}>
      {addPending ? (
        <Loading height={80} width={80} className="m-10" />
      ) : (
        <form className="space-y-4 md:min-w-xl" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <h1 className="text-lg font-semibold text-center sm:text-start text-primary-1">Add Campaign</h1>
          <div className="relative text-center">
            <Cropper
              zoomTo={0.5}
              className={`w-full h-full max-h-96 sm:min-w-md`}
              initialAspectRatio={16 / 9}
              src={image}
              viewMode={1}
              responsive={true}
              autoCropArea={1}
              guides={true}
              onInitialized={(instance) => setCropper(instance)}
            />
            <label htmlFor="file" className="text-sm font-semibold duration-300 cursor-pointer text-primary-1 hover:text-primary-2">
              Upload Photo
            </label>
            <input type="file" id="file" className="sr-only" onChange={onChange} />
          </div>
          <div className="grid w-full grid-cols-2 mb-4 sm:min-w-md gap-x-4 gap-y-3">
            <Input register={register} name="title" placeholder="Campaign Title" type="text" />
            <Input register={register} name="target" placeholder="Campaign Target" type="number" />
            <Select
              placeholder="status"
              classNamePrefix="react-select"
              styles={stylesOptions}
              name="colors"
              options={statusOptions}
              onChange={(e) => setStatus(e.value)}
            />
            <Select
              placeholder="categories"
              classNamePrefix="react-select"
              styles={stylesOptions}
              isMulti
              name="colors"
              options={categoriesOptions}
              onChange={(e) => setCategories(e.map((item) => item.value))}
            />
            <Input register={register} name="note" placeholder="Note Campaign" type="text" />
            <Input register={register} name="receiver" placeholder="Name Receiver" type="text" />
            <Input register={register} name="start" placeholder="Start Date" type="date" />
            <Input register={register} name="end" placeholder="End Date" type="date" />
            <Input register={register} name="description" className="col-span-2" placeholder="Short Description" type="text" />
            <textarea {...register("body")} rows="2" className="text_area_input_description" placeholder="Background Story" required />
          </div>
          <Button type="submit" intent="secondary" className="!ms-auto">
            Save
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default AddCampaignModal;
