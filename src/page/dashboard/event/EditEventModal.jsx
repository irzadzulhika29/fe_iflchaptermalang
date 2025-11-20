import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Cropper } from "react-cropper";
import Modal from "react-responsive-modal";
import Select from "react-select";

import "react-responsive-modal/styles.css";
import "cropperjs/dist/cropper.css";

import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { useGetSdgOptions } from "../../../features/event";
import dataUrlToFile from "../../../utils/dataUrlToFile";

const EditEventModal = ({ 
  showModal, 
  setShowModal, 
  eventData,        
  onSubmit,        
  isSubmitting      
}) => {
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState();
  const [status, setStatus] = useState(null);
  const [sdgs, setSdgs] = useState([]);
  const [category, setCategory] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();
  
  const { sdgOptions, isLoading } = useGetSdgOptions();

  useEffect(() => {
    if (eventData && showModal) {
      setValue('title', eventData.title);
      setValue('description', eventData.description);
      setValue('event_activity', eventData.event_activity);
      setValue('participant', eventData.participant);
      setValue('price', eventData.price);
      setValue('committee', eventData.committee);
      
    if (eventData.start_date) {
      const dateValue = eventData.start_date.split('T')[0]; // Ambil bagian tanggal saja jika ada timestamp
      setValue('start_date', dateValue);
    }

      setStatus(eventData.status);

      setCategory(eventData.category);

      if (eventData.sdgs && Array.isArray(eventData.sdgs)) {
        const sdgIds = eventData.sdgs.map(sdg => sdg.id);
        setSdgs(sdgIds);
      }

      setExistingImage(eventData.event_photo || eventData.image);
    }
  }, [eventData, showModal, setValue]);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    const reader = new FileReader();

    if (e.dataTransfer) files = e.dataTransfer.files;
    else if (e.target) files = e.target.files;

    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(files[0]);
  };

  const stylesOptions = {
    control: (provided) => ({
      ...provided,
      minHeight: '42px',
      borderColor: '#e5e7eb',
      '&:hover': {
        borderColor: '#06b6d4',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
  };

  const statusOptions = [
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
  ];

  const categoryOptions = [
    { value: "program", label: "Program" },
    { value: "project", label: "Project" },
  ];

  const handleFormSubmit = (data) => {
    if (!status) {
      alert("Pilih status terlebih dahulu!");
      return;
    }
    if (!category) {
      alert("Pilih category terlebih dahulu!");
      return;
    }
    if (sdgs.length === 0) {
      alert("Pilih minimal 1 SDG!");
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('status', status);
    formData.append('category', category);
    formData.append('start_date', data.start_date);
    formData.append('description', data.description);
    formData.append('event_activity', data.event_activity);
    formData.append('participant', data.participant);
    formData.append('committee', data.committee);
    formData.append('price', data.price);
    
    sdgs.forEach((sdgId, index) => {
      formData.append(`sdgs[${index}]`, sdgId);
    });
    
    if (cropper && image) {
      const file = dataUrlToFile(cropper.getCroppedCanvas().toDataURL("image/jpeg"));
      formData.append('event_photo', file);
    }

    console.log('Edit Modal submitting FormData:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    onSubmit(eventData.id, formData);
  };

  const handleClose = () => {
    reset();
    setImage(null);
    setStatus(null);
    setSdgs([]);
    setCategory(null);
    setExistingImage(null);
    setShowModal(false);
  };

  return (
    <Modal 
      open={showModal} 
      onClose={handleClose} 
      center 
      classNames={{ modal: "customModal" }}
    >
      <form 
        className="space-y-4 md:min-w-xl" 
        onSubmit={handleSubmit(handleFormSubmit)} 
        encType="multipart/form-data"
      >
        <h1 className="text-2xl font-bold text-cyan-500">Edit Event</h1>
        
        <div className="relative text-center">
          {!image && existingImage && (
            <div className="mb-2">
              <img 
                src={existingImage} 
                alt="Current" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1">Gambar saat ini</p>
            </div>
          )}
          
          <Cropper
            zoomTo={0.5}
            className={`w-full h-full max-h-64 sm:min-w-md ${!image ? 'hidden' : ''}`}
            initialAspectRatio={16 / 9}
            src={image}
            viewMode={1}
            responsive={true}
            autoCropArea={1}
            guides={true}
            onInitialized={(instance) => setCropper(instance)}
          />
          <label 
            htmlFor="file" 
            className="text-sm font-semibold duration-300 cursor-pointer text-cyan-500 hover:text-cyan-600"
          >
            {image ? 'Change Photo' : 'Upload New Photo'}
          </label>
          <input 
            type="file" 
            id="file" 
            className="sr-only" 
            onChange={onChange} 
            accept="image/*"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid w-full grid-cols-2 mb-4 sm:min-w-md gap-x-4 gap-y-3">
          
          <Input 
            register={register} 
            name="title" 
            placeholder="Event Title" 
            type="text" 
            className="col-span-2"
            required
            disabled={isSubmitting}
          />

          <div className="col-span-2">
            <Select
              placeholder="SDGs (bisa pilih lebih dari 1)"
              classNamePrefix="react-select"
              styles={stylesOptions}
              options={sdgOptions}
              isLoading={isLoading}
              value={sdgOptions.filter(opt => sdgs.includes(opt.value))}
              onChange={(selectedOptions) => {
                const sdgIds = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
                setSdgs(sdgIds);
              }}
              isMulti
              isDisabled={isLoading || isSubmitting}
            />
          </div>

          <Select
            placeholder="Status"
            classNamePrefix="react-select"
            styles={stylesOptions}
            options={statusOptions}
            value={statusOptions.find(opt => opt.value === status)}
            onChange={(e) => setStatus(e.value)}
            isDisabled={isSubmitting}
          />

          <Select
            placeholder="Category"
            classNamePrefix="react-select"
            styles={stylesOptions}
            options={categoryOptions}
            value={categoryOptions.find(opt => opt.value === category)}
            onChange={(e) => setCategory(e.value)}
            isDisabled={isSubmitting}
          />

          <Input 
            register={register} 
            name="participant" 
            placeholder="Participant" 
            type="number" 
            min="0"
            required
            disabled={isSubmitting}
          />

          <Input 
            register={register} 
            name="committee" 
            placeholder="Committee" 
            type="number" 
            min="0"
            required
            disabled={isSubmitting}
          />
          <Input 
            register={register} 
            name="price" 
            placeholder="Harga" 
            type="number" 
            min="0"
            required
            disabled={isSubmitting}
          />

          <Input 
            register={register} 
            name="start_date" 
            placeholder="Start Date" 
            type="date"
            className="col-span-2"
            required
            disabled={isSubmitting}
          />

          <textarea 
            {...register("description")} 
            rows="3" 
            className="col-span-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed" 
            placeholder="Description"
            required
            disabled={isSubmitting}
          />

          <textarea 
            {...register("event_activity")} 
            rows="3" 
            className="col-span-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed" 
            placeholder="Event Activity (contoh: Workshop, Diskusi, dan Networking)"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button 
            type="button"
            intent="tertiary"
            ariaLabel="cancel-edit"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            intent="secondary"
            ariaLabel="update-event"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditEventModal;