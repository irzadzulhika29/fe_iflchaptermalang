import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useGetBlogBySlug, useToggleLikeBlog } from "../../features/blog/services";

import SingleBlog from "../../layouts/blog/id";

import Footer from "../../components/footer";
import Loading from "../../components/loader";
import Navbar from "../../components/navbar";

import HelmetLayout from "../../layouts/helmet";

const SingleBlogPage = () => {
  const { slug } = useParams();

  const { data: blog, isLoading, refetch: refetchBlog } = useGetBlogBySlug(slug);

  const { mutate: toggleLikeButton } = useToggleLikeBlog(blog?.id);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !blog) navigate("/404");
  }, [navigate, blog, isLoading]);

  return (
    <div className="inner_body">
      <HelmetLayout
        title={`${blog?.title || ""} | Indonesian Future Leaders Chapter Malang`}
        description={`Indonesian Future Leaders memiliki artikel atau blog yang mengangkat isu terkini baik dari segi internal ifl chapter malang maupun eksternal. Pada topik kali ini membahas tentang ${
          blog?.title || ""
        }`}
        pageLink="/artikel/*"
        keywords={`indonesian future leaders, ifl malang, ifl chapter malang, ifl, artikel, article, blog, ifl blog, ${blog?.title || ""}`}
      />
      <Navbar />
      {isLoading ? (
        <Loading height={100} width={100} className="m-20" />
      ) : (
        <SingleBlog refetchBlog={refetchBlog} blog={blog} toggleLikeButton={toggleLikeButton} />
      )}
      <Footer />
    </div>
  );
};

export default SingleBlogPage;
