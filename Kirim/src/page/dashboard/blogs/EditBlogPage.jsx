import * as React from "react";
import { useParams } from "react-router-dom";

import { useEditBlogByAdmin, useGetAllCategoriesBlog, useGetBlogBySlug } from "../../../features/blog";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomImageUpload from "../../../utils/CustomImageUpload";

import Select from "react-select";

import Dashboard from "../../../layouts/dashboard";
import Container from "../../../components/container";
import { Button } from "../../../components/button";

const stylesOptions = {
  control: (_, state) => ({
    border: "1px solid",
    borderColor: state.isFocused ? "#0096C7" : "#313335b5",
    display: "inline-flex",
    width: "100%",
    padding: "10px 14px",
    borderRadius: "4px",
  }),
};

const EditBlogPage = () => {
  const [content, setContent] = React.useState("");
  const [categories, setCategories] = React.useState([]);

  const tempTitle = React.useRef(null);

  const { slug } = useParams();

  const { data: dataCategories } = useGetAllCategoriesBlog();

  const { data: dataBlog, isLoading: blogLoading } = useGetBlogBySlug(slug);

  const { mutate, isPending } = useEditBlogByAdmin();

  const handleSubmitBlog = (e) => {
    e.preventDefault();
    mutate({
      _method: "PUT",
      id: dataBlog?.id,
      title: tempTitle.current?.value || dataBlog?.title,
      content: content || dataBlog?.content,
      blog_categories: categories,
    });
  };

  const categoriesOption =
    dataCategories?.categories?.length >= 1 && dataCategories?.categories?.map((category) => ({ value: category.id, label: category.name }));

  const categoriesOptionValue = dataCategories?.categories
    ?.filter((item) => dataBlog?.categories?.includes(item?.name))
    ?.map((item) => ({ value: item.id, label: item.name }));

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      const title = tempTitle.current?.value || dataBlog?.title;
      return new CustomImageUpload(loader, title);
    };
  }

  return (
    <Dashboard
      title="Edit or Update Blog"
      detail={
        <Button onClick={handleSubmitBlog} intent="secondary">
          Publish
        </Button>
      }
    >
      {blogLoading || isPending ? (
        <Container className="!max-w-screen-sm space-y-4">
          <p className="w-full bg-gray-200 h-14 animate-pulse"></p>
          <p className="w-full h-16 bg-gray-200 animate-pulse"></p>
          <p className="w-full h-20 bg-gray-200 animate-pulse"></p>
        </Container>
      ) : (
        <Container className="!max-w-screen-sm space-y-4">
          <Select
            className="z-20"
            classNamePrefix="react-select"
            styles={stylesOptions}
            isMulti
            options={categoriesOption}
            defaultValue={categoriesOptionValue}
            onChange={(e) => setCategories(e.map((item) => item.value))}
          />
          <input
            ref={tempTitle}
            type="text"
            className="w-full p-3.5 rounded text-2xl border border-dark-fade focus:border-primary-1 outline-none"
            placeholder="Title..."
            defaultValue={dataBlog?.title}
            required
          />
          <CKEditor
            editor={ClassicEditor}
            config={{
              extraPlugins: [MyCustomUploadAdapterPlugin],
            }}
            onChange={(_, editor) => {
              setContent(editor.getData());
            }}
            data={dataBlog?.content}
          />
        </Container>
      )}
    </Dashboard>
  );
};

export default EditBlogPage;
