import * as React from "react";

import Modal from "react-responsive-modal";

import Cropper from "react-cropper";

import { default_background_profile, default_user_profile } from "../../assets";

import { Envelope, CameraPlus, User, IdentificationCard, PencilSimple, PhoneCall, AddressBook } from "@phosphor-icons/react";

import { Button } from "../../components/button";
import { InputProfile } from "../../components/input";
import Container from "../../components/container";
import Backdrop from "../../components/backdrop";
import Loading from "../../components/loader";
import Background from "../../components/background";

import dataUrlToFile from "../../utils/dataUrlToFile";

const EditModal = ({ showModal, setShowModal, isPending, data, mutate, type }) => {
  const [image, setImage] = React.useState(type === "background" ? data?.background_picture : data?.profile_picture);
  const [cropper, setCropper] = React.useState();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    const reader = new FileReader();

    if (e.dataTransfer) files = e.dataTransfer.files;
    else if (e.target) files = e.target.files;

    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(files[0]);
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    const file = dataUrlToFile(cropper.getCroppedCanvas().toDataURL("image/jpeg"));
    if (type === "background") {
      mutate({ _method: "PUT", username: data?.username, background_picture: file });
      return;
    } else {
      mutate({ _method: "PUT", username: data?.username, profile_picture: file });
      return;
    }
  };

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModal" }}>
      {isPending ? (
        <Loading height={80} width={80} className="m-10" />
      ) : (
        <form onSubmit={handleImageSubmit} className="px-8 space-y-4" encType="multipart/form-data">
          <h1 className="text-lg font-semibold text-center text-primary-1">
            {type === "background" ? "Edit Photo Background" : "Edit Photo Profile"}
          </h1>
          <div className="relative text-center">
            <Cropper
              zoomTo={0.5}
              className={`w-full h-full max-h-96 sm:min-w-md ${type === "background" ? "min-h-200 sm:min-h-300" : "min-h-300 sm:min-h-400"}`}
              initialAspectRatio={type === "background" ? 21 / 9 : 1}
              src={image}
              viewMode={1}
              responsive={true}
              autoCropArea={1}
              guides={true}
              onInitialized={(instance) => setCropper(instance)}
            />
            <label htmlFor="file" className="mt-4 text-sm font-semibold duration-300 cursor-pointer text-primary-1 hover:text-primary-2">
              Upload Photo
            </label>
            <input type="file" id="file" className="sr-only" onChange={onChange} />
          </div>
          <Button type="submit" intent="secondary" className="!w-full">
            Save
          </Button>
        </form>
      )}
    </Modal>
  );
};

