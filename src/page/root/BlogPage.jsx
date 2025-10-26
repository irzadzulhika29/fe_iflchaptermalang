import { useGetAllBlogs, useGetAllCategoriesBlog } from "../../features/blog";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import BlogSection from "../../layouts/blog";
import HelmetLayout from "../../layouts/helmet";

const BlogPage = () => {
  const { data: dataCategories } = useGetAllCategoriesBlog();

  const { data: dataBlogs, isLoading: blogsLoading } = useGetAllBlogs();
  return (
    <div className="inner_body">
      <HelmetLayout
        title="Artikel | Indonesian Future Leaders Chapter Malang"
        description="Indonesian Future Leaders memiliki artikel atau blog yang mengangkat isu terkini baik dari segi internal ifl chapter malang maupun eksternal."
        pageLink="/artikel"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, artikel, article, blog, isu terkini, ifl blog"
      />
      <Navbar />
      <BlogSection blogsLoading={blogsLoading} dataBlogs={dataBlogs} dataCategories={dataCategories} />
      <Footer />
    </div>
  );
};

export default BlogPage;
