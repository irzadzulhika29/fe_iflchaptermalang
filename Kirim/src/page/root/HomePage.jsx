import { useGetAllBlogs } from "../../features/blog";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import Programs from "../../layouts/home/Programs";
import Article from "../../layouts/home/Article";
import Shop from "../../layouts/home/Shop";
import Donation from "../../layouts/home/Donation";
// import Medpart from "../../layouts/home/Medpart";
import Action from "../../layouts/home/Action";
import Head from "../../layouts/home/Head";
import Data from "../../layouts/home/Data";
import HelmetLayout from "../../layouts/helmet";

const HomePage = () => {
  const { data: dataBlogs, isLoading: blogsLoading } = useGetAllBlogs();

  return (
    <div className="inner_body">
      <HelmetLayout
        title="Beranda | Indonesian Future Leaders Chapter Malang"
        description="Indonesian Future Leaders merupakan lembaga swadaya masyarakat dari pemuda, oleh pemuda, dan untuk pemuda yang didedikasikan untuk mengembangkan kualitas dan kapabilitas pemuda."
        pageLink="/"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, indonesia, future, leaders"
      />
      <Navbar />
      <Head />
      <Data />
      <Donation/>
      <Article blogsLoading={blogsLoading} dataBlogs={dataBlogs?.blogs} />
      <Action />
      <Programs />
      <Shop />
      {/* <Medpart /> */}
      <Footer />
    </div>
  );
};

export default HomePage;