const ProfileSection = ({ data, mutate, isPending, mutateAboutMe, aboutMePending, imagePending, mutateImage }) => {
  const [isInputAbout, setInputAbout] = React.useState(false);
  const [isErrorAbout, setErrorAbout] = React.useState(false);
  const [showBackground, setShowBackground] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);

  const [input, setInput] = React.useState({
    _method: "PUT",
    username: data?.username || "",
    name: data?.name || "",
    phone_number: data?.phone_number || "",
    address: data?.address || "",
    about_me: data?.about_me || "",
  });

  const handleChangeInput = (e) => {
    let newState = { ...input };
    let { name, value } = e.target;
    newState[name] = value;
    setInput(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(input);
  };

  const handleAboutSubmit = (e) => {
    e.preventDefault();
    if (input.about_me.split("").length > 300) {
      setErrorAbout(true);
      return;
    }
    setErrorAbout(false);
    mutateAboutMe(input);
  };

  return (
    <>
      <Background
        src={data?.background_picture || default_background_profile}
        className="min-h-400 text-light-1"
        description="Background Profile User"
      >
        <Backdrop />
        <Container className="z-1 flex gap-20 !my-8">
          <div className="flex-1 w-full space-y-2">
            <h1 className="text-xl sm:text-3xl">Welcome to your profile,</h1>
            <h1 className="text-xl font-bold tracking-wide sm:text-4xl">{data?.name || data?.username}</h1>
          </div>
          <button onClick={() => setShowBackground(true)}>
            <CameraPlus size={36} weight="bold" />
          </button>
          <EditModal
            mutate={mutateImage}
            isPending={imagePending}
            setShowModal={setShowBackground}
            showModal={showBackground}
            data={data}
            type="background"
          />
        </Container>
      </Background>

      <Container className="container_profile_section">
        <div className="flex-1 w-full max-w-xs mx-auto overflow-hidden border rounded-lg shadow-lg">
          <Background
            src={data?.profile_picture || default_user_profile}
            className="min-h-300 w-full !flex-row !items-end !justify-between p-4 text-light-1"
            description="Profile Picture User"
            isLazy
          >
            <Backdrop />
            <h1 className="text-2xl font-bold z-1">{data?.username}</h1>
            <button className="z-1" onClick={() => setShowProfile(true)}>
              <CameraPlus size={28} weight="bold" />
            </button>
            <EditModal mutate={mutateImage} isPending={imagePending} setShowModal={setShowProfile} showModal={showProfile} data={data} />
          </Background>
          <div className="px-4 pt-2 pb-4 space-y-2">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold uppercase text-primary-1">About</h1>
              <Button ariaLabel="edit-description" className="!p-1" onClick={() => setInputAbout(!isInputAbout)}>
                <PencilSimple size={24} weight="bold" />
              </Button>
            </div>
            {isInputAbout ? (
              <>
                {aboutMePending ? (
                  <Loading height={50} width={50} />
                ) : (
                  <form onSubmit={handleAboutSubmit} className="space-y-2">
                    <textarea
                      id="message"
                      rows="3"
                      className="text_area_input_about"
                      defaultValue={data?.about_me}
                      onChange={handleChangeInput}
                      name="about_me"
                    />
                    {isErrorAbout && (
                      <span className="text-xs text-red-500 duration-300">
                        Sorry, your description exceeds the maximum character limit of 300 characters.
                      </span>
                    )}
                    <Button ariaLabel="submit-description" type="submit" intent="secondary" className="!text-sm">
                      Save Changes
                    </Button>
                  </form>
                )}
              </>
            ) : (
              <p className="text-sm leading-6 text-justify">{data?.about_me}</p>
            )}
            {!isInputAbout && !data.about_me && (
              <p className="text-sm leading-6 text-gray-500">Input your description by pressing the edit button!</p>
            )}
          </div>
        </div>
        <div className="flex-1 w-full min-h-500">
          <h1 className="text-3xl font-bold text-center text-primary-1 sm:text-start">PROFILE</h1>
          {isPending ? (
            <Loading height={100} width={100} className="min-h-400" />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mt-4 space-y-4">
                <InputProfile
                  handleChangeInput={handleChangeInput}
                  title="Email"
                  type="email"
                  icon={<Envelope size={24} weight="bold" />}
                  value={data?.email}
                />
                <InputProfile
                  handleChangeInput={handleChangeInput}
                  title="Username"
                  name="username"
                  type="text"
                  icon={<User size={24} weight="bold" />}
                  value={data?.username}
                  editIcon={<PencilSimple size={20} weight="bold" />}
                />
                <InputProfile
                  handleChangeInput={handleChangeInput}
                  title="Name"
                  name="name"
                  type="text"
                  icon={<IdentificationCard size={24} weight="bold" />}
                  value={data?.name}
                  editIcon={<PencilSimple size={20} weight="bold" />}
                />
                <InputProfile
                  handleChangeInput={handleChangeInput}
                  title="Phone Number"
                  name="phone_number"
                  type="number"
                  icon={<PhoneCall size={24} weight="bold" />}
                  value={data?.phone_number}
                  editIcon={<PencilSimple size={20} weight="bold" />}
                />
                <InputProfile
                  handleChangeInput={handleChangeInput}
                  title="Address"
                  name="address"
                  type="text"
                  icon={<AddressBook size={24} weight="bold" />}
                  value={data?.address}
                  editIcon={<PencilSimple size={20} weight="bold" />}
                />
                <Button ariaLabel="submit-profile" intent="secondary" className="ms-auto">
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </>
  );
};

export default ProfileSection;
