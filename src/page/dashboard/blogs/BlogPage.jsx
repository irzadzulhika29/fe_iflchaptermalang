import * as React from "react";

import { Link } from "react-router-dom";

import { useDeleteBlogByAdmin, useGetAllBlogs, useGetAllCategoriesBlog } from "../../../features/blog";

import { Funnel, WarningCircle } from "@phosphor-icons/react";

import Dashboard from "../../../layouts/dashboard";

import DeleteBlogModal from "./DeleteBlogModal";

const Image = React.lazy(() => import("../../../components/image"));

import { Button } from "../../../components/button";
import Loading from "../../../components/loader";
import FilterDropdown from "../../../components/dropdown/Filter";

import { formatDateAndTime } from "../../../utils/formatDate";

import ImageSkeleton from "../../../components/skeleton/ImageSkeleton";

const CardBlog = ({ dataBlogs, deleteBlog, deletePending }) => {
  return (
    <menu className="flex flex-wrap justify-center gap-4 mt-4 sm:justify-start">
      {!dataBlogs?.length ? (
        <h1 className="w-full m-8 text-3xl font-semibold text-center text-gray-400">The blogs is not found</h1>
      ) : (
        dataBlogs?.map((item, index) => (
          <article key={index} className="card max-w-300">
            <React.Suspense fallback={ImageSkeleton}>
              <Image src={item?.images[0]} className="w-full rounded-lg h-52" description={item?.title} />
            </React.Suspense>

            <div className="flex items-center justify-between">
              <div className="w-full space-y-1">
                {item?.categories?.map((category, categoryId) => (
                  <span className="text-xs font-bold" key={categoryId}>
                    {(categoryId ? ", " : "") + category}
                  </span>
                ))}
                <h1 className="h-12 font-semibold text-primary-1 line-clamp-2">{item?.title}</h1>
                <p className="text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: item.short_description[0] }}></p>
              </div>
            </div>
            <div className="relative flex items-center justify-between mt-4">
              <Link to={`/admin/dashboard/blog/detail/${item?.slug}`} aria-label="navigate-detail-blog">
                <button className="p-2 duration-300 rounded-full hover:bg-gray-200">
                  <WarningCircle size={28} className="text-gray-500" />
                </button>
              </Link>
              <Link to={`/admin/dashboard/blog/edit/${item?.slug}`} aria-label="navigate-edit-blog">
                <Button ariaLabel="navigate-edit-blog" className="!text-sm" intent="secondary">
                  Edit Blog
                </Button>
              </Link>
              <DeleteBlogModal deletePending={deletePending} deleteBlog={deleteBlog} id={item?.id} />
            </div>
          </article>
        ))
      )}
    </menu>
  );
};

const BlogPage = () => {
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const [filteredBlog, setFilteredBlog] = React.useState("All");

  const { data: dataBlogs, isLoading: blogsLoading } = useGetAllBlogs();

  const { data: dataCategories, isLoading: categoriesLoading } = useGetAllCategoriesBlog();

  const { mutate: deleteBlog, isPending: deletePending } = useDeleteBlogByAdmin();

  const filteredBlogs =
    dataBlogs?.blogs?.length >= 1 &&
    dataBlogs?.blogs?.filter((item) => {
      return item?.categories?.includes(filteredBlog);
    });

  const detail = <p className="text-sm text-gray-500">Last updated at: {formatDateAndTime(dataBlogs?.latest_update || new Date())}</p>;

  return (
    <Dashboard title="Blog Management" detail={detail}>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <div className="flex items-center h-full gap-4 border border-gray-300 divide-x divide-gray-300 rounded-lg">
          <span className="hidden py-2 pl-4 sm:block">
            <Funnel size={20} />
          </span>
          <span className="hidden py-2 pl-4 font-bold sm:block">Filter By</span>
          <FilterDropdown
            loading={categoriesLoading}
            isPopoverOpen={isPopoverOpen}
            setFiltered={setFilteredBlog}
            setPopoverOpen={setPopoverOpen}
            filtered={filteredBlog}
            typeList={dataCategories?.categories}
            title="Blog Type"
          />
        </div>
        <Link to="/admin/dashboard/blog/add" aria-label="navigate-add-blog">
          <Button ariaLabel="navigate-add-blog" intent="secondary">
            Add New Blog
          </Button>
        </Link>
      </div>

      {blogsLoading ? (
        <Loading height={100} width={100} className="m-10" />
      ) : (
        <CardBlog deleteBlog={deleteBlog} deletePending={deletePending} dataBlogs={filteredBlog === "All" ? dataBlogs?.blogs : filteredBlogs} />
      )}
    </Dashboard>
  );
};

export default BlogPage;
