import * as React from "react";

import { useAddBlogByAdmin, useGetAllCategoriesBlog } from "../../../features/blog";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomImageUpload from "../../../utils/CustomImageUpload";

import Select from "react-select";

import Dashboard from "../../../layouts/dashboard";
import Container from "../../../components/container";
import { Button } from "../../../components/button";
import Loading from "../../../components/loader";

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

const AddBlogPage = () => {
  const [content, setContent] = React.useState("");
  const [categories, setCategories] = React.useState([]);

  const tempTitle = React.useRef(null);

  const { data: dataCategories } = useGetAllCategoriesBlog();

  const { mutate, isPending } = useAddBlogByAdmin();

  const handleSubmitBlog = (e) => {
    e.preventDefault();
    mutate({ title: tempTitle.current?.value, content, blog_categories: categories });
  };

  const categoriesOption =
    dataCategories?.categories?.length >= 1 && dataCategories?.categories?.map((category) => ({ value: category.id, label: category.name }));

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      const title = tempTitle.current?.value;
      return new CustomImageUpload(loader, title);
    };
  }

  return (
    <Dashboard
      title="Create New Blog"
      detail={
        <Button onClick={handleSubmitBlog} intent="secondary">
          Publish
        </Button>
      }
    >
      {isPending ? (
        <Loading height={100} width={100} className="m-10" />
      ) : (
        <Container className="!max-w-screen-sm space-y-4">
          <Select
            placeholder="Select categories for blog..."
            className="z-20"
            classNamePrefix="react-select"
            styles={stylesOptions}
            isMulti
            options={categoriesOption}
            onChange={(e) => setCategories(e.map((item) => item.value))}
          />
          <input
            ref={tempTitle}
            type="text"
            className="w-full p-3.5 rounded text-2xl border border-dark-fade focus:border-primary-1 outline-none"
            placeholder="Title..."
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
          />
        </Container>
      )}
    </Dashboard>
  );
};

export default AddBlogPage;
