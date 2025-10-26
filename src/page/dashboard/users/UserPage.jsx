import * as React from "react";

import { useDeleteUserByAdmin, useEditUserByAdmin, useGetAllRoles, useGetAllUsers, useGetUserById } from "../../../features/profile";

import Modal from "react-responsive-modal";

import { CaretDown, Funnel, Trash } from "@phosphor-icons/react";

import { default_background_profile, default_user_profile } from "../../../assets";

import Dashboard from "../../../layouts/dashboard";

import Label from "../../../components/label";
import FilterDropdown from "../../../components/dropdown/Filter";
import { Button } from "../../../components/button";
import Loading from "../../../components/loader";
import Background from "../../../components/background";
import Image from "../../../components/image";

import { formatDateAndTime } from "../../../utils/formatDate";

const RoleDropdown = ({ currentRole, dataRoles, editUser, editPending, roleLoading }) => {
  const dropdownRef = React.useRef(null);

  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const [role, setRole] = React.useState({ id: null, name: null });
  const [showModal, setShowModal] = React.useState(false);

  const filterRole = dataRoles?.filter((item) => item?.name !== currentRole?.role);

  const handleClick = (changeRole) => {
    setRole({ id: changeRole?.id, name: changeRole?.name });
    setShowModal(true);
  };

  const handleSubmitChangeRole = (e) => {
    e.preventDefault();
    const body = { id: currentRole?.id, role_id: role.id };
    editUser(body);
    setShowModal(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPopoverOpen, dropdownRef]);

  return (
    <>
      <button
        className="relative flex items-center w-40 gap-1 text-center border rounded-lg cursor-pointer"
        onClick={() => setPopoverOpen(!isPopoverOpen)}
        ref={dropdownRef}
      >
        <Label intent={role.name || currentRole?.role} text={role.name || currentRole?.role} className="cursor-pointer" />
        <CaretDown size={16} className={`duration-300 pr-1 flex-shrink-0`} />
        {isPopoverOpen && (
          <div className="flex flex-col popover !w-full !top-8">
            {roleLoading ? (
              <Loading height={100} width={100} className="m-10" />
            ) : (
              <>
                {filterRole?.map((item, index) => (
                  <Label key={index} intent={item?.name} text={item?.name} className="cursor-pointer" onClick={() => handleClick(item)} />
                ))}
              </>
            )}
          </div>
        )}
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModal" }}>
        {editPending ? (
          <Loading height={100} width={100} className="m-10" />
        ) : (
          <form onSubmit={handleSubmitChangeRole} className="w-full space-y-4 sm:min-w-xs">
            <div className="">
              <h1 className="mb-4 text-sm font-semibold text-center sm:text-lg sm:text-start text-primary-1">Edit Role Confirmation</h1>
              <p className="text-sm text-medium text-dark-1 sm:text-base">
                Change Role <strong>{currentRole?.role}</strong> to <strong>{role.name}</strong>
              </p>
            </div>
            <Button intent="secondary" className="!ms-auto !rounded-lg">
              Save
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
};

const DetailModal = ({ data }) => {
  const [showModal, setShowModal] = React.useState(false);

  const { data: dataUser, isLoading } = useGetUserById(data?.id);

  const detailInfo = (key, value) => {
    return (
      <div className="flex text-sm font-medium text-dark-1">
        <p className="flex-shrink-0 w-28 md:w-32 whitespace-nowrap">{key}</p>
        <p>: {value}</p>
      </div>
    );
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)} intent="details">
        details
      </Button>
      <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModalUser" }}>
        {isLoading ? (
          <Loading height={100} width={100} className="m-10" />
        ) : (
          <div className="w-full space-y-4 sm:min-w-sm">
            <Background src={dataUser?.background_picture || default_background_profile} className="min-h-200 !justify-center">
              <Image src={dataUser?.profile_picture || default_user_profile} className="w-24 h-24 rounded-full" description={dataUser?.name} />
            </Background>
            <div className="px-8 pb-8 space-y-2">
              {detailInfo("ID", dataUser?.id || "none")}
              {detailInfo("Name", dataUser?.name || "none")}
              {detailInfo("Email", dataUser?.email || "none")}
              {detailInfo("Phone Number", dataUser?.phone_number || "none")}
              {detailInfo("Address", dataUser?.address || "none")}
              {detailInfo("About Me", dataUser?.about_me || "none")}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

const DeleteModal = ({ data, deleteUser, deletePending }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleDeleteUser = (e) => {
    e.preventDefault();
    deleteUser(data?.id);
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} aria-label="modal-delete-user" className="px-4 py-1 duration-300 hover:bg-red-100">
        <Trash size={20} className="text-red-500" />
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModal" }}>
        {deletePending ? (
          <Loading height={100} width={100} className="m-4" />
        ) : (
          <form onSubmit={handleDeleteUser} className="w-full max-w-md space-y-4 sm:min-w-xs">
            <div className="">
              <h1 className="mb-4 text-sm font-semibold text-center sm:text-lg sm:text-start text-primary-1">Edit Role Confirmation</h1>
              <p className="text-sm text-medium text-dark-1 sm:text-base">
                are you sure you want to delete an account with the username: <strong>{data?.username}</strong>
              </p>
            </div>
            <Button intent="secondary" className="!ms-auto !rounded-lg">
              Save
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
};

const Table = ({ dataRoles, dataUsers, deletePending, deleteUser, editUser, editPending, roleLoading }) => {
  return (
    <div className="relative mt-4 overflow-x-auto border rounded">
      {!dataUsers?.length ? (
        <h1 className="m-8 text-3xl font-semibold text-center text-gray-400">Not found users in the database</h1>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-dark-1">
          <thead className="uppercase text-dark-1 bg-light-2">
            <tr className="text-base uppercase">
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                username
              </th>
              <th scope="col" className="px-6 py-3">
                role
              </th>
              <th scope="col" className="px-6 py-3">
                action
              </th>
              <th scope="col" className="px-6 py-3 sr-only">
                details
              </th>
            </tr>
          </thead>
          <tbody>
            {dataUsers?.map((item, index) => (
              <tr key={index} className="border-b bg-light-1">
                <th scope="row" className="px-6 py-4 font-medium text-dark-2 whitespace-nowrap">
                  {item?.email}
                </th>
                <td className="px-6 py-4 whitespace-nowrap">{item?.username}</td>
                <td className="px-6 py-4">
                  <RoleDropdown currentRole={item} roleLoading={roleLoading} dataRoles={dataRoles} editUser={editUser} editPending={editPending} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex overflow-hidden border border-gray-500 w-max rounded-xl">
                    <DeleteModal data={item} deleteUser={deleteUser} deletePending={deletePending} />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <DetailModal data={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const UserPage = () => {
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const [filteredRole, setFilteredRole] = React.useState("All");

  const { data: dataRoles, isLoading: roleLoading } = useGetAllRoles();

  const { data: dataUsers, isLoading: usersLoading } = useGetAllUsers();

  const { mutate: editUser, isPending: editPending } = useEditUserByAdmin();

  const { mutate: deleteUser, isPending: deletePending } = useDeleteUserByAdmin();

  const filteredRoles =
    dataUsers?.users?.length >= 1 &&
    dataUsers?.users?.filter((item) => {
      return item.role === filteredRole;
    });

  const detail = <p className="text-sm text-gray-500">Last updated at: {formatDateAndTime(dataUsers?.latest_update || new Date())}</p>;

  return (
    <Dashboard title="User Management" detail={detail}>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <div className="flex items-center h-full gap-4 border border-gray-300 rounded-lg sm:divide-x sm:divide-gray-300">
          <span className="hidden py-2 pl-4 sm:block">
            <Funnel size={20} />
          </span>
          <span className="hidden py-2 pl-4 font-bold sm:block">Filter By</span>
          <FilterDropdown
            isPopoverOpen={isPopoverOpen}
            setFiltered={setFilteredRole}
            setPopoverOpen={setPopoverOpen}
            filtered={filteredRole}
            title="User Type"
            typeList={dataRoles?.roles}
            loading={roleLoading}
          />
        </div>
      </div>
      {usersLoading ? (
        <Loading height={100} width={100} />
      ) : (
        <Table
          dataRoles={dataRoles?.roles}
          roleLoading={roleLoading}
          editUser={editUser}
          editPending={editPending}
          deleteUser={deleteUser}
          deletePending={deletePending}
          dataUsers={filteredRole === "All" ? dataUsers?.users : filteredRoles}
        />
      )}
    </Dashboard>
  );
};

export default UserPage;
