import { useState } from "react";

import {
  useAddCategoryBlogByAdmin,
  useDeleteCategoryBlogByAdmin,
  useEditCategoryBlogByAdmin,
  useGetAllCategoriesBlog,
} from "../../../../features/blog/services";

import { Funnel } from "@phosphor-icons/react";

import AddBlogCategoryModal from "./AddBlogCategoryModal";
import EditBlogCategoryModal from "./EditBlogCategoryModal";
import DeleteBlogCategoryModal from "./DeleteBlogCategoryModal";

import Dashboard from "../../../../layouts/dashboard";

import FilterDropdown from "../../../../components/dropdown/Filter";
import Loading from "../../../../components/loader";
import Label from "../../../../components/label";
import { Button } from "../../../../components/button";

import { formatDateAndTime } from "../../../../utils/formatDate";

const Table = ({ categories, editCategory, editPending, deleteCategory, deletePending }) => {
  return (
    <div className="relative mt-4 overflow-x-auto border rounded">
      {!categories?.length ? (
        <h1 className="m-8 text-3xl font-semibold text-center text-gray-400">Not found users in the database</h1>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-dark-1">
          <thead className="uppercase text-dark-1 bg-light-2">
            <tr className="text-base uppercase">
              <th scope="col" className="px-6 py-3">
                category
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>
              <th scope="col" className="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((item, index) => (
              <tr key={index} className="border-b bg-light-1">
                <th className="px-6 py-4 whitespace-nowrap">
                  <Label intent={item?.name === "tanggap bencana" ? "tanggap_bencana" : item?.name} text={item?.name} />
                </th>
                <td className="px-6 py-4 whitespace-nowrap">{item?.description}</td>
                <td className="px-6 py-4">
                  <div className="flex overflow-hidden border border-gray-500 divide-x-2 w-max rounded-xl">
                    <EditBlogCategoryModal id={item?.id} data={item} editCategory={editCategory} editPending={editPending} />
                    <DeleteBlogCategoryModal id={item?.id} deleteCategory={deleteCategory} deletePending={deletePending} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const BlogCategories = () => {
  const [filteredRole, setFilteredRole] = useState("All");
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data: categories, isLoading: categoriesLoading } = useGetAllCategoriesBlog();

  const { mutate: addCategory, isPending: addPending } = useAddCategoryBlogByAdmin();

  const { mutate: editCategory, isPending: editPending } = useEditCategoryBlogByAdmin();

  const { mutate: deleteCategory, isPending: deletePending } = useDeleteCategoryBlogByAdmin();

  const filteredRoles =
    categories?.categories?.length >= 1 &&
    categories?.categories?.filter((item) => {
      return item.name === filteredRole;
    });

  const detail = <p className="text-sm text-gray-500">Last updated at: {formatDateAndTime(categories?.latest_update || new Date())}</p>;
  return (
    <Dashboard title="Blog Categories" detail={detail}>
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
            typeList={categories?.categories}
            loading={categoriesLoading}
          />
        </div>
        <Button onClick={() => setShowModal(true)} ariaLabel="navigate-add-category" intent="secondary">
          Add Category Blog
        </Button>
        <AddBlogCategoryModal showModal={showModal} setShowModal={setShowModal} addPending={addPending} addCategory={addCategory} />
      </div>
      {categoriesLoading ? (
        <Loading height={100} width={100} />
      ) : (
        <Table
          categories={filteredRole === "All" ? categories?.categories : filteredRoles}
          editCategory={editCategory}
          deleteCategory={deleteCategory}
          editPending={editPending}
          deletePending={deletePending}
        />
      )}
    </Dashboard>
  );
};

export default BlogCategories;
