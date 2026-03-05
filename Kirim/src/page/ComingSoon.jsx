import Background from "../components/background";
import Backdrop from "../components/backdrop";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const ComingSoon = () => {
  return (
    <>
      <Navbar />
      <Background
        src="https://ik.imagekit.io/iflmalang/constant-image/image-coming-soon.webp"
        className="gap-4 !justify-center text-light-1 min-h-700"
        description="Indonesian Future Leaders Malang Charity"
      >
        <Backdrop intent="primary" />
        <h1 className="text-5xl font-bold z-1">COMING SOON</h1>
        <p className="text-2xl font-medium z-1">STAY TUNED!</p>
      </Background>
      <Footer />
    </>
  );
};

export default ComingSoon;
