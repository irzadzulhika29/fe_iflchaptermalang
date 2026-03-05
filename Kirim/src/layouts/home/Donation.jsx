import { Link } from "react-router-dom";
import { Button } from "../../components/button";
import Background from "../../components/background";
import Container from "../../components/container";
import Backdrop from "../../components/backdrop";

const Donation = () => {
  return (
    <div className="relative z-10">
      <Background
        src="https://ik.imagekit.io/iflmalang/constant-image/project-iflta.webp"
        className="min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
        description="Background Donation Indonesian Future Leaders"
      >
        <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-white to-transparent z-10"></div>
        <Backdrop intent="primary" />
        <Container className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 z-1 !my-8 md:!my-16 lg:!my-24 text-light-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold max-w-3xl">
            Our hands extended in kindness could reach millions of hearts!
          </h2>
          <p className="text-sm sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-3xl">
            Donasi Anda dapat membuat perubahan besar. Bergabunglah bersama kami
            untuk menciptakan dampak positif. Setiap kontribusi yang anda
            berikan sangat berarti
          </p>
            <Button
              ariaLabel="donasi"
              intent="secondary"
              onClick={() => (window.location.href = "/donasi")}
              className="mt-2 px-8 sm:px-12 md:px-16 lg:px-20"
            >
              Donate Now
            </Button>
        </Container>
      </Background>
    </div>
  );
};

export default Donation;
