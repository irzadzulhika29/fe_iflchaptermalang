import Container from "../container";
import Backdrop from "../backdrop";
import Background from "../background";

const Hero = ({ type, title, description, image }) => {
  const HeroWithText = () => (
    <Background src={image} className="min-h-[75vh] md:min-h-[85vh]">
      <Backdrop intent="primary" />
      <Container className="space-y-6 z-1 !my-8 md:!my-16 text-light-1">
        <h1 className="text-xl font-bold sm:text-3xl md:text-5xl">{title}</h1>
        <p className="text-sm font-medium leading-relaxed text-justify sm:text-lg md:text-xl">
          {description}
        </p>
      </Container>
    </Background>
  );

  const HeroNoText = () => (
    <>
      <Background src={image} className="min-h-[75vh]"></Background>
      <Container className="text-dark-1 text-center !my-8">
        <h1 className="text-2xl font-bold sm:text-4xl text-primary-1">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed sm:text-lg">{description}</p>
      </Container>
    </>
  );

  return type === "text" ? <HeroWithText /> : <HeroNoText />;
};

export default Hero;
