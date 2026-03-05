import { Link } from "react-router-dom";
import Background from "../../components/background";
import Backdrop from "../../components/backdrop";
import Container from "../../components/container";
import Loading from "../../components/loader";

const getCategoryClass = (category) => {
  const categoryColors = {
    Teknologi: "bg-green-500",
    Kesehatan: "bg-blue-500",
    Pendidikan: "bg-yellow-500",
    Politik: "bg-red-500",
    Sosial: "bg-purple-500",
    Default: "bg-gray-500",
  };
  return categoryColors[category] || categoryColors["Default"];
};

const Article = ({ blogsLoading, dataBlogs }) => {
  if (blogsLoading) {
    return (
      <Loading height={100} width={100} className="m-10" color="#ffffff80" />
    );
  }

  if (!dataBlogs?.length) {
    return (
      <h3 className="my-20 text-4xl font-semibold text-center text-light-1/50">
        Blog tidak ditemukan
      </h3>
    );
  }

  return (
    <div className="relative py-4 text-dark-1">
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
        <div className="col-span-full flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-dark-1">
            Latest Article
          </h2>
          <Link
            to="/artikel"
            className="text-primary-1 font-semibold hover:underline"
          >
            Read More
          </Link>
        </div>

        {/* Artikel besar */}
        {dataBlogs?.[0] && (
          <Link
            to={`/artikel/${dataBlogs[0]?.slug}`}
            aria-label="navigate-blog"
            className="col-span-1 sm:col-span-2 lg:col-span-2 relative shadow-xl hover:scale-105 transition duration-300 rounded-lg overflow-hidden"
          >
            <Background
              src={dataBlogs[0]?.images?.[0] || "/placeholder.jpg"}
              className="relative h-[300px] sm:h-[500px]"
              description={dataBlogs[0]?.title}
              isImgFront
              isLazy
            >
              <Backdrop />
              <div className="absolute w-full z-10 text-light-1 px-6 py-4 backdrop-blur-sm">
                <span
                  className={`text-sm font-bold uppercase px-2 py-1 rounded ${getCategoryClass(
                    dataBlogs[0]?.categories?.[0]
                  )} text-white`}
                >
                  {dataBlogs[0]?.categories?.[0] || "Tanpa Kategori"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mt-2">{dataBlogs[0]?.title}</h3>
                <p className="text-sm mt-2 line-clamp-2">
                  {dataBlogs[0]?.short_description[0] || "Deskripsi tidak tersedia..."}
                </p>
              </div>
            </Background>
          </Link>
        )}

        {/* Artikel kecil */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 grid grid-rows-2 gap-4">
          {dataBlogs?.slice(1, 3)?.map((item, index) => (
            <Link
              key={index}
              to={`/artikel/${item.slug}`}
              aria-label="navigate-blog"
              className="flex flex-col shadow-lg rounded-lg overflow-hidden hover:scale-105 transition duration-300 relative"
            >
              <div className="relative h-[300px] sm:h-[250px] bg-gray-200 rounded-lg overflow-hidden">
                <Background
                  src={item.images?.[0] || "/placeholder.jpg"}
                  className="w-full h-full object-cover"
                  description={item.title}
                />
                <Backdrop />
              </div>

              {/* Konten Artikel Kecil */}
              <div className="absolute bottom-0 w-full z-10 text-light-1 px-4 py-2 backdrop-blur-sm">
                <span
                  className={`text-xs font-bold uppercase px-2 py-1 rounded ${getCategoryClass(
                    item.categories?.[0]
                  )} text-white`}
                >
                  {item.categories?.[0] || "Tanpa Kategori"}
                </span>
                <h3 className="text-sm sm:text-base font-medium mt-1 line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Article;
