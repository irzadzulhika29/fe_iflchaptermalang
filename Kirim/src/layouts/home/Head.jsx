import { Link } from "react-router-dom";
import { Button } from "../../components/button";
import Background from "../../components/background";
import Container from "../../components/container";
import Backdrop from "../../components/backdrop";

const Hero = () => {
  return (
    <div className="relative z-10">
      <Background
        src="https://ik.imagekit.io/iflmalang/constant-image/ifl.jpg?updatedAt=1734521783216"
        className="min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-b-[50px]"
        description="Background Donation Indonesian Future Leaders"
      >
        <Backdrop intent="primary" />
        <Container className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 z-1 !my-6 sm:!my-8 md:!my-16 lg:!my-20 text-light-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
            We Are <span className="font-bold">Indonesian Future Leaders</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-4xl">
            Indonesian Future Leaders merupakan lembaga swadaya masyarakat dari
            pemuda, oleh pemuda, dan untuk pemuda yang didedikasikan untuk
            mengembangkan kualitas dan kapabilitas pemuda dalam menciptakan
            perubahan sosial untuk Indonesia yang lebih baik.
          </p>
          <Button
              ariaLabel="tentang-kami"
              intent="secondary"
              onClick={() => (window.location.href = "/tentang-kami")}
              className="inline-flex sm:px-20 py-2 rounded-full"
            >
              Learn More About Us
          </Button>
        </Container>
      </Background>
    </div>
  );
};

export default Hero;
